/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      API_URL: process.env.API_URL || 'https://spots-post-backend.fly.dev',
    },
  };

  module.exports = nextConfig;
