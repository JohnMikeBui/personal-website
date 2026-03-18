import { Link } from "react-router-dom";
import { getAllPosts } from "../lib/posts";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <section style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 2.5rem" }}>
      <h1 style={{
        fontFamily: "'DM Serif Display', serif", fontWeight: 400,
        fontStyle: "italic", fontSize: "clamp(2rem, 4vw, 3rem)",
        letterSpacing: "-0.02em", color: "#1a1a1a",
        marginBottom: "3rem",
      }}>
        Blog
      </h1>

      {posts.length === 0 && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#999" }}>
          No posts yet.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column" }}>
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            style={{
              textDecoration: "none",
              borderTop: "1px solid #e8e6e0",
              borderBottom: i === posts.length - 1 ? "1px solid #e8e6e0" : "none",
              padding: "1.75rem 0",
              display: "block",
            }}
          >
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: "0.65rem",
              letterSpacing: "0.1em", color: "#999", textTransform: "uppercase",
              display: "block", marginBottom: "0.6rem",
            }}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </span>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif", fontWeight: 400,
              fontStyle: "italic", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              color: "#1a1a1a", marginBottom: "0.5rem", letterSpacing: "-0.01em",
            }}>
              {post.title}
            </h2>
            {post.excerpt && (
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
                color: "#777", lineHeight: 1.7,
              }}>
                {post.excerpt}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
