const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [],
  },
});
module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx"],
});
