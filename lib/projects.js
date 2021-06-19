import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();

const projectDirectory = path.join(root, "projects");

export async function getAllProjectsData() {
  const files = fs.readdirSync(projectDirectory);

  const allProjectsData = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");

    const fileContents = fs.readFileSync(
      path.join(projectDirectory, file),
      "utf-8"
    );

    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
    };
  });
  return allProjectsData.sort(
    // @ts-ignore
    (a, b) => b.published - a.published || a.slug.localeCompare(b.slug)
  );
}
