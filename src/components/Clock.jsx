import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("en-US", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}
