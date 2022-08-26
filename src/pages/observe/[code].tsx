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

const sortByDate = (a: any, b: any) => {
  if (a.now < b.now) return 1;
  if (a.now > b.now) return -1;
  return 0;
};

const ObserveCode: NextPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!code) {
      return;
    }

    const channel = pusher.subscribe(code as string);

    channel.bind('events', function (data: any) {
      setEvents((currentEvents) => [...currentEvents, data]);
    });

    return () => channel.unsubscribe();
  }, [code]);

  return (
    <div className="p-2">
      <div>
        Viewing: <code>{code}</code>
      </div>
      <div>
        Send requests to:{' '}
        <code>https://hyper-zeta.vercel.app/request/{code}</code>
      </div>

      {events.sort(sortByDate).map((event) => (
        <>
          <div className="bg-white rounded text-sm p-2">
            <div className="">Request</div>
            <div className="">Time: {event.now}</div>

            <div className="rounded border border-slate-300 flex items-center">
              <div className="font-bold p-2">{event.method}</div>
              <div>/api/request/{code}</div>
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

          <div className="pb-4" />
        </>
      ))}
    </div>
  );
};

export default ObserveCode;
