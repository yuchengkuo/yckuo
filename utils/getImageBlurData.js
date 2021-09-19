import visit from "unist-util-visit";
import { getBlurredData } from "./image-loader";

export const getImageBlurData = () => async (tree) => {
  const promises = [];
  visit(
    tree,
    (node) => node.type === "mdxJsxFlowElement" && node.name === "Image",
    appendAttribute
  );
  await Promise.all(promises);

  function appendAttribute(node) {
    const base64 = getBlurredData(
      node.attributes.filter((attribute) => attribute.name === "src")[0].value
    ).then((res) =>
      node.attributes.push({
        type: "mdxJsxAttribute",
        name: "blurDataURL",
        value: res,
      })
    );
    promises.push(base64);
  }
};
