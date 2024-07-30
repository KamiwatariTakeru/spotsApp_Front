/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      API_URL: process.env.API_URL || 'https://spots-post-api.fly.dev',
    },
  };

  module.exports = nextConfig;
