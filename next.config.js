/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["storage.googleapis.com", "localhost"],
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
    webpack: (config) => {
        // load worker files as a urls with `file-loader`
        config.module.rules.unshift({
            test: /pdf\.worker\.(min\.)?js/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "[contenthash].[ext]",
                        publicPath: "_next/static/worker",
                        outputPath: "static/worker",
                    },
                },
            ],
        });

        return config;
    },
};

const editionURLPattern = `${
    process.env.NODE_ENV === "production"
        ? "https://storage.googleapis.com"
        : "http://localhost:9199"
}/readme-arkiv.appspot.com/pdf/:year/:year-:no.pdf`;

module.exports = nextConfig;
