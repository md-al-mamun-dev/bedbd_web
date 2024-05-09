/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 's3-alpha-sig.figma.com',
              pathname: '**',
            },
            {
              protocol: 'https',
              hostname: 'cloud.appwrite.io',
              port: '',
              pathname: '**',
            },
            {
              protocol: 'https',
              hostname: 'api.ip2location.io',
              port: '',
              pathname: '**',
            },
          ],
        // domains: ['s3-alpha-sig.figma.com'],
    },
};

export default nextConfig;
