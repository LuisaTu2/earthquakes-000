// SeismicLoader.tsx
import React from "react";
import "./Loader.css";

const SeismicLoader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader-circle"></div>
      <div className="loader-circle delay1"></div>
      <div className="loader-circle delay2"></div>
    </div>
  );
};

export default SeismicLoader;
