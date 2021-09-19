import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Frontmatter } from "types/frontmatter";
import { bundleMDX } from "mdx-bundler";
import { remarkSectionize } from "./remark-sectionize";
import getHeadings from "./getHeadings";
import { getImageBlurData } from "./getImageBlurData";

const ROOT = process.cwd();

export const getAllFrontmatter = (sourcePath: string) => {
  const PATH = path.join(ROOT, sourcePath);
  const paths = fs.readdirSync(PATH);
  return paths
    .map((fileName) => {
      const source = fs.readFileSync(
        path.join(ROOT, sourcePath, fileName),
        "utf8"
      );
      const { data, content } = matter(source);

      return {
        ...(data as Frontmatter),
        slug: fileName.replace(".mdx", ""),
        readingTime: readingTime(content),
      } as Frontmatter;
    })
    .sort((a, b) => (b.published ? 1 : -1 || a.slug.localeCompare(b.slug)));
};

export const getMdxBySlug = async (sourcePath, slug) => {
  const source = fs.readFileSync(
    path.join(ROOT, sourcePath, `${slug}.mdx`),
    "utf8"
  );

  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }
  const { frontmatter, code } = await bundleMDX(source, {
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        require("remark-slug"),
        remarkSectionize,
        getImageBlurData,
      ];
      return options;
    },
  });
  const { content } = matter(source);
  const { ids } = getHeadings(content);

  return {
    frontmatter: {
      ...(frontmatter as Frontmatter),
      slug,
      readingTime: readingTime(code),
      ids,
    } as Frontmatter,
    code,
  };
};
