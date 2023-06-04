/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [process.env.NEXT_PUBLIC_HOST],
  },
};

module.exports = nextConfig;
