export function getBaseUrl() {
  // Use custom domain if specified and in production.
  const CUSTOM_DOMAIN =
    process.env.VERCEL_ENV === 'production' && process.env.NEXT_PUBLIC_BASE_URL;
  if (CUSTOM_DOMAIN) return `https://${CUSTOM_DOMAIN}`;

  // SSR should use Vercel URL.
  const VERCEL_URL =
    process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
  if (VERCEL_URL) return `https://${VERCEL_URL}`;

  // Dev SSR should use localhost.
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
