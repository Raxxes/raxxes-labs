"use client";

import { useState } from "react";

const tools = [
  { id: "json", name: "JSON Formatter", description: "Format and validate JSON data." },
  { id: "base64", name: "Base64 Converter", description: "Encode or decode Base64 text." },
  { id: "url", name: "URL Encoder", description: "Encode or decode URL components." },
  { id: "words", name: "Word Counter", description: "Count words, characters and lines." },
];

const inputStyle = {
  width: "100%",
  minHeight: "190px",
  padding: "16px",
  background: "#0B0B0D",
  color: "#F5F5F5",
  border: "1px solid #303036",
  borderRadius: "10px",
  outline: "none",
  fontSize: "14px",
  lineHeight: 1.7,
  resize: "vertical" as const,
  fontFamily: "monospace",
  boxSizing: "border-box" as const,
};

const buttonStyle = {
  background: "#FF6A00",
  color: "#0B0B0D",
  border: "none",
  padding: "11px 17px",
  borderRadius: "7px",
  fontWeight: 700,
  cursor: "pointer",
};

export default function ToolsPage() {
  const [active, setActive] = useState("json");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");

  function selectTool(id: string) {
    setActive(id);
    setInput("");
    setOutput("");
    setMessage("");
  }

  function runTool() {
    setMessage("");
    setOutput("");

    try {
      if (active === "json") {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed, null, 2));
        setMessage("Valid JSON — formatted successfully.");
      } else if (active === "base64") {
        if (input.trim() === "") throw new Error("Enter some text first.");

        if (input.startsWith("decode:")) {
          const encoded = input.slice(7).trim();
          const binary = atob(encoded);
          const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
          setOutput(new TextDecoder().decode(bytes));
          setMessage("Base64 decoded successfully.");
        } else {
          const bytes = new TextEncoder().encode(input);
          let binary = "";
          bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
          setOutput(btoa(binary));
          setMessage("Text encoded successfully. Use decode: followed by the Base64 string to decode.");
        }
      } else if (active === "url") {
        if (input.trim() === "") throw new Error("Enter some text first.");

        if (input.startsWith("decode:")) {
          setOutput(decodeURIComponent(input.slice(7).trim()));
          setMessage("URL decoded successfully.");
        } else {
          setOutput(encodeURIComponent(input));
          setMessage("URL encoded successfully. Use decode: followed by the encoded text to decode.");
        }
      } else {
        const trimmed = input.trim();
        const words = trimmed ? trimmed.split(/\s+/).length : 0;
        const characters = input.length;
        const noSpaces = input.replace(/\s/g, "").length;
        const lines = input ? input.split(/\r\n|\r|\n/).length : 0;

        setOutput(
          `Words: ${words}\nCharacters: ${characters}\nCharacters without spaces: ${noSpaces}\nLines: ${lines}\nEstimated reading time: ${Math.max(1, Math.ceil(words / 200))} min`
        );
        setMessage("Text analyzed successfully.");
      }
    } catch (error) {
      setOutput("");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Check your input."
      );
    }
  }

  async function copyOutput() {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setMessage("Copied to clipboard.");
    } catch {
      setMessage("Clipboard unavailable. Select and copy the output manually.");
    }
  }

  const currentTool = tools.find((tool) => tool.id === active)!;

  return (
    <main style={{ minHeight: "100vh", background: "#0B0B0D", color: "#F5F5F5", padding: "0 22px 80px" }}>
      <nav style={{ maxWidth: "1120px", margin: "0 auto", height: "82px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #242428" }}>
        <a href="/" style={{ color: "#F5F5F5", textDecoration: "none", fontSize: "20px", fontWeight: 800, letterSpacing: "-0.8px" }}>
          RAXXES<span style={{ color: "#FF6A00" }}> LABS.</span>
        </a>
        <a href="/" style={{ color: "#B4B4BC", textDecoration: "none", fontSize: "13px" }}>
          ← Back to Journal
        </a>
      </nav>

      <section style={{ maxWidth: "900px", margin: "0 auto", paddingTop: "65px" }}>
        <p style={{ color: "#FF6A00", fontSize: "11px", fontWeight: 800, letterSpacing: "3px" }}>
          THE DEVELOPER TOOLKIT
        </p>

        <h1 style={{ fontSize: "clamp(36px, 7vw, 64px)", lineHeight: 1.08, letterSpacing: "-2.5px", margin: "20px 0" }}>
          Less busywork.
          <br />
          <span style={{ color: "#FF6A00" }}>More building.</span>
        </h1>

        <p style={{ color: "#A5A5AE", fontSize: "16px", lineHeight: 1.8, maxWidth: "600px" }}>
          Small, practical utilities for everyday development.
          Free to use, right in your browser. No account required.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))", gap: "10px", marginTop: "38px" }}>
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => selectTool(tool.id)}
              style={{
                textAlign: "left",
                padding: "17px",
                borderRadius: "10px",
                border: active === tool.id ? "1px solid #FF6A00" : "1px solid #303036",
                background: active === tool.id ? "#21150E" : "#121216",
                color: "#F5F5F5",
                cursor: "pointer",
              }}
            >
              <span style={{ color: "#FF6A00", fontSize: "11px", letterSpacing: "1px" }}>
                TOOL / 0{tools.indexOf(tool) + 1}
              </span>
              <h2 style={{ fontSize: "16px", margin: "12px 0 7px" }}>{tool.name}</h2>
              <p style={{ fontSize: "12px", color: "#A5A5AE", lineHeight: 1.6, margin: 0 }}>{tool.description}</p>
            </button>
          ))}
        </div>

        <section style={{ marginTop: "28px", padding: "clamp(16px, 4vw, 28px)", border: "1px solid #303036", borderRadius: "12px", background: "#121216" }}>
          <p style={{ color: "#FF6A00", fontSize: "10px", letterSpacing: "2px", fontWeight: 800 }}>SELECTED TOOL</p>
          <h2 style={{ fontSize: "25px", margin: "10px 0" }}>{currentTool.name}</h2>
          <p style={{ color: "#A5A5AE", fontSize: "13px", lineHeight: 1.7, marginBottom: "22px" }}>
            {active === "base64" || active === "url"
              ? "To decode, start your input with decode: followed by the encoded text."
              : active === "json"
                ? "Paste your JSON below, then format and validate it."
                : "Paste or type your text to calculate its statistics."}
          </p>

          <label htmlFor="tool-input" style={{ display: "block", marginBottom: "9px", fontSize: "12px", color: "#C7C7CE" }}>INPUT</label>
          <textarea
            id="tool-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={
              active === "json" ? '{\n  "name": "Raxxes Labs",\n  "build": true\n}' :
              active === "base64" ? "Enter text to encode, or decode:SGVsbG8= to decode." :
              active === "url" ? "Hello world! Or decode:Hello%20world!" :
              "Start typing or paste your text here..."
            }
            style={inputStyle}
            spellCheck={false}
          />

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "14px" }}>
            <button onClick={runTool} style={buttonStyle}>
              {active === "words" ? "Analyze Text →" : active === "json" ? "Format & Validate →" : "Convert →"}
            </button>
            <button
              onClick={() => { setInput(""); setOutput(""); setMessage(""); }}
              style={{ background: "transparent", color: "#C7C7CE", border: "1px solid #3A3A40", padding: "10px 16px", borderRadius: "7px", cursor: "pointer" }}
            >
              Clear
            </button>
          </div>

          {message && (
            <p role="status" style={{ color: output ? "#FF9A50" : "#FF7777", fontSize: "13px", lineHeight: 1.6, marginTop: "18px", overflowWrap: "anywhere" }}>
              {message}
            </p>
          )}

          {output && (
            <div style={{ marginTop: "22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "9px" }}>
                <label htmlFor="tool-output" style={{ fontSize: "12px", color: "#C7C7CE" }}>OUTPUT</label>
                <button onClick={copyOutput} style={{ background: "transparent", border: "1px solid #3A3A40", borderRadius: "6px", color: "#FF6A00", padding: "7px 11px", cursor: "pointer" }}>Copy output</button>
              </div>
              <textarea id="tool-output" readOnly value={output} style={{ ...inputStyle, minHeight: "120px" }} />
            </div>
          )}
        </section>

        <p style={{ color: "#777780", fontSize: "12px", textAlign: "center", lineHeight: 1.8, marginTop: "25px" }}>
          Your input is processed locally in your browser. This page does not send it to a server.
        </p>
      </section>
    </main>
  );
}
