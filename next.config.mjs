/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  
  async redirects() {
    return [
      {
        source: "/",
        destination: "/guard",
        permanent: false,
      },
    ];
  },
};
export default nextConfig;
