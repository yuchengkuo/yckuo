import visit from "unist-util-visit";
import { getBlurredData } from "./image-loader";

export const getImageBlurData = () => async (tree) => {
  const promises = [];
  visit(
    tree,
    (node) => node.type === "mdxJsxFlowElement" && node.name === "Image",
    appendImageAttribute
  );
  visit(
    tree,
    (node) => node.type === "mdxJsxFlowElement" && node.name === "Carousel",
    appendCarouselAttribute
  );

  await Promise.all(promises);
  function appendImageAttribute(node) {
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

  function appendCarouselAttribute(node) {
    const childrenPromises = node.children.map((child, i) => {
      const base64 = getBlurredData(
        child.attributes.filter((attribute) => attribute.name === "src")[0]
          .value
      )
        .then((res) =>
          child.attributes.push({
            type: "mdxJsxAttribute",
            name: "blurDataURL",
            value: res,
          })
        )
        .catch((err) => console.log(err));
      return base64;
    });
    // console.log(childrenPromises);
    promises.push(Promise.all(childrenPromises));
  }
};
