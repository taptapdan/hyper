import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>http request observer</title>
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center py-2 text-2xl">
        <div>welcome to hyper</div>
        <div>http request observer</div>
        <div className="py-1" />

        <Link href="/observe" passHref>
          <a className="text-white bg-slate-600 hover:bg-slate-700 py-4 px-6 rounded-xl">
            create a your own http request bin
          </a>
        </Link>
        <div className="py-1" />

        <div>then send requests and view the live request logs</div>
      </div>
    </>
  );
};

export default Home;
