import { useSession, signIn, signOut } from "next-auth/react";

const defaultRedirectUrl = '/';
const redirectUrl = process.env.NEXTAUTH_URL ?? defaultRedirectUrl;
console.log('リダイレクトURL:', process.env.NEXTAUTH_URL);
console.log('リダイレクトURL2:', redirectUrl);

const Login: React.FC = () => {
  const { data: session, status } = useSession();

  // ロード中や認証中の場合は、UIを表示しない
  if (status === "loading") {
    return <div>Loading...</div>;
  }

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
