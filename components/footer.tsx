// components/Footer.tsx
import React from 'react';
import { HomeIcon } from './svg/homeSvg';

const Footer: React.FC = () => {
  const handleHomeClick = () => {
    // ボタンがクリックされたときの処理
    // 例: ボタンがクリックされたら "/" へのリンクに遷移
    window.location.href = "/";
  };

  const handleCreateSpotClick = () => {
    // ボタンがクリックされたときの処理
    // 例: ボタンがクリックされたら "/createSpot" へのリンクに遷移
    window.location.href = "/createSpot";
  };

  return (
    <footer className="font-bold flex justify-center items-center gap-4 h-full">
      <button onClick={handleHomeClick}>Home</button>
      <button onClick={handleCreateSpotClick}>Create Spot</button>
    </footer>
  );
}

export default Footer;
