/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', '192.168.2.198', 'scontent.cdninstagram.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
