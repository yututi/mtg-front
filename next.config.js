/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.IMAGE_HOST
      }
    ],
    minimumCacheTTL: 60 * 60 * 24 * 365
  },
  output: "standalone"
}

module.exports = nextConfig
