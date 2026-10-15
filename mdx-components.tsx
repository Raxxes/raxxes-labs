import type { MDXComponents } from "mdx/types";

export function useMDXComponents(
  components: MDXComponents
): MDXComponents {
  return {
    h1: (props) => (
      <h1
        {...props}
        style={{
          fontSize: "clamp(32px, 6vw, 52px)",
          lineHeight: 1.2,
          letterSpacing: "-1px",
          marginBottom: 24,
        }}
      />
    ),

    h2: (props) => (
      <h2
        {...props}
        style={{
          fontSize: "clamp(24px, 4vw, 32px)",
          lineHeight: 1.4,
          marginTop: 40,
          marginBottom: 18,
        }}
      />
    ),

    p: (props) => (
      <p
        {...props}
        style={{
          color: "#B1B1BA",
          fontSize: 16,
          lineHeight: 1.9,
          marginBottom: 22,
        }}
      />
    ),

    a: (props) => (
      <a
        {...props}
        style={{
          color: "#FF6A00",
          textDecoration: "underline",
          textUnderlineOffset: 4,
        }}
      />
    ),

    ...components,
  };
}
