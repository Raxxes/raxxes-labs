import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://raxxes-labs.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Raxxes Labs — Build. Break. Learn. Repeat.",
    template: "%s | Raxxes Labs",
  },
  description:
    "A developer’s playground for ideas, experiments, and engineering. Explore web development, AI experiments, developer notes, and practical tutorials.",
  applicationName: "Raxxes Labs",
  keywords: [
    "Raxxes Labs",
    "web development",
    "programming tutorials",
    "AI experiments",
    "developer notes",
    "software engineering",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Raxxes Labs",
    title: "Raxxes Labs — Build. Break. Learn. Repeat.",
    description:
      "A developer’s playground for ideas, experiments, and engineering.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raxxes Labs — Build. Break. Learn. Repeat.",
    description:
      "A developer’s playground for ideas, experiments, and engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
