import { useEffect, useState } from "react";
import Legend from "./Legend";

export default function LegendBubble() {
  const [collapsed, setCollapsed] = useState(false); 


  useEffect(() => {
    const collapseTimer = setTimeout(() => setCollapsed(true), 3000);
      return () => clearTimeout(collapseTimer);
  }, []);

  const handleClick = () => {
    setCollapsed(!collapsed); 
  };

  return (
    <div
      onClick={handleClick}
      className="legend-bubble"
      style={{
        position: "fixed",
        left: collapsed ? "15px" : "10px",
        // right: "15px",
        bottom: "33px",
        width: collapsed ? "34px" : "120px",
        height: collapsed ? "30px" : "110px",
        borderRadius:  collapsed ? "50%" : "12px",
        // border: collapsed ? "2px solid white" : "none",
        // backgroundColor: collapsed ? "" : "#166534",
        background: collapsed ? 
            "radial-gradient(circle at 30% 30%, rgba(249, 237, 237, 0.96), transparent 40%), linear-gradient(to bottom right, #166534 30%, #447e5aff 80%)" 
            : 
            "linear-gradient(to bottom,  #c5dcceff 30%, #9bb3a5ff 60%, rgba(90, 145, 112, 1) 90%)",
        // color: "#166534",
        textAlign: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.4s ease",
        overflow: "hidden",
        fontSize: collapsed ? "20px" : "15px",
        padding: collapsed ? "0px" : "10px",
        paddingTop: collapsed ? "3px" : "15px",
        paddingBottom: collapsed ? "0" : "0px",
        placeItems: "center",
        opacity: collapsed ? "90%" : "100%",
      }}
    >
      {collapsed ? "" : <Legend />}
    </div>
  );
}