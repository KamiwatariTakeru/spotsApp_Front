import React, { FC } from "react";
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from "react";

type Spot = {
  id: string;
  name: string;
  address: string;
  stars_sum: number;
  stars_avg: number;
}

type Props = {
  spots: Spot[];
}

const Home: FC<Props> = ({spots}: Props) => {
  const [word, setWord] = useState("");
  const router = useRouter();

  // 検索の入力窓に文字が入力されるたびに発火(入力されている文字を保持する)
  const handleWordChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setWord(e.target.value);
  };

  // 投稿の名前がクリックされると発火
  const handleSpotClick = (spotId: string) => {
    // 詳細ページに遷移
    router.push(`/spots/${spotId}`);
  };

  // 検索ボタンが押下されたタイミングで発火
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // 検索ボタンが押下されたら入力されたワードを渡して再レンダリングする
      router.push({
        pathname: "/",
        query: { word: word },
      });
    } catch (error) {
      alert("Error searching spots");
      console.error(error);
    }
  };

  return (
      <div className="container max-w-full pt-10 pb-72">
        {/* 検索欄 */}
        <form onSubmit={handleSearch} className="flex justify-center items-center gap-4">
          <label className="mr-5">検索:</label>
          <textarea
            value={word}
            onChange={handleWordChange}
            className="h-6"
          />
          <button type="submit" className="mx-10">
            検索
          </button>
        </form>

        <div className="mt-10">
          {/* 投稿表示欄 */}
          {spots && spots.length === 0 ? (
            <p>該当する結果はありません。</p>
          ) : (
            spots.map((spot: Spot) => (
              <div key={spot.id} className="w-1/2 h-10 mt-4 mb-4 mx-auto flex justify-center items-center gap-4 text-black bg-white rounded shadow-lg">
                <button onClick={() => handleSpotClick(spot.id)}>
                  <h2>{spot.name}</h2>
                </button>
                {/* 星の表示 */}
                <div className="flex items-center">
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
              </div>
            ))
          )}
        </div>
      </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  // 検索ワード抽出
  const { word } = context.query;

  let response;
  if (word) {
    // 検索結果表示の場合のAPI実行
    response = await fetch(`http://api:3000/search_spot?word=${word}`);
  } else {
    // 投稿一覧表示の場合のAPI実行
    response = await fetch("http://api:3000/spots");
  }

  const spots = await response.json();
  console.log('Fetched spots:', spots);
  return { props: { spots: spots || [] } };
};

export default Home;