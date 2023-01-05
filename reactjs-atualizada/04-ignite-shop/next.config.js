/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ['files.stripe.com'], // Testar
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        pathname: '/links/**',
      },
    ],
  },
}

module.exports = nextConfig
