const withLess = require("next-with-less");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
};

// antd config
const antdConfig = {
  lessLoaderOptions: {
    lessOptions: {},
  },
};

module.exports = withLess({
  ...nextConfig,
  ...antdConfig,
});
