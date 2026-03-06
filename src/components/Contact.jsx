import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const inputStyle = {
    background: "transparent", border: "none",
    borderBottom: "1px solid #e0ddd8",
    color: "#1a1a1a",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem", padding: "0.75rem 0", outline: "none",
    width: "100%", transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.62rem", letterSpacing: "0.15em",
    textTransform: "uppercase", color: "#bbb",
  };

  return (
    <section id="contact" style={{
      display: "grid", gridTemplateColumns: "1fr 1fr",
      borderBottom: "1px solid #e8e6e0",
    }}>
      {/* Left */}
      <div style={{
        padding: "4rem 2.5rem",
        borderRight: "1px solid #e8e6e0",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 400, fontStyle: "italic",
            color: "#1a1a1a", lineHeight: 1.1,
            letterSpacing: "-0.02em", marginBottom: "1.5rem",
          }}>
            Let's work<br />together.
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem", color: "#888", lineHeight: 1.8,
            maxWidth: "36ch",
          }}>
            Open to new roles, freelance projects, and interesting collaborations.
            If you're building something ambitious, reach out.
          </p>
        </div>

        <div style={{ marginTop: "3rem" }}>
          {[
            ["EMAIL", "hello@yourname.dev", "mailto:hello@yourname.dev"],
            ["GITHUB", "github.com/yourname", "https://github.com"],
            ["LINKEDIN", "linkedin.com/in/yourname", "https://linkedin.com"],
          ].map(([label, val, href]) => (
            <a key={label} href={href} style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: "0.9rem 0",
              borderBottom: "1px solid #f0eee9",
              textDecoration: "none", color: "#555",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
              transition: "color 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#1a1a1a"}
              onMouseLeave={e => e.currentTarget.style.color = "#555"}
            >
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "#ccc" }}>{label}</span>
              <span>{val} ↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div style={{ padding: "4rem 2.5rem" }}>
        {sent ? (
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#888", lineHeight: 2 }}>
            <div style={{ color: "#c84b31", fontStyle: "italic", fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
              Message sent.
            </div>
            I'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { k: "name", label: "Your Name", ph: "Jane Smith", type: "text" },
              { k: "email", label: "Email", ph: "jane@example.com", type: "email" },
            ].map(({ k, label, ph, type }) => (
              <div key={k} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={labelStyle}>{label}</label>
                <input type={type} placeholder={ph} required
                  value={fields[k]} onChange={set(k)}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = "#1a1a1a"}
                  onBlur={e => e.target.style.borderBottomColor = "#e0ddd8"}
                />
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={labelStyle}>Message</label>
              <textarea placeholder="Tell me about your project..." required rows={5}
                value={fields.message} onChange={set("message")}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={e => e.target.style.borderBottomColor = "#1a1a1a"}
                onBlur={e => e.target.style.borderBottomColor = "#e0ddd8"}
              />
            </div>
            <button type="submit" style={{
              alignSelf: "flex-start",
              background: "#1a1a1a", color: "#fff",
              border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem", fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "0.85rem 2rem", transition: "background 0.15s",
            }}
              onMouseEnter={e => e.target.style.background = "#c84b31"}
              onMouseLeave={e => e.target.style.background = "#1a1a1a"}
            >
              Send Message →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
