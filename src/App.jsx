import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import About from "./components/About";
import Contact from "./components/Contact";
import Play from "./components/Play";
import Footer from "./components/Footer";
import useActiveSection from "./hooks/useActiveSection";

export default function App() {
  const [page, setPage] = useState("home");
  const [visible, setVisible] = useState(true);
  const [pendingNav, setPendingNav] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollActive = useActiveSection();
  const active = page === "about" ? "about" : page === "play" ? "play" : scrollActive;

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

  const navigateTo = (targetPage, scrollId) => {
    if (targetPage === page && !scrollId) return;
    setVisible(false);
    setPendingNav({ targetPage, scrollId });
  };

  const openProject = (project) => {
    setSelectedProject(project);
    navigateTo("project", null);
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
    }, 280);
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
            }}
          >
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
  ) : page === "project" && selectedProject ? (
    <main style={{ paddingTop: 48 }}>
      <ProjectDetail
        project={selectedProject}
        onBack={() => navigateTo("home", "work")}
      />
    </main>
  ) : (
    <main style={{ paddingTop: 0 }}>
      <Hero />
      <Projects onProjectClick={openProject} />
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
