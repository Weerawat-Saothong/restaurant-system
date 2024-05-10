/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
      return [
        {
          source: "/",
          destination: "/en",
          permanent: false,
        },
      ];
    },
  };
  export default nextConfig;
  