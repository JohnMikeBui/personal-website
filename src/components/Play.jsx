import { useState } from "react";
import { PHOTOS } from "../data";

export default function Play() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ background: "#f9f8f5", minHeight: "100vh", padding: "0", paddingTop: "2rem" }}>
      <div style={{ columns: 3, columnGap: "0.5rem", lineHeight: 0, padding: "0.5rem" }}>
        {PHOTOS.map((p) => (
          <div
            key={p.id}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
              breakInside: "avoid",
              overflow: "hidden",
              lineHeight: 0,
              cursor: "pointer",
              marginBottom: "0.5rem",
            }}
          >
            <div style={{
              width: "100%",
              transition: "filter 0.3s",
              filter: hovered === p.id ? "brightness(0.6)" : "brightness(1)",
            }}>
              <img
                src={p.src}
                alt={p.caption}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transition: "transform 0.4s ease",
                  transform: hovered === p.id ? "scale(1.05)" : "scale(1)",
                }}
              />
            </div>

            {/* Caption on hover */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "1rem 1.25rem",
              opacity: hovered === p.id ? 1 : 0,
              transition: "opacity 0.3s",
              background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem", color: "#fff",
                lineHeight: 1.3, marginBottom: "0.25rem",
              }}>{p.caption}</div>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem", letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
              }}>{p.category}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
