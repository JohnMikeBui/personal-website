import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "../lib/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 2.5rem" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#999" }}>Post not found.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 2.5rem" }}>
      {/* Back */}
      <button
        onClick={() => navigate("/blog")}
        style={{
          background: "none", border: "none", padding: 0,
          fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#999", cursor: "pointer", marginBottom: "3rem",
          display: "flex", alignItems: "center", gap: "0.4rem",
        }}
      >
        ← Blog
      </button>

      {/* Date */}
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: "0.65rem",
        letterSpacing: "0.1em", color: "#999", textTransform: "uppercase",
        display: "block", marginBottom: "1rem",
      }}>
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric", month: "long", day: "numeric",
        })}
      </span>

      {/* Title */}
      <h1 style={{
        fontFamily: "'DM Serif Display', serif", fontWeight: 400,
        fontStyle: "italic", fontSize: "clamp(2rem, 5vw, 3rem)",
        letterSpacing: "-0.02em", lineHeight: 1.1,
        color: "#1a1a1a", marginBottom: "2.5rem",
      }}>
        {post.title}
      </h1>

      <div style={{ borderTop: "1px solid #e8e6e0", paddingTop: "2.5rem" }}>
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "1rem",
                color: "#444", lineHeight: 1.85, marginBottom: "1.5rem",
              }}>{children}</p>
            ),
            h2: ({ children }) => (
              <h2 style={{
                fontFamily: "'DM Serif Display', serif", fontWeight: 400,
                fontStyle: "italic", fontSize: "1.5rem",
                color: "#1a1a1a", margin: "2.5rem 0 1rem",
                letterSpacing: "-0.01em",
              }}>{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                fontSize: "1rem", color: "#1a1a1a",
                margin: "2rem 0 0.75rem", letterSpacing: "0.02em",
              }}>{children}</h3>
            ),
            ul: ({ children }) => (
              <ul style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "1rem",
                color: "#444", lineHeight: 1.85, marginBottom: "1.5rem",
                paddingLeft: "1.5rem",
              }}>{children}</ul>
            ),
            ol: ({ children }) => (
              <ol style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "1rem",
                color: "#444", lineHeight: 1.85, marginBottom: "1.5rem",
                paddingLeft: "1.5rem",
              }}>{children}</ol>
            ),
            li: ({ children }) => (
              <li style={{ marginBottom: "0.4rem" }}>{children}</li>
            ),
            a: ({ href, children }) => (
              <a href={href} style={{
                color: "#c84b31", textDecoration: "none",
                borderBottom: "1px solid #c84b31",
              }}>{children}</a>
            ),
            strong: ({ children }) => (
              <strong style={{ fontWeight: 500, color: "#1a1a1a" }}>{children}</strong>
            ),
            code: ({ children }) => (
              <code style={{
                fontFamily: "'DM Mono', monospace", fontSize: "0.85em",
                background: "#f0ede8", padding: "0.15em 0.4em",
                borderRadius: 2, color: "#1a1a1a",
              }}>{children}</code>
            ),
            pre: ({ children }) => (
              <pre style={{
                fontFamily: "'DM Mono', monospace", fontSize: "0.85rem",
                background: "#f0ede8", padding: "1.25rem 1.5rem",
                overflowX: "auto", marginBottom: "1.5rem",
                lineHeight: 1.7,
              }}>{children}</pre>
            ),
            blockquote: ({ children }) => (
              <blockquote style={{
                borderLeft: "2px solid #c84b31", paddingLeft: "1.25rem",
                margin: "1.5rem 0", color: "#777",
              }}>{children}</blockquote>
            ),
            hr: () => (
              <hr style={{ border: "none", borderTop: "1px solid #e8e6e0", margin: "2.5rem 0" }} />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
