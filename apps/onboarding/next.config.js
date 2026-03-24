/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@kyc-platform/shared"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
