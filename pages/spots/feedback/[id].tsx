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

const apiUrl = process.env.API_URL

const Home: FC<Props> = ({spot}: Props) => {

  const router = useRouter();
  const [starsAmount, setStarsAmount] = useState<number>(0);
  const { data: session } = useSession();

  console.log(session);
  console.log(session?.user.id);

  const handleEvaluateClick = async (spot_id: string, starsAmount: number) => {
    // API実行
    try {
      const response = await fetch(`${apiUrl}/users/get_current_user/${session?.user.id}`);
      const currentUser = await response.json();
      await axios.post(`${apiUrl}/get_evaluation_Record`, {
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
    <div className="container flex flex-col w-full">
      <div className="container mx-auto flex justify-center pt-16">
        <div className="px-5 flex justify-between items-center h-10 w-3/5 bg-white rounded shadow-lg">
          {spot.name}
        </div>
      </div>
      <div className="container mx-auto flex justify-center">
        <div className="flex-row pt-16 text-2xl">
          <div className="text-2xl">
            評価する
          </div>
          <div className="mt-5 text-3xl">
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
        </div>
      </div>
      <div className="container mx-auto flex justify-center pt-48 pb-16">
        <button onClick={() => handleEvaluateClick(spot.id, starsAmount)}
        className="h-10 w-20 flex justify-center items-center bg-blue-400 rounded text-white">
          確定
        </button>
      </div>
    </div>
  )
}

export async function getStaticPaths() {

  const res = await fetch(`${apiUrl}/spots`);
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

  const response = await fetch(`${apiUrl}/${params.id}`);
  const spot = await response.json();

  return {
    props: {
      spot: spot
    },
    revalidate: 10,
  };
}

export default Home;
