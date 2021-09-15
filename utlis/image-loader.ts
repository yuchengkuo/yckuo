export const loader = ({ src, width, quality }) => {
  return `https://res.cloudinary.com/yucheng/image/upload/f_auto,w_${width},q_${
    quality || 75
  }/${src}`;
};
