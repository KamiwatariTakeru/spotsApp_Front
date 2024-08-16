// components/Login.tsx
import { useSession, signIn, signOut } from "next-auth/react";

const redirectUrl = process.env.NEXTAUTH_URL

const Login: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div>
      {
        // セッションがある場合、ログアウトを表示
        session && (
          <div>
            <button onClick={() => signOut({ callbackUrl: `${redirectUrl}` })}>ログアウト</button>
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
                signIn("", { callbackUrl: `${redirectUrl}` })
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
