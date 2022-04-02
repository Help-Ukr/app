const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'de', 'uk'],
        defaultLocale: 'en',
    },
};

module.exports = withPlugins([withBundleAnalyzer], nextConfig);
