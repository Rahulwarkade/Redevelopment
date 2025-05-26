/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "backlink-backend.s3.ap-south-1.amazonaws.com",
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/socket.io/:path*',
        destination: 'http://localhost:5001/socket.io/:path*',
      },
    ]
  },
};

export default nextConfig;
