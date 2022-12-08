# hyper: http request observer
 
- Hyper logs out HTTP requests it receives. It includes:
  - request method
  - request headers
  - cookies
  - query parameters
- Uses [pusher](https://pusher.com/) to handle the realtime messaging.
- Uses Next.js, deployed to Vercel.
  - Take the code and deploy it to your own instance.
  - Or pull the code and run it anywhere!

## Deploy Your Own

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftaptapdan%2Fhyper">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
  </a>
</p>

- Sign up for a [Pusher](https://pusher.com/) and create an app.
- Deploy to Vercel.
- Add environment variables to your Vercel project settings:
  - PUSHER_APP_ID
  - PUSHER_SECRET
  - PUSHER_CLUSTER, NEXT_PUBLIC_PUSHER_CLUSTER
  - PUSHER_KEY, NEXT_PUBLIC_PUSHER_KEY
