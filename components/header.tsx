// components/Header.tsx
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
        <ul className="font-bold flex items-center gap-4"> {/* w-full クラスを追加 */}
          <li className="flex justify-start items-center pl-3 w-1/2"> {/* 左寄せにするために w-1/2 クラスを追加 */}
            {/* トップページの時は戻るボタンを表示しない */}
            {!isTopPage &&
              <button onClick={handleGoBack}>
                Go Back
              </button>
            }
          </li>
          <li className="flex justify-end pr-3 w-1/2"> {/* 右寄せにするために w-1/2 クラスを追加 */}
            <Login />
          </li>
          {/* 他のリンクを追加 */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
