/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      API_URL_FROM_SERVER_SIDE: process.env.API_URL_FROM_SERVER_SIDE,
      API_URL_FROM_CLIENT_SIDE: process.env.API_URL_FROM_CLIENT_SIDE,
    },
  };

  module.exports = nextConfig;
