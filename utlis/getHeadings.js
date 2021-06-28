// @ts-nocheck
import mdx from "@mdx-js/mdx";
import visit from "unist-util-visit";
const toString = require("mdast-util-to-string");
const slugs = require("github-slugger");

export default function getHeadings(src) {
  const data = [];
  let mdast = {};

  mdx.sync(src, {
    skipExport: true,
    remarkPlugins: [
      () => (ast) => {
        mdast = ast;
        return ast;
      },
    ],
  });

  visit(
    mdast,
    (node) => node.type === "heading" && node.depth === 2,
    (node) => {
      data.push({
        id: slugs.slug(toString(node)),
        title: node.children[0].value,
      });
    }
  );

  return {
    ids: data,
  };
}
