import React, { FC } from "react";
import { useRouter } from 'next/router';
import GoogleMap from '../../components/googleMap';
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

  const { data: session } = useSession();
  return (
    <div>
      {spot.name}
      {spot.stars_avg}
      <GoogleMap spotId = {spot.id}/>
      {
        session && (
          <button onClick={() => router.push(`/spots/feedback/${spot.id}`)}>
            評価する
          </button>
        )
      }
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