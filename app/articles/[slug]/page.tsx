import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import ArticleReader from "./ArticleReader";

const articlesDirectory = path.join(process.cwd(), "content/articles");

type ArticleMetadata = {
  title: string;
  description: string;
  category: string;
  readTime: string;
};

async function getArticle(slug: string) {
  try {
    const filePath = path.join(articlesDirectory, `${slug}.mdx`);
    const source = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(source);

    const metadata: ArticleMetadata = {
      title: data.title ?? slug,
      description: data.description ?? "",
      category: data.category ?? "Developer Notes",
      readTime: data.readTime ?? "5 MIN READ",
    };

    return { metadata, content };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const files = await fs.readdir(articlesDirectory);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return {
    title: article
      ? `${article.metadata.title} | Raxxes Labs`
      : "Article Not Found | Raxxes Labs",
    description:
      article?.metadata.description ?? "Explore articles on Raxxes Labs.",
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  const sections = article.content
    .split(/\n(?=##\s)/)
    .filter((part) => part.trim().startsWith("## "))
    .map((part) => {
      const lines = part.trim().split("\n");
      const heading = lines[0].replace(/^##\s+/, "").trim();
      const paragraphs = lines
        .slice(1)
        .join("\n")
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(
          (paragraph) =>
            paragraph &&
            !paragraph.startsWith("#") &&
            paragraph !== "---"
        );

      return { heading, paragraphs };
    });

  return (
    <ArticleReader
      title={article.metadata.title}
      category={article.metadata.category.toUpperCase()}
      description={article.metadata.description}
      readTime={article.metadata.readTime}
      sections={sections}
      content={<MDXRemote
        source={article.content}
        components={{
          h2: ({ children, ...props }) => {
            const heading =
              typeof children === "string" ? children : "";

            const id = heading
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");

            return (
              <h2 {...props} id={id}>
                {children}
              </h2>
            );
          },
        }}
      />}
    />
  );
}
