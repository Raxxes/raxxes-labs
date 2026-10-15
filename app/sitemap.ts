import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://raxxes-labs.netlify.app";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const files = await fs.readdir(articlesDirectory);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const articles = await Promise.all(
    mdxFiles.map(async (file) => {
      const source = await fs.readFile(
        path.join(articlesDirectory, file),
        "utf8"
      );
      const { data } = matter(source);
      const slug = file.replace(/\\.mdx$/, "");

      return {
        url: `${siteUrl}/articles/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        title: String(data.title ?? slug),
      };
    })
  );

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...articles.map(({ title: _title, ...entry }) => entry),
  ];
}
