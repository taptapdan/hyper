export function getBaseUrl() {
  // Browser should use current path.
  if (typeof window !== 'undefined')
    return `http://localhost:${process.env.PORT ?? 3000}`;

  // SSR should use Vercel URL.
  const VERCEL_URL =
    process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
  if (VERCEL_URL) return `https://${VERCEL_URL}`;

  // Dev SSR should use localhost.
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
