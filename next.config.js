/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    // Handle TypeScript path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    return config
  }
}

module.exports = nextConfig
