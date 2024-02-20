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
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        {/* 他の共通のコンポーネントやフッターなどを追加できます */}
        <Footer />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
