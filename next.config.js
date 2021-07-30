module.exports = {
  target: "serverless",
  images: {
    domains: ["i.scdn.co", "lastfm.freetls.fastly.net"],
  },
  async rewrites() {
    return [
      {
        source: "/bee.js",
        destination: "https://cdn.splitbee.io/sb.js",
      },
      {
        source: "/_hive/:slug",
        destination: "https://hive.splitbee.io/:slug",
      },
    ];
  },
};
