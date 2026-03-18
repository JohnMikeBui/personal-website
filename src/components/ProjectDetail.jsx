import { useParams, useNavigate } from "react-router-dom";
import { PROJECTS } from "../data";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 2.5rem" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#999" }}>Project not found.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 2.5rem" }}>
      {/* Back */}
      <button
        onClick={() => navigate("/")}
        style={{
          background: "none", border: "none", padding: 0,
          fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#999", cursor: "pointer", marginBottom: "3rem",
          display: "flex", alignItems: "center", gap: "0.4rem",
        }}
      >
        ← Work
      </button>

      {/* Hero image */}
      <div style={{
        width: "100%", height: 520, overflow: "hidden",
        background: "#d4d0c8", marginBottom: "2.5rem",
      }}>
        <img
          src={project.src}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Metadata row */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "1px solid #e8e6e0", paddingBottom: "1rem",
        marginBottom: "2rem",
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: "0.65rem",
          letterSpacing: "0.1em", color: "#999", textTransform: "uppercase",
        }}>
          {project.category}
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#999",
        }}>
          {project.year}
        </span>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: "'DM Serif Display', serif", fontWeight: 400,
        fontStyle: "italic", fontSize: "clamp(2rem, 5vw, 3.5rem)",
        letterSpacing: "-0.02em", lineHeight: 1.1,
        color: "#1a1a1a", marginBottom: "2rem",
      }}>
        {project.title}
      </h1>

      {/* Description */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "1rem",
        color: "#555", lineHeight: 1.85, marginBottom: "3rem",
        maxWidth: 640,
      }}>
        {project.longDesc || project.desc}
      </p>

      {/* Tech stack */}
      {project.tech && project.tech.length > 0 && (
        <div style={{ marginBottom: "3rem" }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: "0.65rem",
            letterSpacing: "0.1em", color: "#999", textTransform: "uppercase",
            display: "block", marginBottom: "1rem",
          }}>
            Technologies
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {project.tech.map((t) => (
              <span key={t} style={{
                fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
                border: "1px solid #e8e6e0", padding: "0.3rem 0.75rem",
                color: "#555",
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", color: "#1a1a1a",
                borderBottom: "1px solid #1a1a1a", paddingBottom: "2px",
              }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
