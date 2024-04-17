import type { AppProps } from "next/app";
import { ReactElement } from "react";  // 必要なら追加

import "../styles/globals.css";
import Footer from '../components/footer';
import Header from '../components/header';
import { SessionProvider } from 'next-auth/react';

interface MyAppProps extends AppProps {
  // 追加のプロパティや型があればここに追加
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: MyAppProps): ReactElement {
  return (
    <div>
      <SessionProvider session={session}>
        <div className="fixed top-0 bg-teal-400 w-full h-10">
          <Header />
        </div>
        <main className = "flex fixed top-10 justify-center bg-emerald-100 pb-32 w-full">
          <Component {...pageProps} />
        </main>
        {/* 他の共通のコンポーネントやフッターなどを追加できます */}
        <div className="bg-teal-400 fixed bottom-0 w-full h-10">
          <Footer />
        </div>
      </SessionProvider>
    </div>
  );
}

export default MyApp;