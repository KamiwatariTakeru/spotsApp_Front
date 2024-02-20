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
    <div className = "font-bold ">
      {/* 検索欄 */}
      <form onSubmit={handleSearch}>
        <label>検索:</label>
        <textarea
          value={word}
          onChange={handleWordChange}
        />
        <button type="submit">
          検索
        </button>
      </form>

      {/* 投稿表示欄 */}
      {spots && spots.length === 0 ? (
        <p>該当する結果はありません。</p>
      ) : (
        spots.map((spot: Spot) => (
          <div key={spot.id}>
            <button onClick={() => handleSpotClick(spot.id)}>
              <h2>{spot.name}</h2>
            </button>
            <p>{spot.address}</p>
          </div>
        ))
      )}
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