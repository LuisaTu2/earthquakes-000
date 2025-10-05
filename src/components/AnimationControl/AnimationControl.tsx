import { useContext, useEffect, useState } from "react"
import { MapContext } from "../../context/MapContext"
import { EarthquakesContext } from "../../context/SearchSettingsContext"
import { clearEarthquakeMarkers, hideMarkers, showMarkers } from "../MapControls"
import type { TimeLapseProps, EarthQuake, TimeUnit } from "../../types/global.t"
import "./AnimationControl.css"


const AnimationControl = () => {
    const { earthquakes,loading, startDate, endDate  } = useContext(EarthquakesContext) 
    const { isAnimating, mapRef, setIsAnimating } = useContext(MapContext)
    const [currentTime, setCurrentTime] = useState<number | null>(null)
    const [timeUnitLabel, setTimeUnitLabel] = useState<TimeUnit>("")
    const visible = !!earthquakes.length
    const disabled = !earthquakes.length || loading || isAnimating || !startDate || !endDate


    const timeLapse = ({ earthquakes, startDate, endDate,  mapRef }: TimeLapseProps) => {
        let start = null;
        let end = null;
        let temp: EarthQuake[] = [];
        let elapsedTime = 0;
        let timeUnit: TimeUnit = ""
        
        const startYear = startDate?.getFullYear();
        const endYear = endDate?.getFullYear();
        const startMonth = startDate?.getMonth();
        const endMonth = endDate?.getMonth();
        const startDay = startDate?.getDate() as number;
        const endDay = endDate?.getDate() as number;

        // TODO: improve type here
        if (endYear !== null && startYear !== null  && (endYear !== startYear)){
            start = startYear as number
            end = endYear as number
            timeUnit = "year"
        } else if (endMonth !== null  && startMonth !== null && (endMonth !== startMonth)){
            start = startMonth as number
            end = endMonth as number
            timeUnit = "month"
        } else {
            start = startDay as number
            end = endDay as number
            timeUnit = "day"
        }
        setTimeUnitLabel(timeUnit)

        // let time = 0;
        for(let t = start; t < end + 1; t++){
            const earthquakesInTimeUnit: EarthQuake[] = earthquakes.filter(e => {
                const earthquakeDate: Date = new Date(e.date)
                if (timeUnit === "year") {
                    return earthquakeDate.getFullYear() === t
                } else if (timeUnit === "month") {
                    return earthquakeDate.getMonth() === t
                } else if (timeUnit === "day") {
                    return earthquakeDate.getDay() === t
                } 
            })

            setTimeout(() => {
                setCurrentTime(t)
                hideMarkers(temp)
                showMarkers(earthquakesInTimeUnit, mapRef)
                // console.log(t, "2    temp: ", temp, "eqinyear: ", earthquakesInTimeUnit)

                temp = [...earthquakesInTimeUnit]
                if (t === end) {
                    setIsAnimating(false)
                    setTimeout(() => {
                        showMarkers(earthquakes, mapRef)
                    }, 4000)
                }
            }, elapsedTime * 4000)
            elapsedTime++
        }
    }


    useEffect(() => {
        if (isAnimating && earthquakes.length) {
            clearEarthquakeMarkers(earthquakes)
            timeLapse({ earthquakes, startDate, endDate, mapRef })
            return
        }
        if(!isAnimating){
            setCurrentTime(null)
            setTimeUnitLabel("")
        }
    }, [isAnimating])

    return <>
        {
            visible &&
                <>
                    <div className="animation-control">
                        <button 
                            className="time-lapse-btn"
                            disabled={ disabled } 
                            onClick={() => setIsAnimating(true)}
                        >
                            play time-lapse
                        </button>
                        {
                            isAnimating && <div className="time-label">
                                { `${timeUnitLabel} ${ currentTime }`}
                            </div>
                        }
                    </div>

            </>
        }
        </>
}

export default AnimationControl