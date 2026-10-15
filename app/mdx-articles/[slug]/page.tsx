import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const articlesDirectory = path.join(process.cwd(), "content/articles");

async function getArticle(slug: string) {
  try {
    const filePath = path.join(articlesDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(fileContents);

    return { content, data };
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
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) return { title: "Article Not Found | Raxxes Labs" };

  return {
    title: `${article.data.title ?? slug} | Raxxes Labs`,
    description: article.data.description ?? "Read the latest from Raxxes Labs.",
  };
}

export default async function MDXArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0B0B0D",
        color: "#F5F5F5",
        padding: "64px 20px",
      }}
    >
      <article style={{ maxWidth: 800, margin: "0 auto" }}>
        <a
          href="/"
          style={{
            color: "#FF6A00",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          ← Back to Raxxes Labs
        </a>

        <div style={{ marginTop: 48, marginBottom: 40 }}>
          <p
            style={{
              color: "#FF6A00",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {article.data.category ?? "Developer Notes"}
            {" · "}
            {article.data.readTime ?? "5 MIN READ"}
          </p>

          <h1
            style={{
              fontSize: "clamp(36px, 7vw, 64px)",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              margin: "20px 0",
            }}
          >
            {article.data.title ?? slug}
          </h1>

          <p style={{ color: "#B1B1BA", fontSize: 18, lineHeight: 1.8 }}>
            {article.data.description ?? ""}
          </p>
        </div>

        <div
          style={{
            borderTop: "1px solid #27272D",
            paddingTop: 32,
            fontSize: 16,
            lineHeight: 1.9,
            color: "#B1B1BA",
          }}
        >
          <MDXRemote source={article.content} />
        </div>
      </article>
    </main>
  );
}
