/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's.pinimg.com'
            },
            {
                protocol : 'https',
                hostname: 'lh3.googleusercontent.com'
              },
              {
                protocol : 'https',
                hostname: 'cloud.appwrite.io'
              },
        ]
    }
};

export default nextConfig;
