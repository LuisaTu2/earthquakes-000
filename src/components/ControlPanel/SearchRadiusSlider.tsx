import { useContext, useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "./SearchRadiusSlider.css"
import { EarthquakesContext } from "../../context/SearchSettingsContext";
import { MAX_RADIUS } from "../../utils/constants";
import { MapContext } from "../../context/MapContext";

interface SearchRadiusSliderProps {
     onRadiusChange: (value: number | number[]) => void
}

export const SearchRadiusSlider = ({ onRadiusChange }: SearchRadiusSliderProps) => {
    const { loading } = useContext(EarthquakesContext)
    const { isAnimating } = useContext(MapContext)
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
              disabled={loading || isAnimating}
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