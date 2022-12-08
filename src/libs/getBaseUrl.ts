export function getBaseUrl() {
  // Use custom domain if specified.
  const CUSTOM_DOMAIN = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN;
  // SSR should use Vercel URL.
  const VERCEL_URL =
    process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;

  switch (true) {
    case !!CUSTOM_DOMAIN:
      return `https://${CUSTOM_DOMAIN}`;
    case !!VERCEL_URL:
      return `https://${VERCEL_URL}`;
    default:
      return `http://localhost:${process.env.PORT || 3000}`;
  }
}
