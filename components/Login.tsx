// components/Login.tsx
import { useSession, signIn, signOut } from "next-auth/react";

const apiUrl = process.env.API_URL

const Login: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div>
      {
        // セッションがある場合、ログアウトを表示
        session && (
          <div>
            <button onClick={() => signOut({ callbackUrl: `${apiUrl}` })}>ログアウト</button>
          </div>
        )
      }
      {
        // セッションがない場合、ログインを表示
        // ログインボタンを押すと、ログインページに遷移する
        !session && (
          <div>
            <button
              onClick={() =>
                signIn("", { callbackUrl: `${apiUrl}` })
              }
            >
              ログイン
            </button>
          </div>
        )
      }
    </div>
  );
};

export default Login;
