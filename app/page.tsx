import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import HomeClient from "./HomeClient";


const articlesDirectory = path.join(process.cwd(), "content/articles");

export default async function HomePage() {
  const files = await fs.readdir(articlesDirectory);
  const mdxFiles = files
    .filter((file) => file.endsWith(".mdx"))
    .sort();

  const articles = await Promise.all(
    mdxFiles.map(async (file, index) => {
      const fullPath = path.join(articlesDirectory, file);
      const source = await fs.readFile(fullPath, "utf8");
      const { data } = matter(source);

      const slug = file.replace(/\.mdx$/, "");

      return {
        number: String(index + 1).padStart(2, "0"),
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        category: String(data.category ?? "Developer Notes"),
        readTime: String(data.readTime ?? "5 MIN READ"),
      };
    })
  );

  return <HomeClient articles={articles} />;
}
