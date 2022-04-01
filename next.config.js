/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'de', 'uk'],
        defaultLocale: 'en',
    },
};

module.exports = nextConfig;
