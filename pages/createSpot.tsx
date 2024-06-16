import React, { FC } from "react";
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

const Home: FC = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();
  const apiUrl = process.env.API_URL

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Name changed:", e.target.value);
    setName(e.target.value);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log("Name address:", e.target.value);
    setAddress(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${apiUrl}/spots`, {
        name: name,
        address: address,
        stars_sum: 0,
        stars_avg: 0
      });
      router.push("/");
    } catch (error) {
      alert("Error creating spot");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col container bg-green-500 pt-20 w-full pb-96">
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="flex justify-center">
          <label>名称</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="flex justify-center mt-10">
          <label>住所</label>
          <textarea
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div className="flex justify-center mt-32">
          <button type="submit" className="h-10 w-20 flex justify-center items-center bg-blue-400 rounded text-white">
            投稿
          </button>
        </div>
      </form>
    </div>
  )
}

export default Home;