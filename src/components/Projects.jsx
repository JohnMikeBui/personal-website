import { useState } from "react";
import { PROJECTS } from "../data";

export default function Projects() {
  const [hovered, setHovered] = useState(null);
  const bannerColors = ["#d4d0c8", "#c8cdd4", "#cdd4c8", "#d4c8c8"];

  return (
    <section style={{ borderBottom: "1px solid #e8e6e0", borderLeft: "1px solid #e8e6e0", borderRight: "1px solid #e8e6e0" }}>
      {PROJECTS.map((p, i) => (
        <a
          key={p.id}
          href={p.url}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: "block",
            textDecoration: "none",
            borderBottom: i < PROJECTS.length - 1 ? "1px solid #e8e6e0" : "none",
          }}
        >
          {/* Metadata bar */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            padding: "0.6rem 2.5rem",
            borderBottom: "1px solid #e8e6e0",
          }}>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem", letterSpacing: "0.1em",
              color: "#999", textTransform: "uppercase",
            }}>{p.title.toUpperCase()}</span>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem", letterSpacing: "0.1em",
              color: "#999", textAlign: "center",
            }}>{p.category}</span>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem", color: "#999", textAlign: "right",
            }}>{p.year}</span>
          </div>

          {/* Image banner */}
          <div style={{
            width: "100%", height: 600, margin: "0 2.5rem", width: "calc(100% - 5rem)",
            background: bannerColors[i],
            overflow: "hidden", position: "relative",
            transition: "filter 0.3s",
            filter: hovered === i ? "brightness(0.95)" : "brightness(1)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src={p.src}
              alt={p.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", top: "1.25rem", right: "1.5rem",
              fontFamily: "'DM Sans', sans-serif", fontSize: "1rem",
              color: hovered === i ? "#1a1a1a" : "transparent",
              transition: "color 0.2s, transform 0.2s",
              transform: hovered === i ? "translate(2px,-2px)" : "none",
            }}>↗</div>
          </div>

          {/* Title + description */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "2rem", padding: "1.5rem 2.5rem 2.5rem",
            borderTop: "1px solid #e8e6e0",
          }}>
            <h3 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 400, fontStyle: "italic",
              color: "#1a1a1a", lineHeight: 1.3,
              letterSpacing: "-0.01em",
            }}>{p.title}</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem", color: "#777", lineHeight: 1.75,
            }}>{p.desc}</p>
          </div>
        </a>
      ))}
    </section>
  );
}
