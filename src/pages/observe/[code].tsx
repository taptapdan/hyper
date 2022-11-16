import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Pusher from 'pusher-js';
import {
  UrlWithCopyToClipboard,
  UrlWithCopyToClipboardNotify,
} from '@/components/UrlWithCopyToClipboard';
import { getBaseUrl } from '@/libs';

Pusher.logToConsole = true;

if (
  !process.env.NEXT_PUBLIC_PUSHER_KEY ||
  !process.env.NEXT_PUBLIC_PUSHER_CLUSTER
) {
  throw new Error('Must set environment variables.');
}

// https://vercel.com/docs/concepts/edge-network/headers
const filterOutVercelHeaders = (key: string) =>
  ![
    'host',
    'x-forwarded-for',
    'x-forwarded-host',
    'x-forwarded-proto',
    'x-matched-path',
    'x-real-ip',
    'x-vercel-deployment-url',
    'x-vercel-forwarded-for',
    'x-vercel-id',
    'x-vercel-ip-city',
    'x-vercel-ip-country-region',
    'x-vercel-ip-country',
    'x-vercel-ip-latitude',
    'x-vercel-ip-longitude',
    'x-vercel-ip-timezone',
    'x-vercel-proxied-for',
    'x-vercel-proxy-signature-ts',
    'x-vercel-proxy-signature',
  ].includes(key);

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

  const requestUrl = `${getBaseUrl()}/api/request/${code}`;

  return (
    <>
      <Head>
        <title>http request observer</title>
      </Head>

      <UrlWithCopyToClipboardNotify />

      <div className="p-2">
        <div className="text-center py-4">
          <span>Observing requests sent to:</span>
          <span className="px-1" />

          <UrlWithCopyToClipboard url={requestUrl} />
        </div>

        {events.sort(sortByDate).map((event) => (
          <>
            <div className="bg-white rounded text-sm p-2">
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
                      <div
                        key={key}
                        className="rounded border border-sky-500 bg-sky-50 text-sky-500 inline-flex py-1 px-2"
                      >
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
                    .filter(filterOutVercelHeaders)
                    .sort()
                    .map((key) => (
                      <div
                        key={key}
                        className="rounded border border-sky-500 bg-sky-50 text-sky-500 inline-flex py-1 px-2"
                      >
                        <div className="font-bold">{key}:</div>
                        <div className="pr-1" />
                        <div>{event.headers[key]}</div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <div>Body:</div>
                <pre className="rounded border border-sky-500 bg-sky-50 text-sky-500 inline-flex py-1 px-2">
                  {JSON.stringify(event.body, null, 2)}
                </pre>
              </div>
            </div>

            <div className="pb-4" />
          </>
        ))}
      </div>
    </>
  );
};

export default ObserveCode;
