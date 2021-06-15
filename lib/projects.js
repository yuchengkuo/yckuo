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

  return allProjectsData;
}

export function getAllProjectsPath() {
  const fileNames = fs.readdirSync(projectDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ""),
      },
    };
  });
}

export function getProjectData(slug) {
  const fullPath = path.join(projectDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const { data } = matter(fileContents);

  return {
    slug,
    ...data,
  };
}
