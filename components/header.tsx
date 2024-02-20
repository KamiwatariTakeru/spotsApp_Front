// components/Header.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import Login from './Login';

const Header: React.FC = () => {
  const router = useRouter();

  // トップページかどうか判定
  const isTopPage = router.pathname === '/'

  const handleGoBack = () => {
    // 戻る
    router.back();
  };
  return (
    <header>
      <nav>
        <ul className = "font-bold flex justify-end items-center gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            {/* トップページの時は戻るボタンを表示しない */}
            {!isTopPage &&
              <button onClick={handleGoBack}>
                Go Back
              </button>
            }
          </li>
          <li>
            <Login />
          </li>
          {/* 他のリンクを追加 */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
