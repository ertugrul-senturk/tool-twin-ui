/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow YouTube thumbnails if needed; main images are local.
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

module.exports = nextConfig;
