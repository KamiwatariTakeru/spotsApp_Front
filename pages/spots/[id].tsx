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

const apiUrl = process.env.API_URL

const Home: FC<Props> = ({spot}: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex container justify-center pt-12">
      <div className="flex-col">
        <div className="flex items-center h-10 bg-white rounded shadow-lg">
          <span className="pl-7 pr-28">{spot.name}</span>
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              style={{ color: star <= spot.stars_avg ? 'gold' : 'gray' }}
              className="px-1"
            >
              ★
            </span>
          ))}
        </div>
        <div className="pt-5 text-xl">
          住所
        </div>
        <div>
          {spot.address}
        </div>
        <div className="mt-5">
          <div className="shadow-lg">
            <GoogleMap spotId={spot.id}/>
          </div>
          <div className="flex justify-center mt-10">
            {session && (
              <button onClick={() => router.push(`/spots/feedback/${spot.id}`)} className="h-10 w-20 flex justify-center items-center bg-blue-400 rounded text-white">
                評価する
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  try{
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

  } catch (error) {
    console.error('Fetch error:', error);
    // エラーハンドリング
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${apiUrl}/${params.id}`);
    if (!response.ok) {
      throw new Error('Response was not ok');
    }
    const spot = await response.json();

    if (!spot) {
      throw new Error('Data spot is null or undefined');
    }

    return {
      props: {
        spot: spot,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching spot data:', error);
    throw new Error('Error was thrown in getStaticProps');
  }
}

export default Home;