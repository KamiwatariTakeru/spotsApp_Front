import React, { FC } from "react";
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

const Home: FC = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

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
      await axios.post("http://localhost:3000/spots", {
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>名称:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <label>住所:</label>
        <textarea
          value={address}
          onChange={handleAddressChange}
        />
        <button type="submit">
          投稿
        </button>
      </form>
    </div>
  )
}

export default Home;