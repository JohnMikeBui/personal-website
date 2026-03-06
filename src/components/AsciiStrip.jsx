import { useEffect, useRef } from "react";

export default function AsciiStrip() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const CHARS = ".*+=%#@-~:;,. ";
    const FONT_SIZE = 9;
    const LINE_H = 12;

    let cols, rows, frame = 0, raf;
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

      if (targetPx < 0) {
        blobPx = -9999; blobPy = -9999;
      } else {
        blobPx = blobPx < 0 ? targetPx : blobPx + (targetPx - blobPx) * 0.08;
        blobPy = blobPy < 0 ? targetPy : blobPy + (targetPy - blobPy) * 0.08;
      }

      const blobCx = blobPx / (FONT_SIZE * 0.62);
      const blobCy = blobPy / LINE_H;
      const BLOB_R = 7;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px "DM Mono", monospace`;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const dx = col - blobCx;
          const dy = row - blobCy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const blobStrength = blobPx < 0 ? 0 : Math.exp(-(dist * dist) / (BLOB_R * BLOB_R * 0.6));
          const blobWave = blobStrength * (
            Math.sin(dist * 1.2 - t * 4.5) * 1.1 +
            Math.sin(dist * 0.5 + t * 2.5) * 0.5 +
            Math.cos(dist * 0.9 - t * 3.2) * 0.3
          );

          const bg = noise(col, row, t);
          const n = bg * (1 - blobStrength * 0.6) + blobWave;

          const norm = Math.max(0, Math.min(1, (n + 1.8) / 3.6));
          const idx = Math.floor(norm * (CHARS.length - 1));
          const ch = CHARS[Math.max(0, Math.min(CHARS.length - 1, idx))];

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
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "10%",
        background: "linear-gradient(to bottom, transparent, #f9f8f5)",
        pointerEvents: "none",
      }} />
    </div>
  );
}
