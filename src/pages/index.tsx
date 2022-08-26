import type { NextPage } from 'next';
import { useLinkToRandomCode } from '@/libs';

const Home: NextPage = () => {
  const linkToRandomCode = useLinkToRandomCode();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 text-2xl">
      <div>welcome to hyper</div>
      <div>http request observer</div>
      <div className="py-1" />
      <button
        onClick={linkToRandomCode}
        className="button text-white bg-slate-600 py-4 px-6 rounded-xl"
      >
        create a your own http request bin
      </button>
      <div className="py-1" />
      <div>then send requests and view the live request logs</div>
    </div>
  );
};

export default Home;
