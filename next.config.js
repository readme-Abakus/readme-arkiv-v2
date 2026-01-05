/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["storage.googleapis.com", "localhost"],
    minimumCacheTTL: 2678400, // 31 days cache for image optimisations (to avoid 500 limit)
  },
  async rewrites() {
    return [
      {
        source: "/edition/:year-:no.pdf",
        destination: editionURLPattern,
      },
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
    : "http://127.0.0.1:9199"
}/readme-arkiv.appspot.com/pdf/:year/:year-:no.pdf`;

module.exports = nextConfig;
