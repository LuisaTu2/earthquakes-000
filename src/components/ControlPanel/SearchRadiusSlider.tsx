import { useContext, useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "./SearchRadiusSlider.css"
import { EarthquakesContext } from "../../context/SearchSettingsContext";
import { MAX_RADIUS } from "../../utils/constants";

interface SearchRadiusSliderProps {
     onRadiusChange: (value: number | number[]) => void
}

export const SearchRadiusSlider = ({ onRadiusChange }: SearchRadiusSliderProps) => {
    const { loading } = useContext(EarthquakesContext)
    const [radius, setRadius] = useState<number | string>(500);

    // debounce effect
    useEffect(() => {
      if (radius === 0 || radius === "" || Number(radius) > MAX_RADIUS) return
      const timeout = setTimeout(() => {
          onRadiusChange(Number(radius))
      }, 1000);

      return () => clearTimeout(timeout);
    }, [radius]);
  
  return (
    <div className="search-radius-container" >
          <input
              id="radius"
              type="number"
              value={radius}
              min={0}
              max={MAX_RADIUS}
              step={100}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
              onChange={(e) =>{ 
                const val = e.target.value;
                let r = null;
                  if (val === "") {
                    r = ""; // allow empty input
                  } else {
                    r = Number(val); // convert to number when not empty
                  }
                  setRadius(r)
              }}
              className="search-radius-input"
              disabled={loading}
              onBlur={() => {
                if (radius.toString() === "") setRadius(0);
              }}
          />
              {radius === 0 ? (
            <p className="search-radius-warning"> 
            * radius cannot be zero</p>
          ) : Number(radius) > MAX_RADIUS ?(
            <p className="search-radius-warning"> 
            * radius must be &lt; {MAX_RADIUS}</p>
          ) : null 
        
        }

        </div>
  )
}

export default SearchRadiusSlider;





// obsolete but check
  // const [debouncedValue, setDebouncedValue] = useState(searchRadius);
  // useEffect(() => {
  //     const handler = setTimeout(() => {
  //       setDebouncedValue(searchRadius)
  //     }, delay);
  //     return () => {
  //       clearTimeout(handler); 
  //       setLoading(false)}; // cleanup on value change
  //   }, [searchRadius, delay]);

  // useEffect(() => {
  //     if (!center || startDate == null || endDate === null) return;
  //       fetchEarthquakes({epicenter: center, startDate, endDate, searchRadius, setLoading, setEarthquakes})
  // }, [debouncedValue])



    {/* other options  */}

    {/* <div className="flex items-center gap-2">
      <label htmlFor="radius" className="text-gray-700 font-medium">
        Search radius:
      </label>
      <select
        id="radius"
        value={radius}
        onChange={(e) => setRadius(Number(e.target.value))}
        className="px-4 py-2 border rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {radii.map((r) => (
          <option key={r} value={r}>
            {r} km
          </option>
        ))}
      </select>
    </div> */}

      {/* <p className="search-radius-label">search radius: {searchRadius} km</p>
      <Slider
        min={0}
        max={1000}
        step={10}
        marks={{
          100: "100 km",
          500: "500 km",
          1000: "1000 km",
        }}
        value={searchRadius}
        onChange={onRadiusChange}
        trackStyle={{ backgroundColor: "#1e79e9ff", height: 5 }}
        railStyle={{ backgroundColor: "#ddd", height: 5 }}
        handleStyle={{
          borderColor: "#1e79e9ff",
          height: 12,
          width: 12,
          marginTop: -4,
          backgroundColor: "#fff",
        }}
        dotStyle={{ borderColor: "#e91e63" }}
        activeDotStyle={{ borderColor: "#e91e63" }}
        disabled={loading}
      /> */}