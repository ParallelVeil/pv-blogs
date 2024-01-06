/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/ishiko732/pv-raw-blogs/master/images/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port:"3000",
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port:"4521",
            }

        ],
    },
}

module.exports = nextConfig
