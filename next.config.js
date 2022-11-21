/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["storage.googleapis.com", "localhost"],
  },
  async rewrites() {
    return [
      {
        source: "/edition/:year-:no",
        destination: editionURLPattern,
      },
    ];
  },
};

const editionURLPattern = `${
  process.env.NODE_ENV === "production"
    ? "https://storage.googleapis.com"
    : "http://localhost:9199"
}/readme-arkiv.appspot.com/pdf/:year/:year-:no.pdf`;

module.exports = nextConfig;
