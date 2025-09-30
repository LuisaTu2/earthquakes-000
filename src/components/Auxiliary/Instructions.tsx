import { useEffect, useState } from "react";
import "./Instructions.css";

export default function Instructions() {
  const [visible, setVisible] = useState(true);


  useEffect(() => {
    // const timer = setTimeout(() => setVisible(false), 6000);

    // // Cleanup if component unmounts early
    // return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return <div className="instructions">
      <div className="instructions-indicator"> ╰┈➤ </div>
      <div className="instructions-text"> type in a location to start </div>
  </div>;
}
