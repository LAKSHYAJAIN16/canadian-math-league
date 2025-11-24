/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['this-person-does-not-exist.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
