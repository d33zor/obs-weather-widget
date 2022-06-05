/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'http://openweathermap.org/img/wn/',
  },
};

module.exports = nextConfig;
