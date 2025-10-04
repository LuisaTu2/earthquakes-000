import { useContext } from "react"
import { MapContext } from "../../context/MapContext"
import { EarthquakesContext } from "../../context/SearchSettingsContext"


const AnimationControl = () => {
    const { earthquakes,loading,   } = useContext(EarthquakesContext) 
    const { isAnimating, setIsAnimating } = useContext(MapContext)

    return <div>
        <button disabled={!earthquakes.length || loading || isAnimating } onClick={() => setIsAnimating(true)}>animate</button>
    </div>
}

export default AnimationControl