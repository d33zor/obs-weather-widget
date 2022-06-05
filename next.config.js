/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://openweathermap.org/img/wn/',
  },
};

module.exports = nextConfig;
