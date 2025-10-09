import { EarthquakesContext } from "../../context/SearchSettingsContext";
import "./EarthquakesSummary.css"
import { useContext } from "react";


const EarthquakesSummary = () => {
  const {earthquakes, loading} = useContext(EarthquakesContext) 

  return (
    <div className={"container stats-container"}>
      <div className="container-title">stats</div>
      <div className="summary-item">
        <span className="label summary-label">total quakes</span>
        <span className="value">{loading ? "-" : earthquakes.length}</span>
      </div>
      <div className="summary-item">
        <span className="label summary-label">largest magnitude</span>
        <span className="value">{ loading ? "-" : earthquakes.length ? Math.max(...earthquakes.map(e => e.magnitude)) : 0}</span>
      </div>
      <div className="summary-item">
        <span className="label summary-label">average magnitude</span>
        <span className="value">{loading ? "-" : earthquakes.length && (earthquakes.reduce((sum, quake) => sum + quake.magnitude, 0) / earthquakes.length).toFixed(3)}</span>
      </div>
    </div>
  );
};

export default EarthquakesSummary;