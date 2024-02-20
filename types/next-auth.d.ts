import NextAuth from "next-auth"

declare module "next-auth" {
  interface JWT {
    // ここに jwt コールバックで追加する情報の型を指定
    id: string;
    access_token: string;
    // 他にも必要なプロパティがあれば追加
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: JWT;
    // 他にも必要なプロパティがあれば追加
  }

  interface NextAuthOptions {
    callbacks?: {
      jwt?: (token: JWT, user: any, account: any, profile: any, isNewUser: any) => Promise<JWT>;
      // 他のコールバックの型情報もあればここに追加
    }
    // 他のオプションもあればここに追加
  }
}