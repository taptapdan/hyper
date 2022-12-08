import { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';

if (
  !process.env.PUSHER_APP_ID ||
  !process.env.PUSHER_KEY ||
  !process.env.PUSHER_SECRET
) {
  throw new Error('Must define environment variables');
}

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER || 'us2',
  useTLS: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Note: Next.js router provide our route params as query params. We don't
  // want these to show up in the logs for our end users, so we'll use a route
  // param that is extremely unlikely to be used by our users so that we can
  // filter them out.
  const { __wagasa__code } = req.query;

  if (!__wagasa__code || typeof __wagasa__code !== 'string') {
    throw new Error('Missing request code.');
  }

  delete req.query.__wagasa__code;

  const msg = {
    now: new Date(),
    headers: req.headers,
    body: req.body,
    query: req.query,
    url: req.url,
    method: req.method,
    cookies: req.cookies,
  };

  await pusher.trigger(__wagasa__code, 'events', msg);

  res.status(200).json({ msg: 'ok' });
}
