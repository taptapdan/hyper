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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code || typeof code !== 'string') {
    throw new Error('Missing request code.');
  }

  console.log('HEADER', req.headers);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);
  console.log('URL', req.url);
  console.log('METHOD', req.method);
  console.log('COOKIES', req.cookies);

  pusher.trigger(code, 'events', {
    headers: req.headers,
    body: req.body,
    query: req.query,
    url: req.url,
    method: req.method,
    cookies: req.cookies,
  });

  res.status(200).json({ hello: 'world' });
}
