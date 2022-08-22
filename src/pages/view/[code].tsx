import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Pusher from 'pusher-js';

Pusher.logToConsole = true;

if (
  !process.env.NEXT_PUBLIC_PUSHER_KEY ||
  !process.env.NEXT_PUBLIC_PUSHER_CLUSTER
) {
  throw new Error('Must set environment variables.');
}

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

const View: NextPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [events, setEvents] = useState<any[]>([]);

  // eslint-disable-next-line no-console
  console.log('code', code);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('useEffect', code);

    if (!code) {
      return;
    }

    const channel = pusher.subscribe(code as string);

    channel.bind('events', function (data: any) {
      // console.log(JSON.stringify(data));
      setEvents([...events, data]);
    });

    return () => channel.unsubscribe();
  }, [code]);

  return (
    <div className="p-2">
      <div>
        hello <code>{code}</code>
      </div>

      {events.map((event) => (
        <div className="bg-white rounded text-sm p-2">
          <div className="">Request</div>

          <div className="rounded border border-slate-300 flex items-center">
            <div className="font-bold p-2">{event.method}</div>
            <div>/api/request/woof</div>
          </div>

          <div className="">
            <div>Query:</div>
            <div>
              {Object.keys(event.query)
                .sort()
                .map((key) => (
                  <div className="rounded border border-sky-500 bg-sky-100 text-sky-500 inline-flex py-1 px-2">
                    <div className="font-bold">{key}:</div>
                    <div className="pr-1" />
                    <div>{event.query[key]}</div>
                  </div>
                ))}
            </div>
          </div>

          <div className="">
            <div>Headers:</div>
            <div>
              {Object.keys(event.headers)
                .sort()
                .map((key) => (
                  <div className="rounded border border-sky-500 bg-sky-100 text-sky-500 inline-flex py-1 px-2">
                    <div className="font-bold">{key}:</div>
                    <div className="pr-1" />
                    <div>{event.headers[key]}</div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <div>Body:</div>
            <pre className="rounded border border-sky-500 bg-sky-100 text-sky-500 inline-flex py-1 px-2">
              {JSON.stringify(event.body)}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
};

export default View;
