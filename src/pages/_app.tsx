import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { SearchProvider } from "../contexts/SearchContext";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  trpc;
  return (
    <SessionProvider session={session}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SearchProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SearchProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
