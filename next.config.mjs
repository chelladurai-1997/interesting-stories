/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  pageExtensions: ["ts", "tsx"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This will accept images from any domain
      },
    ],
  },
};

export default nextConfig;
