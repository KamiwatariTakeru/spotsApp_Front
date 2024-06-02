import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';
import { User } from 'next-auth';




const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {

      const provider = account?.provider;
			const uid = user?.id;
			const name = user?.name;
			const email = user?.email;

      try {
        const response = await axios.post(
          `${apiUrl}/auth/${provider}/callback`,
          {
            provider,
						uid,
						name,
						email,
          }
        );

        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log('エラー', error);
        return false;
      }
    },
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user: User;
    }): Promise<JWT> {
      // jwt() コールバックの実装
      // トークンに情報を追加する処理
      if (user) {
        token.id = user.id;
      }
      console.log('token', token);
      return token;
    },
    async session({ session, token }: { session: any, user: any, token: any }) {
      // session コールバックの実装
      // user.idをセッション情報に追加
      if (session && token) {
        session.user = {
          ...session.user,
          id: token.id,
        };
      }
      console.log('session', session);
      return session;
    }
  },
};

export default NextAuth(authOptions);
