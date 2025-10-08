import "./Legend.css"

const Legend = () => {
    return (
        <div className="map-legend">
            {/* <div className="legend-title">earthquake intensity</div> */}
            <div className="legend-item">
                <span className="legend-color mag-low"></span>
                <span className="legend-label"> mag &lt;= 5 </span>
            </div>
            <div className="legend-item">
                <span className="legend-color mag-medium"></span>
                <span className="legend-label"> 5 &lt; mag &lt;= 8 </span>
            </div>
            <div className="legend-item">
                <span className="legend-color mag-high"></span>
                <span className="legend-label"> 8 &lt; mag &lt;= 10</span>
            </div>
        </div>
    )
}


export default Legend;

