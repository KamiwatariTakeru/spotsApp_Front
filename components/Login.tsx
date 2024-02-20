// components/Login.tsx
import { useSession, signIn, signOut } from "next-auth/react";

const Login: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div>
      {
        // セッションがある場合、ログアウトを表示
        session && (
          <div>
            <button onClick={() => signOut({ callbackUrl: "http://localhost:8000" })}>ログアウト</button>
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
                signIn("", { callbackUrl: "http://localhost:8000" })
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
