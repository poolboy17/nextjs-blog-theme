
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow local images and any future image hosting you might add
    remotePatterns: [
      // Add external image patterns here if needed in the future
    ],
  },
}

module.exports = nextConfig
