import { useEffect } from "react";

export default function ScrollAfterDelay() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById("control-panel");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 3000);
    return () => clearTimeout(timer); // cleanup if component unmounts
  }, []);

  return null;
}
