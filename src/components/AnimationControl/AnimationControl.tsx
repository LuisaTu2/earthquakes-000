import { useContext, useEffect, useState } from "react"
import { MapContext } from "../../context/MapContext"
import { EarthquakesContext } from "../../context/SearchSettingsContext"
import { clearEarthquakeMarkers, hideMarkers, showMarkers } from "../MapControls"
import type { EarthQuake, TimeUnit } from "../../types/global.t"
import "./AnimationControl.css"
import TimeDots from "./TimeDots"
import { ANIMATION_INTERVAL_TIME_MS } from "../../utils/constants"


const AnimationControl = () => {
    const { earthquakes,loading, startDate, endDate  } = useContext(EarthquakesContext) 
    const { isAnimating, mapRef, setIsAnimating } = useContext(MapContext)
    const [ currentTime, setCurrentTime ] = useState<number | null>(null)
    // will most likely end up doing set earthquakes by time unit
    // const [ currentCount, setCurrentCount ] = useState<number | null>(null) 
    const [ startTime, setStartTime ] = useState<number>(0)
    const [ endTime, setEndTime ] = useState<number>(0)
    const [ timeUnitLabel, setTimeUnitLabel] = useState<TimeUnit>("")
    // TODO: update for days
    const disabled = !earthquakes.length || loading || isAnimating || !startDate || !endDate || timeUnitLabel == "day"


    const timeLapse = () => {
        if (startDate === null || endDate === null) {
            return 
        }

        clearEarthquakeMarkers(earthquakes)
        setIsAnimating(true)

        let temp: EarthQuake[] = [];
        let elapsedTime = 0;
        for(let t = startTime; t < endTime + 1; t++){
            const  visibleEarthquakes: EarthQuake[] = earthquakes.filter(e => {
                const earthquakeDate: Date = new Date(e.date)
                if (timeUnitLabel === "year") {
                    return earthquakeDate.getFullYear() === t
                } else if (timeUnitLabel === "month") {
                    return earthquakeDate.getMonth() === t
                } else if (timeUnitLabel === "day") {
                    return earthquakeDate.getDay() === t
                } 
            })

            setTimeout(() => {
                setCurrentTime(t)
                hideMarkers(temp)
                showMarkers(visibleEarthquakes, mapRef)
                
                temp = [...visibleEarthquakes]
                if (t === endTime) {
                    setTimeout(() => {
                        setIsAnimating(false)
                        showMarkers(earthquakes, mapRef)
                        setCurrentTime(null)
                    }, ANIMATION_INTERVAL_TIME_MS)
                }
            }, elapsedTime * ANIMATION_INTERVAL_TIME_MS)
            elapsedTime++
        }
    }


    useEffect(() => {
        if (startDate === null || endDate === null) {
            return
        }

        const startYear = startDate.getFullYear();
        const endYear = endDate.getFullYear();
        if ( endYear > startYear){
            setTimeUnitLabel("year")
            setStartTime(startYear)
            setEndTime(endYear)
            return 
        }

        const startMonth = startDate.getMonth();
        const endMonth = endDate.getMonth();
        if (endMonth > startMonth){
            setTimeUnitLabel("month")
            setStartTime(startMonth)
            setEndTime(endMonth)
            return 
        }
        const startDay = startDate?.getDate() as number;
        const endDay = endDate?.getDate() as number;
        if (endDay > startDay){
            setTimeUnitLabel("day")
            // TODO: decide what to do with days
            return 
        } else {
            // no day display
            return
        }

    }, [startDate, endDate])


    return (
        <div className={`animation-control ${isAnimating ? "container animation-control animation-control-active" : "container animation-control"}`}>  
            <button 
                className="time-lapse-btn"
                disabled={ disabled } 
                onClick={() => timeLapse()}
            >
                play time-lapse
            </button>
            {/* <div>count: {currentCount}</div> */}
            <TimeDots
                timeUnit={timeUnitLabel}
                currentTime={currentTime}
                startTime={startTime as number}
                endTime={endTime as number}
                // TODO: add capability to navigate to one earthquake
                // onClick={() => console.log("clicked me you did")} 
            />
        </div>
    )}

export default AnimationControl