import Head from "next/head";
import ShelfBookGrid from "../../components/shelf/ShelfBookGrid";

export default function Shelf() {
  return (
    <>
      <Head>
        <title>My Shelf - fragment</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto mt-16 grid max-w-sm sm:max-w-2xl">
        <h1 className="mb-10 text-center text-2xl">My Shelf</h1>
        <ShelfBookGrid />
      </div>
    </>
  );
}
