import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import About from "./components/About";
import Play from "./components/Play";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import Footer from "./components/Footer";

function Nav() {
  const location = useLocation();
  const path = location.pathname;

  const active =
    path.startsWith("/about") ? "about" :
    path.startsWith("/play") ? "play" :
    path.startsWith("/blog") ? "blog" :
    "work";

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
        {[
          { label: "work", to: "/" },
          { label: "about", to: "/about" },
          { label: "play", to: "/play" },
          { label: "blog", to: "/blog" },
        ].map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem", letterSpacing: "0.06em",
              textTransform: "uppercase", textDecoration: "none",
              color: active === label ? "#c84b31" : "#999",
              fontWeight: active === label ? 500 : 400,
              transition: "color 0.2s",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(location);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (location.pathname === displayed.pathname) return;
    setOpacity(0);
    const t = setTimeout(() => {
      setDisplayed(location);
      window.scrollTo(0, 0);
      setOpacity(1);
    }, 250);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <div style={{ opacity, transition: "opacity 0.25s ease" }}>
      <Routes location={displayed}>
        <Route path="/" element={
          <main style={{ paddingTop: 0 }}>
            <Hero />
            <Projects />
            <Footer />
          </main>
        } />
        <Route path="/about" element={
          <main style={{ paddingTop: 48 }}>
            <About />
            <Footer />
          </main>
        } />
        <Route path="/play" element={
          <main style={{ paddingTop: 48 }}>
            <Play />
          </main>
        } />
        <Route path="/projects/:id" element={
          <main style={{ paddingTop: 48 }}>
            <ProjectDetail />
          </main>
        } />
        <Route path="/blog" element={
          <main style={{ paddingTop: 48 }}>
            <Blog />
          </main>
        } />
        <Route path="/blog/:slug" element={
          <main style={{ paddingTop: 48 }}>
            <BlogPost />
          </main>
        } />
      </Routes>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; scroll-padding-top: 60px; }
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

  return (
    <div style={{ background: "#f9f8f5", minHeight: "100vh" }}>
      <Nav />
      <AnimatedRoutes />
    </div>
  );
}
