import React, { FC, useState } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSession } from "next-auth/react";

type Spot = {
  id: string;
  name: string;
  address: string;
  stars_sum: number;
  stars_avg: number;
}

type Props = {
  spot: Spot;
}

const Home: FC<Props> = ({spot}: Props) => {
  const router = useRouter();
  const [starsAmount, setStarsAmount] = useState<number>(0);
  const { data: session } = useSession();

  console.log(session);
  console.log(session?.user.id);

  const handleEvaluateClick = async (spot_id: string, starsAmount: number) => {
    // API実行
    try {
      const response = await fetch(`http://localhost:3000/users/get_current_user/${session?.user.id}`);
      const currentUser = await response.json();
      await axios.post("http://localhost:3000/get_evaluation_Record", {
        user_id: currentUser.id,
        spot_id: spot_id,
        starsAmount: starsAmount
      });
      router.push("/");
    } catch (error) {
      alert("Error evaluating spot");
      console.error(error);
    }
  };

  const handleStarClick = (stars: number) => {
    setStarsAmount(stars);
  };

  return (
    <div>
      {spot.name}
      <div>
        {[1, 2, 3].map((star) => (
          <span
            key={star}
            onClick={() => handleStarClick(star)}
            style={{ cursor: 'pointer', color: star <= starsAmount ? 'gold' : 'gray' }}
          >
            ★
          </span>
        ))}
      </div>
      <button onClick={() => handleEvaluateClick(spot.id, starsAmount)}>
        評価する
      </button>
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch("http://api:3000/spots");
  const spots: Spot[] = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = spots.map((spot) => ({
    params: { id: spot.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if not generated at build time.
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const response = await fetch(`http://api:3000/spots/${params.id}`);
  const spot = await response.json();

  return {
    props: {
      spot: spot
    },
    revalidate: 10,
  };
}

export default Home;
