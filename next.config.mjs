/** @type {import('next').NextConfig} */
const nextConfig = {
  output:'export',
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PROXY_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
