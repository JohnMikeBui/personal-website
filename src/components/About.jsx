import { useState } from "react";
import { EXPERIENCE, WATCHING, LISTENING, READING, KEYWORDS } from "../data";

export default function About() {
  const [activeKeyword, setActiveKeyword] = useState("basketball");

  const Keyword = ({ id, label, color }) => (
    <span
      onMouseEnter={() => setActiveKeyword(id)}
      style={{
        color,
        borderBottom: `1px solid ${color}`,
        cursor: "default",
        fontStyle: "italic",
        opacity: activeKeyword === id ? 1 : 0.6,
        transition: "opacity 0.2s",
      }}
    >{label}</span>
  );

  const rowStyle = {
    display: "grid", gridTemplateColumns: "1fr auto",
    alignItems: "center",
    padding: "0.75rem 0",
    borderBottom: "1px solid #f0eee9",
  };

  const labelStyle = {
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.65rem", letterSpacing: "0.15em",
    color: "#aaa", textTransform: "uppercase",
    marginBottom: "0.75rem", marginTop: "2rem",
    display: "flex", alignItems: "center", gap: "0.75rem",
  };

  return (
    <section id="about" style={{ borderBottom: "1px solid #e8e6e0" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "5fr 7fr",
        alignItems: "start",
        borderBottom: "1px solid #e8e6e0",
      }}>

        {/* LEFT: bio + keyword slideshow */}
        <div style={{ borderRight: "1px solid #e8e6e0" }}>
          <div style={{ padding: "3.5rem 2.5rem 2rem" }}>
            {[
              <>I'm <span style={{ color: "#c84b31" }}>John Bui</span> — a software engineer who cares deeply about craft. I build full-stack applications with a focus on clean architecture, developer experience, and real-world usability.</>,
              <>I got into engineering because I love solving hard problems elegantly. Whether it's a distributed backend system or a pixel-perfect UI, I bring the same attention to detail to everything I touch.</>,
              <>Outside of work, you'll find me{" "}
                <Keyword id="basketball" label="swishing on the courts" color="#c84b31" />,{" "}
                <Keyword id="music" label="working on some music" color="#7a6a9b" />,{" "}
                <Keyword id="dogs" label="spending time with my dogs" color="#7a9b6a" />, or{" "}
                <Keyword id="developer" label="tinkering on side projects" color="#4a7a9b" />.</>,
            ].map((text, i) => (
              <p key={i} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem", color: "#333",
                lineHeight: 1.9, marginBottom: "1.25rem",
              }}>{text}</p>
            ))}
          </div>

          {/* Keyword photo slideshow */}
          <div style={{
            position: "relative", overflow: "hidden",
            height: 300, borderTop: "1px solid #e8e6e0",
          }}>
            {KEYWORDS.map((k) => (
              <div key={k.id} style={{
                position: "absolute", inset: 0,
                background: k.bg,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "0.5rem",
                transform: activeKeyword === k.id ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.8s cubic-bezier(0.77,0,0.18,1) 0.15s",
              }}>
                <img
                  src={k.src}
                  alt={k.id}
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                />
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem", letterSpacing: "0.12em",
                  color: "rgba(0,0,0,0.3)", textTransform: "uppercase",
                }}>Add photo here</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: photo grid + tables */}
        <div style={{ padding: "3.5rem 2.5rem" }}>

          {/* Headshot */}
          <div style={{
            width: "100%",
            aspectRatio: "1 / 1",
            background: "#d4d0c8",
            overflow: "hidden",
            marginBottom: "2.5rem",
          }}>
            <img
              src="/photos/grad_photo.jpeg"
              alt="John Bui"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
          </div>

          {/* Experience */}
          <div style={{ ...labelStyle, marginTop: 0 }}>
            EXPERIENCE
            <a href="#" style={{ color: "#c84b31", textDecoration: "none", fontSize: "0.65rem", letterSpacing: "0.1em" }}>/ CV →</a>
          </div>
          {EXPERIENCE.map((e, i) => (
            <div key={i} style={rowStyle}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#1a1a1a" }}>{e.company}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#999" }}>{e.role}</span>
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#bbb" }}>{e.year}</span>
            </div>
          ))}

          {/* Watching */}
          <div style={labelStyle}>WATCHING</div>
          {WATCHING.map((w, i) => (
            <div key={i} style={rowStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 12, height: 12, background: w.color, flexShrink: 0 }} />
                <a href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#1a1a1a", textDecoration: "none" }}>{w.title} →</a>
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#bbb" }}>{w.year}</span>
            </div>
          ))}

          {/* Listening */}
          <div style={labelStyle}>LISTENING TO</div>
          {LISTENING.map((l, i) => (
            <div key={i} style={rowStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 12, height: 12, background: l.color, flexShrink: 0 }} />
                <a href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#1a1a1a", textDecoration: "none" }}>{l.title} →</a>
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#999" }}>{l.artist}</span>
            </div>
          ))}

          {/* Reading */}
          <div style={labelStyle}>READING</div>
          {READING.map((l, i) => (
            <div key={i} style={rowStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 12, height: 12, background: l.color, flexShrink: 0 }} />
                <a href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#1a1a1a", textDecoration: "none" }}>{l.title} →</a>
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#999" }}>{l.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
