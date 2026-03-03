import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────

  DATA

───────────────────────────────────────── */
const PROJECTS = [
  {
    id: "01",
    title: "Project Alpha",
    category: "FULL-STACK / WEB APP",
    year: "2024",
    desc: "Goal tracking platform for teams. Built for performance and simplicity — ships daily with zero downtime.",
    url: "#",
  },
  {
    id: "02",
    title: "CLI Toolkit",
    category: "OPEN SOURCE / TOOLING",
    year: "2023",
    desc: "Developer workflow automation tool. 500+ GitHub stars. Eliminates busywork so teams can focus on shipping.",
    url: "#",
  },
  {
    id: "03",
    title: "Live Dashboard",
    category: "DATA VIZ / REAL-TIME",
    year: "2023",
    desc: "WebSocket-powered analytics platform with custom charting and multi-tenant architecture at scale.",
    url: "#",
  },
  {
    id: "04",
    title: "Mobile App",
    category: "REACT NATIVE / MOBILE",
    year: "2022",
    desc: "Cross-platform, offline-first mobile application. 10k+ downloads across iOS and Android.",
    url: "#",
  },
];

const EXPERIENCE = [
  { company: "Your Company", role: "Software Engineer", year: "Now" },
  { company: "Prev Startup", role: "Full-Stack Developer", year: "2024" },
  { company: "Agency Co.", role: "Frontend Engineer", year: "2023" },
  { company: "Side Project LLC", role: "Founder / Builder", year: "2022" },
];

const SKILLS = [
  "TypeScript", "React", "Node.js", "Python",
  "PostgreSQL", "Docker", "AWS", "GraphQL", "CI/CD", "Git",
];

/* ─────────────────────────────────────────
   ANIMATED ASCII STRIP
───────────────────────────────────────── */
function AsciiStrip() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const CHARS = ".*+=%#@-~:;,. ";
    const FONT_SIZE = 9;
    const LINE_H = 12;

    let cols, rows, frame = 0, raf;
    // Blob position in pixel space, smoothly follows mouse
    let blobPx = -9999, blobPy = -9999;
    let targetPx = -9999, targetPy = -9999;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.ceil(canvas.width / (FONT_SIZE * 0.62));
      rows = Math.ceil(canvas.height / LINE_H);
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetPx = e.clientX - rect.left;
      targetPy = e.clientY - rect.top;
    };
    const onMouseLeave = () => { targetPx = -9999; targetPy = -9999; };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    function noise(x, y, t) {
      return (
        Math.sin(x * 0.18 + t * 0.7) *
        Math.cos(y * 0.22 - t * 0.5) +
        Math.sin((x + y) * 0.12 + t * 1.1) * 0.5 +
        Math.cos(x * 0.09 - y * 0.15 + t * 0.4) * 0.3
      );
    }

    function draw() {
      frame++;
      const t = frame * 0.022;

      // Smoothly lerp blob toward mouse
      if (targetPx < 0) {
        blobPx = -9999; blobPy = -9999;
      } else {
        blobPx = blobPx < 0 ? targetPx : blobPx + (targetPx - blobPx) * 0.08;
        blobPy = blobPy < 0 ? targetPy : blobPy + (targetPy - blobPy) * 0.08;
      }

      // Blob in char-space
      const blobCx = blobPx / (FONT_SIZE * 0.62);
      const blobCy = blobPy / LINE_H;
      const BLOB_R = 7; // radius in chars

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px "DM Mono", monospace`;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const dx = col - blobCx;
          const dy = row - blobCy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Blob field: smooth circular gaussian falloff
          const blobStrength = blobPx < 0 ? 0 : Math.exp(-(dist * dist) / (BLOB_R * BLOB_R * 0.6));

          // Blob pulses with concentric circular rings
          const blobWave = blobStrength * (
            Math.sin(dist * 1.2 - t * 4.5) * 1.1 +
            Math.sin(dist * 0.5 + t * 2.5) * 0.5 +
            Math.cos(dist * 0.9 - t * 3.2) * 0.3
          );

          // Background wave field
          const bg = noise(col, row, t);

          // Combine — blob wave interacts with background
          const n = bg * (1 - blobStrength * 0.6) + blobWave;

          const norm = Math.max(0, Math.min(1, (n + 1.8) / 3.6));
          const idx = Math.floor(norm * (CHARS.length - 1));
          const ch = CHARS[Math.max(0, Math.min(CHARS.length - 1, idx))];

          // Blob core is slightly darker/richer
          const brightness = Math.floor(norm * 80 + 180);
          const blobDim = Math.floor(brightness * (1 - blobStrength * 0.3));
          ctx.fillStyle = `rgb(${blobDim},${blobDim - 4},${blobDim - 8})`;
          ctx.fillText(ch, col * FONT_SIZE * 0.62, row * LINE_H + FONT_SIZE);
        }
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div style={{
      height: 420, overflow: "hidden",
      marginBottom: "0.5rem",
      position: "relative",
      background: "#f9f8f5",
    }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      {/* Fade to background at bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "10%",
        background: "linear-gradient(to bottom, transparent, #f9f8f5)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   CLOCK
───────────────────────────────────────── */
function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

/* ─────────────────────────────────────────
   NAV
───────────────────────────────────────── */
function Nav({ active }) {
  const links = ["work", "about", "contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "flex-end", alignItems: "center",
      padding: "1.1rem 2.5rem",
      background: "rgba(249,248,245,0.92)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid #e8e6e0",
    }}>
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {links.map((l) => (
          <a key={l} href={`#${l}`} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem", letterSpacing: "0.06em",
            textTransform: "uppercase", textDecoration: "none",
            color: active === l ? "#c84b31" : "#999",
            fontWeight: active === l ? 500 : 400,
            transition: "color 0.2s",
          }}>
            {l}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────
   HERO / INTRO
───────────────────────────────────────── */
function Hero() {
  return (
    <section id="work" style={{
      padding: "0",
    }}>
      <AsciiStrip />

      {/* Name + bio row */}
      <div style={{ padding: "0 2.5rem" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        gap: "2rem", paddingBottom: "3rem",
      }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
          fontWeight: 400, fontStyle: "italic",
          color: "#1a1a1a", lineHeight: 1.1,
          letterSpacing: "-0.01em",
        }}>
          John Bui
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9rem", color: "#555",
          lineHeight: 1.8, fontWeight: 400,
        }}>
          I'm a software engineer with a love for clean architecture, thoughtful interfaces, and shipping things that actually work. Currently building at some shit.
        </p>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.9rem", color: "#555",
          lineHeight: 1.8,
        }}>
          <p>Previously at Tech, now at Home.</p>
          <p style={{ marginTop: "0.75rem", color: "#999" }}>
            Based in Houston, where it's currently <Clock />.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PROJECTS
───────────────────────────────────────── */
function Projects() {
  const [hovered, setHovered] = useState(null);

  // Placeholder colors per project to simulate image banners
  const bannerColors = ["#d4d0c8", "#c8cdd4", "#cdd4c8", "#d4c8c8"];

  return (
    <section style={{ borderBottom: "1px solid #e8e6e0" }}>
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
          {/* Metadata bar above image */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
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
              fontSize: "0.65rem", color: "#999",
              textAlign: "right",
            }}>{p.year}</span>
          </div>

          {/* Image banner */}
          <div style={{
            width: "100%", height: 420,
            background: bannerColors[i],
            overflow: "hidden", position: "relative",
            transition: "filter 0.3s",
            filter: hovered === i ? "brightness(0.95)" : "brightness(1)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* Placeholder label — replace with <img> when you have project images */}
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem", letterSpacing: "0.15em",
              color: "rgba(0,0,0,0.2)", textTransform: "uppercase",
            }}>project image</span>

            {/* Hover arrow */}
            <div style={{
              position: "absolute", top: "1.25rem", right: "1.5rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: hovered === i ? "#1a1a1a" : "transparent",
              transition: "color 0.2s, transform 0.2s",
              transform: hovered === i ? "translate(2px,-2px)" : "none",
            }}>↗</div>
          </div>

          {/* Title + description below image */}
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
              fontSize: "0.85rem", color: "#777",
              lineHeight: 1.75,
            }}>{p.desc}</p>
          </div>
        </a>
      ))}
    </section>
  );
}

/* ─────────────────────────────────────────
   ABOUT
───────────────────────────────────────── */
const WATCHING = [
  { title: "The Green Mile", year: "1999", color: "#222" },
  { title: "Black Swan", year: "2014", color: "#3a5a3a" },
  { title: "The Peanuts Move", year: "2010", color: "#3a4a6a" },
  { title: "Shrek", year: "2005", color: "#6a3a3a" },
];

const LISTENING = [
  { title: "Apple Pie →", artist: "Travis Sott" },
  { title: "Lover Girl →", artist: "Laufey" },
  { title: "vampire →", artist: "Olivia Rodrigo" },
  { title: "Dirty Diana →", artist: "Michael jackson" },
];

const KEYWORDS = [
  {
    id: "basketball",
    label: "basketball player",
    color: "#c84b31",
    bg: "#d4cfc8",
    caption: "On the court 🏀",
  },
  {
    id: "developer",
    label: "software developer",
    color: "#4a7a9b",
    bg: "#c8d0d4",
    caption: "Building things 💻",
  },
  {
    id: "music",
    label: "music lover",
    color: "#7a6a9b",
    bg: "#cec8d4",
    caption: "Always listening 🎵",
  },
  {
    id: "dogs",
    label: "dog person",
    color: "#7a9b6a",
    bg: "#c8d4c8",
    caption: "Dog dad 🐶",
  },
];

function About() {
  const [activeKeyword, setActiveKeyword] = useState("basketball");

  const handleEnter = (id) => setActiveKeyword(id);

  const Keyword = ({ id, label, color }) => (
    <span
      onMouseEnter={() => handleEnter(id)}
      style={{
        color: activeKeyword === id ? color : color,
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

      {/* ── TOP: bio left (with photo below), tables right ── */}
      <div style={{
        display: "grid", gridTemplateColumns: "5fr 7fr",
        alignItems: "start",
        borderBottom: "1px solid #e8e6e0",
      }}>

        {/* LEFT: bio paragraphs + photo slideshow below */}
        <div style={{ borderRight: "1px solid #e8e6e0" }}>
          {/* Bio text */}
          <div style={{ padding: "3.5rem 2.5rem 2rem" }}>
            {[
              <>I'm <span style={{ color: "#c84b31" }}>John Bui</span> — a software engineer who cares deeply about craft. I build full-stack applications with a focus on clean architecture, developer experience, and real-world usability.</>,
              <>I got into engineering because I love solving hard problems elegantly. Whether it's a distributed backend system or a pixel-perfect UI, I bring the same attention to detail to everything I touch.</>,
              <>Outside of work, you'll find me on the{" "}
                <Keyword id="basketball" label="basketball court" color="#c84b31" />,{" "}
                <Keyword id="music" label="listening to music" color="#7a6a9b" />, spending time with my{" "}
                <Keyword id="dogs" label="dogs" color="#7a9b6a" />, or{" "}
                <Keyword id="developer" label="tinkering on side projects" color="#4a7a9b" />.</>,
            ].map((text, i) => (
              <p key={i} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem", color: "#333",
                lineHeight: 1.9, marginBottom: "1.25rem",
              }}>{text}</p>
            ))}
          </div>

          {/* Photo slideshow underneath bio */}
          <div style={{
            position: "relative", overflow: "hidden",
            height: 300,
            borderTop: "1px solid #e8e6e0",
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
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "rgba(0,0,0,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "2.5rem",
                }}>
                </div>
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

          {/* Photo grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.4rem", marginBottom: "2.5rem",
          }}>
            {["#d4d0c8", "#c8cdd4", "#cdd4c8", "#d4c8d0"].map((bg, i) => (
              <div key={i} style={{
                height: 160, background: bg,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.55rem", color: "rgba(0,0,0,0.2)",
                  letterSpacing: "0.1em",
                }}>photo</span>
              </div>
            ))}
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
                <div style={{ width: 12, height: 12, background: "#e8e6e0", flexShrink: 0 }} />
                <a href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#1a1a1a", textDecoration: "none" }}>{l.title}</a>
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#999" }}>{l.artist}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT
───────────────────────────────────────── */
function Contact() {
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
            Open to new roles, freelance projects, and interesting collaborations. If you're building something ambitious, reach out.
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
              textDecoration: "none",
              color: "#555",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
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
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem", color: "#888", lineHeight: 2,
          }}>
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
              padding: "0.85rem 2rem",
              transition: "background 0.15s",
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

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1.25rem 2.5rem",
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.62rem", letterSpacing: "0.1em",
      color: "#bbb", borderTop: "1px solid #e8e6e0",
    }}>
      <span>© 2025 YOUR NAME</span>
      <span>BUILT WITH REACT</span>
    </footer>
  );
}

/* ─────────────────────────────────────────
   PLAY
───────────────────────────────────────── */
const PHOTOS = [
  { id: 1, bg: "#2a2a2a", label: "Add photo", height: 580, caption: "Caption here", category: "PHOTOGRAPHY" },
  { id: 2, bg: "#3a3530", label: "Add photo", height: 280, caption: "Caption here", category: "LIFE" },
  { id: 3, bg: "#2d3035", label: "Add photo", height: 420, caption: "Caption here", category: "TRAVEL" },
  { id: 4, bg: "#302a2d", label: "Add photo", height: 340, caption: "Caption here", category: "PHOTOGRAPHY" },
  { id: 5, bg: "#2a302d", label: "Add photo", height: 500, caption: "Caption here", category: "LIFE" },
  { id: 6, bg: "#2d2a30", label: "Add photo", height: 260, caption: "Caption here", category: "TRAVEL" },
  { id: 7, bg: "#303028", label: "Add photo", height: 380, caption: "Caption here", category: "LIFE" },
  { id: 8, bg: "#283030", label: "Add photo", height: 460, caption: "Caption here", category: "PHOTOGRAPHY" },
  { id: 9, bg: "#302830", label: "Add photo", height: 310, caption: "Caption here", category: "TRAVEL" },
  { id: 10, bg: "#2a2830", label: "Add photo", height: 540, caption: "Caption here", category: "LIFE" },
  { id: 11, bg: "#30282a", label: "Add photo", height: 290, caption: "Caption here", category: "PHOTOGRAPHY" },
  { id: 12, bg: "#283028", label: "Add photo", height: 440, caption: "Caption here", category: "TRAVEL" },
];

function Play() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ background: "#111", minHeight: "100vh", padding: "0" }}>
      {/* Masonry-style 3-column grid */}
      <div style={{
        columns: 3,
        columnGap: 0,
        lineHeight: 0,
      }}>
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
            }}
          >
            {/* Photo placeholder — swap for <img> */}
            <div style={{
              width: "100%",
              height: p.height,
              background: p.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "filter 0.3s",
              filter: hovered === p.id ? "brightness(0.6)" : "brightness(1)",
            }}>
              {/* Orange accent dot like reference */}
              <div style={{
                position: "absolute", top: 16, left: 16,
                width: 10, height: 10,
                background: "#c84b31",
                opacity: hovered === p.id ? 1 : 0,
                transition: "opacity 0.3s",
              }} />
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem", letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.15)", textTransform: "uppercase",
              }}>{p.label}</span>
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

            {/* Arrow on hover */}
            <div style={{
              position: "absolute", bottom: "1rem", right: "1.25rem",
              width: 32, height: 32,
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem", color: "#fff",
              opacity: hovered === p.id ? 1 : 0,
              transition: "opacity 0.3s",
            }}>↗</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SCROLL SPY (only used on home page)
───────────────────────────────────────── */
function useActiveSection() {
  const [active, setActive] = useState("work");
  useEffect(() => {
    const ids = ["work", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ─────────────────────────────────────────
   APP
───────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [visible, setVisible] = useState(true);
  const [pendingNav, setPendingNav] = useState(null);
  const scrollActive = useActiveSection();
  const active = page === "about" ? "about" : page === "play" ? "play" : scrollActive;

  useEffect(() => {
    // Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap";
    document.head.appendChild(link);

    // Global reset
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        background: #f9f8f5;
        color: #1a1a1a;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        cursor: default;
      }
      a { cursor: pointer; }
      button { cursor: pointer; }
      ::selection { background: #1a1a1a; color: #f9f8f5; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #f9f8f5; }
      ::-webkit-scrollbar-thumb { background: #ddd; }
      input::placeholder, textarea::placeholder { color: #ccc; }
    `;
    document.head.appendChild(style);
  }, []);

  // When a nav item is clicked, fade out → swap page → fade in
  const navigateTo = (targetPage, scrollId) => {
    if (targetPage === page && !scrollId) return;
    setVisible(false);
    setPendingNav({ targetPage, scrollId });
  };

  useEffect(() => {
    if (visible || !pendingNav) return;
    const timer = setTimeout(() => {
      setPage(pendingNav.targetPage);
      window.scrollTo(0, 0);
      setPendingNav(null);
      setVisible(true);
      if (pendingNav.scrollId) {
        setTimeout(() => {
          const el = document.getElementById(pendingNav.scrollId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 80);
      }
    }, 280); // fade-out duration
    return () => clearTimeout(timer);
  }, [visible, pendingNav]);

  const nav = (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "flex-end", alignItems: "center",
      padding: "1.1rem 2.5rem",
      background: "rgba(249,248,245,0.92)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid #e8e6e0",
    }}>
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {["work", "about", "play"].map((l) => (
          <a key={l}
            onClick={(e) => {
              e.preventDefault();
              if (l === "about") navigateTo("about", null);
              else if (l === "play") navigateTo("play", null);
              else navigateTo("home", l);
            }}
            href="#"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem", letterSpacing: "0.06em",
              textTransform: "uppercase", textDecoration: "none",
              color: active === l ? "#c84b31" : "#999",
              fontWeight: active === l ? 500 : 400,
              transition: "color 0.2s",
            }}>
            {l}
          </a>
        ))}
      </div>
    </nav>
  );

  const pageContent = page === "about" ? (
    <main style={{ paddingTop: 48 }}>
      <About />
      <Footer />
    </main>
  ) : page === "play" ? (
    <main style={{ paddingTop: 48 }}>
      <Play />
    </main>
  ) : (
    <main style={{ paddingTop: 0 }}>
      <Hero />
      <Projects />
      <Footer />
    </main>
  );

  return (
    <div style={{ background: "#f9f8f5", minHeight: "100vh" }}>
      {nav}
      <div style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.28s ease",
      }}>
        {pageContent}
      </div>
    </div>
  );
}
