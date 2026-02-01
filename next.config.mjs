/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://newyearbackendcode-zrp62.ondigitalocean.app",
    },
    experimental: {
        optimizePackageImports: ["@untitledui/icons"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "img.freepik.com",
            }
        ],
    },
};

export default nextConfig;
