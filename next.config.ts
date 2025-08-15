import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['dev.naiin.com', 'pim-demo-project.s3.amazonaws.com'],
    },
};

export default nextConfig;
