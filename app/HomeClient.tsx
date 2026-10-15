"use client";

import { useState } from "react";

type Article = {
  number: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  slug: string;
};

export default function Home({ articles }: { articles: Article[] }) {
const categories = [
  "All",
  ...Array.from(new Set(articles.map((article) => article.category))),
];

const [search, setSearch] = useState("");
const [activeCategory, setActiveCategory] = useState("All");

const filteredArticles = articles.filter((article) => {
const matchesSearch =
article.title.toLowerCase().includes(search.toLowerCase()) ||
article.description.toLowerCase().includes(search.toLowerCase()) ||
article.category.toLowerCase().includes(search.toLowerCase());

const matchesCategory =
  activeCategory === "All" ||
  article.category === activeCategory;

return matchesSearch && matchesCategory;

});

return (
<main style={styles.page}>
<nav style={styles.nav}>
<a href="/" style={styles.logo}>
RAXXES<span style={{ color: "#FF6A00" }}> LABS.</span>
</a>

    <a href="#articles" style={styles.navLink}>
      THE JOURNAL ↗
    </a>
  </nav>

  <section style={styles.hero}>
    <p style={styles.eyebrow}>
      BUILD. BREAK. LEARN. REPEAT.
    </p>

    <h1 style={styles.heroTitle}>
      Ideas into code.
      <br />
      <span style={{ color: "#FF6A00" }}>
        Code into reality.
      </span>
    </h1>

    <p style={styles.heroDescription}>
      A developer’s playground for ideas, experiments, and engineering.
      Explore practical tutorials, project breakdowns, AI experiments,
      and lessons learned while building real things.
    </p>

    <a href="#articles" style={styles.button}>
      Explore the Lab ↗
    </a>

    <p style={styles.heroFootnote}>
      INDEPENDENTLY BUILT · ALWAYS LEARNING
    </p>
  </section>

  <section id="articles" style={styles.articlesSection}>
    <p style={styles.eyebrow}>FROM THE LAB</p>

    <h2 style={styles.sectionTitle}>
      Learn by building.
    </h2>

    <p style={styles.subtitle}>
      Discover ideas, explore technology, and learn something new.
    </p>

    <div style={styles.searchWrapper}>
      <span style={styles.searchIcon}>⌕</span>

      <input
        type="search"
        placeholder="Search articles, topics, ideas..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label="Search articles"
        style={styles.searchInput}
      />

      {search && (
        <button
          onClick={() => setSearch("")}
          style={styles.clearButton}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>

    <div style={styles.categoryList}>
      {categories.map((category) => {
        const selected = activeCategory === category;

        return (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={{
              ...styles.categoryButton,
              ...(selected ? styles.activeCategoryButton : {}),
            }}
          >
            {category}
          </button>
        );
      })}
    </div>

    <div style={styles.resultsHeader}>
      <span style={styles.resultsLabel}>
        {search || activeCategory !== "All"
          ? "SEARCH RESULTS"
          : "LATEST ARTICLES"}
      </span>

      <span style={styles.resultsCount}>
        {filteredArticles.length}{" "}
        {filteredArticles.length === 1 ? "ARTICLE" : "ARTICLES"}
      </span>
    </div>

    {filteredArticles.length > 0 ? (
      <div style={styles.grid}>
        {filteredArticles.map((article) => (
          <a
            key={article.slug}
            href={`/articles/${article.slug}`}
            style={styles.card}
          >
            <div style={styles.cardTop}>
              <span style={styles.number}>
                {article.number}
              </span>

              <span style={styles.arrow}>↗</span>
            </div>

            <p style={styles.cardCategory}>
              {article.category.toUpperCase()}
            </p>

            <h3 style={styles.cardTitle}>
              {article.title}
            </h3>

            <p style={styles.cardDescription}>
              {article.description}
            </p>

            <div style={styles.cardBottom}>
              <span>{article.readTime}</span>

              <span style={{ color: "#FF6A00" }}>
                READ ARTICLE →
              </span>
            </div>
          </a>
        ))}
      </div>
    ) : (
      <div style={styles.emptyState}>
        <p style={styles.emptyIcon}>⌕</p>

        <h3 style={styles.emptyTitle}>
          Nothing found. Yet.
        </h3>

        <p style={styles.emptyText}>
          No articles match your search. Try another keyword
          or select a different category.
        </p>

        <button
          onClick={() => {
            setSearch("");
            setActiveCategory("All");
          }}
          style={styles.resetButton}
        >
          Clear filters ↗
        </button>
      </div>
    )}
  </section>

  <section style={styles.about}>
    <p style={styles.eyebrow}>WHY RAXXES LABS?</p>

    <h2 style={styles.aboutTitle}>
      Less noise.
      <br />
      <span style={{ color: "#FF6A00" }}>
        More building.
      </span>
    </h2>

    <p style={styles.aboutText}>
      A personal technical publication about learning by doing.
      Real projects, honest experiments, practical knowledge,
      and discoveries worth sharing with the developer community.
    </p>
  </section>

  <footer style={styles.footer}>
    <a href="/" style={styles.logo}>
      RAXXES<span style={{ color: "#FF6A00" }}> LABS.</span>
    </a>

    <p style={styles.footerTagline}>
      Build. Break. Learn. Repeat.
    </p>

    <p style={styles.copyright}>
      © 2026 Raxxes Labs — Built with curiosity.
    </p>
  </footer>

  <style>{`
    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      background: #0B0B0D;
    }

    a {
      -webkit-tap-highlight-color: transparent;
    }

    input::placeholder {
      color: #777780;
    }

    input:focus {
      outline: none;
    }

    button {
      -webkit-tap-highlight-color: transparent;
    }

    a:hover {
      border-color: #FF6A00;
    }

    @media (max-width: 480px) {
      .unused {
        display: none;
      }
    }
  `}</style>
</main>

);
}

const styles: Record<string, React.CSSProperties> = {
page: {
minHeight: "100vh",
background: "#0B0B0D",
color: "#F5F5F5",
fontFamily: "Arial, Helvetica, sans-serif",
padding: "0 7%",
overflowWrap: "break-word",
},

nav: {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
flexWrap: "wrap",
gap: 15,
padding: "27px 0",
borderBottom: "1px solid #252529",
},

logo: {
color: "#F5F5F5",
fontSize: 20,
fontWeight: "bold",
letterSpacing: 1,
textDecoration: "none",
},

navLink: {
color: "#999999",
fontSize: 11,
letterSpacing: 2,
textDecoration: "none",
},

hero: {
maxWidth: 900,
margin: "100px auto 115px",
},

eyebrow: {
color: "#FF6A00",
fontSize: 11,
letterSpacing: 3,
lineHeight: 1.8,
},

heroTitle: {
fontSize: "clamp(42px, 8vw, 82px)",
lineHeight: 1.1,
letterSpacing: -2,
margin: "25px 0",
},

heroDescription: {
color: "#A1A1AA",
fontSize: 17,
lineHeight: 1.9,
maxWidth: 620,
},

button: {
display: "inline-block",
marginTop: 25,
padding: "15px 22px",
background: "#FF6A00",
color: "#0B0B0D",
textDecoration: "none",
fontSize: 13,
fontWeight: "bold",
borderRadius: 4,
},

heroFootnote: {
marginTop: 35,
color: "#66666F",
fontSize: 10,
letterSpacing: 2,
},

articlesSection: {
borderTop: "1px solid #252529",
paddingTop: 45,
scrollMarginTop: 20,
},

sectionTitle: {
fontSize: "clamp(28px, 5vw, 42px)",
margin: "12px 0",
letterSpacing: -1,
},

subtitle: {
color: "#9999A3",
fontSize: 14,
lineHeight: 1.8,
marginBottom: 30,
},

searchWrapper: {
display: "flex",
alignItems: "center",
gap: 12,
maxWidth: 650,
minHeight: 55,
padding: "0 17px",
background: "#121216",
border: "1px solid #303036",
borderRadius: 5,
marginBottom: 22,
},

searchIcon: {
color: "#FF6A00",
fontSize: 27,
},

searchInput: {
flex: 1,
width: "100%",
minWidth: 0,
background: "transparent",
border: "none",
color: "#F5F5F5",
fontSize: 14,
padding: "15px 0",
},

clearButton: {
background: "transparent",
border: "none",
color: "#A1A1AA",
fontSize: 17,
padding: 8,
cursor: "pointer",
},

categoryList: {
display: "flex",
flexWrap: "wrap",
gap: 10,
marginBottom: 40,
},

categoryButton: {
background: "#121216",
border: "1px solid #303036",
color: "#A1A1AA",
borderRadius: 4,
padding: "11px 14px",
fontSize: 12,
cursor: "pointer",
},

activeCategoryButton: {
background: "#FF6A00",
border: "1px solid #FF6A00",
color: "#0B0B0D",
fontWeight: "bold",
},

resultsHeader: {
display: "flex",
justifyContent: "space-between",
flexWrap: "wrap",
gap: 12,
marginBottom: 20,
},

resultsLabel: {
color: "#F5F5F5",
fontSize: 11,
letterSpacing: 2,
},

resultsCount: {
color: "#777780",
fontSize: 10,
letterSpacing: 1,
},

grid: {
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
gap: 18,
},

card: {
display: "flex",
flexDirection: "column",
minWidth: 0,
padding: 25,
minHeight: 300,
background: "#121216",
border: "1px solid #29292F",
borderRadius: 5,
color: "#F5F5F5",
textDecoration: "none",
},

cardTop: {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
},

number: {
color: "#777780",
fontSize: 12,
letterSpacing: 1,
},

arrow: {
color: "#FF6A00",
fontSize: 23,
},

cardCategory: {
color: "#FF6A00",
fontSize: 10,
letterSpacing: 2,
marginTop: 28,
},

cardTitle: {
fontSize: 23,
lineHeight: 1.4,
margin: "8px 0",
},

cardDescription: {
color: "#9999A3",
fontSize: 13,
lineHeight: 1.9,
},

cardBottom: {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
flexWrap: "wrap",
gap: 12,
marginTop: "auto",
paddingTop: 25,
color: "#777780",
fontSize: 9,
letterSpacing: 1,
},

emptyState: {
textAlign: "center",
padding: "55px 20px",
background: "#121216",
border: "1px solid #29292F",
borderRadius: 5,
},

emptyIcon: {
color: "#FF6A00",
fontSize: 42,
margin: 0,
},

emptyTitle: {
fontSize: 23,
marginBottom: 12,
},

emptyText: {
color: "#9999A3",
fontSize: 14,
lineHeight: 1.8,
maxWidth: 400,
margin: "0 auto",
},

resetButton: {
marginTop: 22,
padding: "12px 17px",
background: "#FF6A00",
border: "none",
borderRadius: 4,
color: "#0B0B0D",
fontWeight: "bold",
cursor: "pointer",
},

about: {
maxWidth: 750,
margin: "110px auto",
padding: "45px 0",
borderTop: "1px solid #252529",
borderBottom: "1px solid #252529",
},

aboutTitle: {
fontSize: "clamp(36px, 7vw, 62px)",
lineHeight: 1.15,
letterSpacing: -2,
},

aboutText: {
maxWidth: 600,
color: "#A1A1AA",
fontSize: 16,
lineHeight: 2,
},

footer: {
padding: "30px 0",
borderTop: "1px solid #252529",
},

footerTagline: {
color: "#A1A1AA",
fontSize: 13,
},

copyright: {
marginTop: 25,
color: "#66666F",
fontSize: 12,
},
};