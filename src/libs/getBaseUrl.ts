export function getBaseUrl() {
  // SSR should use Vercel URL.
  const VERCEL_URL =
    process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
  if (VERCEL_URL) return `https://${VERCEL_URL}`;

  // Dev SSR should use localhost.
  return `http://localhost:${process.env.PORT ?? 3000}`;
}