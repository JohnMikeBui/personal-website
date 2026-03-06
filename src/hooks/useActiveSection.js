import { useState, useEffect } from "react";

export default function useActiveSection() {
  const [active, setActive] = useState("work");

  useEffect(() => {
    const ids = ["work", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return active;
}
