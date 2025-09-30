import { useEffect, useState } from "react";
import { WEBSITE_URL } from "../../utils/constants";

export default function CreditBubble() {
  const [show, setShow] = useState(false); 
  const [collapsed, setCollapsed] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (show) {
      const collapseTimer = setTimeout(() => setCollapsed(true), 3000);
      return () => clearTimeout(collapseTimer);
    }
  }, [show]);

  const handleClick = () => {
    setCollapsed(!collapsed); 
    const newTab = window.open(WEBSITE_URL, "_blank");
    if (newTab) newTab.blur();       // remove focus from the new tab
    window.focus();                   // bring focus back to your app
  };

  return (
    <div
      onClick={handleClick}
      className="credit-bubble"
      style={{
        position: "fixed",
        right: collapsed ? "20px" : "20px",
        bottom: "20px",
        width: collapsed ? "30px" : "72px",
        height: collapsed ? "28px" : "72px",
        borderRadius: "50%",
        backgroundColor: "rgba(224, 200, 200, 0.8)",
        color: "#fff",
        textAlign: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 1s ease",
        overflow: "hidden",
        fontSize: collapsed ? "20px" : "15px",
        padding: collapsed ? "0px" : "10px",
        paddingTop: collapsed ? "3px" : "15px",
        paddingBottom: collapsed ? "0" : "0px",
        placeItems: "center",
        opacity: collapsed ? "60%" : "80%",
      }}
    >
      {collapsed ? "🌍" : `made somewhere in the 🌍`}
    </div>
  );
}