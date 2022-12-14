import { type NextPage } from "next";
import Head from "next/head";
import Search from "../components/search/Search";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>fragment - Search your book!</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
    </>
  );
};

export default Home;
