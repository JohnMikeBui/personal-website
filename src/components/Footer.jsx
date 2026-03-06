export default function Footer() {
  return (
    <footer style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1.25rem 2.5rem",
      fontFamily: "'DM Mono', monospace",
      fontSize: "0.62rem", letterSpacing: "0.1em",
      color: "#bbb", borderTop: "1px solid #e8e6e0",
    }}>
      <span>© 2025 JOHN BUI</span>
      <span>BUILT WITH REACT</span>
    </footer>
  );
}
