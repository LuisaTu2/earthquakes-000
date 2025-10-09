import { useContext, useEffect, useState } from "react"
import { MapContext } from "../../context/MapContext"
import { EarthquakesContext } from "../../context/SearchSettingsContext"
import { clearEarthquakeMarkers, hideMarkers, showMarkers } from "../MapControls"
import type { EarthQuake, MagnitudeIntensity, TimeUnit } from "../../types/global.t"
import "./AnimationControl.css"
import { ANIMATION_INTERVAL_TIME_MS } from "../../utils/constants"
import TimeAnimation from "./TimeAnimation"
import EarthquakesSummary from "../Summary/EarthquakesSummary"
import MagnitudeAnimation from "./MagnitudeAnimation"


const AnimationControl = () => {
    const { earthquakes,loading, startDate, endDate  } = useContext(EarthquakesContext) 
    const { isAnimating, mapRef, setIsAnimating } = useContext(MapContext)
    const [ currentTime, setCurrentTime ] = useState<number | null>(null)
    const [ currentCount, setCurrentCount ] = useState<number | null>(null) 
    const [ currentIntensity, setCurrentIntensity ] = useState<MagnitudeIntensity>("") 
    const [ startTime, setStartTime ] = useState<number>(0)
    const [ endTime, setEndTime ] = useState<number>(0)
    const [ timeUnitLabel, setTimeUnitLabel] = useState<TimeUnit>("")
    const [ showStats, setShowStats ] = useState<boolean>(false);
    // TODO: update for days
    const disabled = !earthquakes.length || loading || isAnimating || !startDate || !endDate 


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
                setCurrentCount(visibleEarthquakes.length)
                
                temp = [...visibleEarthquakes]
                if (t === endTime) {
                    setTimeout(() => {
                        setIsAnimating(false)
                        showMarkers(earthquakes, mapRef)
                        setCurrentTime(null)
                        setCurrentCount(0)
                    }, ANIMATION_INTERVAL_TIME_MS)
                }
            }, elapsedTime * ANIMATION_INTERVAL_TIME_MS)
            elapsedTime++
        }
    }


    const filterByMagnitude = () => {
        let prev: EarthQuake[] = []
        setIsAnimating(true);
        clearEarthquakeMarkers(earthquakes)

        for(let t = 0; t < 3; t++){

            const visibleEarthquakes: EarthQuake[] = earthquakes.filter(e => {
                if(t === 0) {
                    return e.magnitude <= 5
                } else if (t === 1) {
                    return 5 < e.magnitude && e.magnitude <= 8
                } else {
                }
            })
            setTimeout(() => {
                hideMarkers(prev)
                showMarkers(visibleEarthquakes, mapRef)
                setCurrentCount(visibleEarthquakes.length)
                setCurrentIntensity(t === 0 ? "low" : t === 1 ? "medium" : "high")

                prev = [...visibleEarthquakes]
                if (t === 2) {
                    setTimeout(() => {
                        setIsAnimating(false)
                        showMarkers(earthquakes, mapRef)
                        setCurrentCount(0)
                        setCurrentIntensity("")
                    }, ANIMATION_INTERVAL_TIME_MS)
                }
            }, t * ANIMATION_INTERVAL_TIME_MS)
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


    useEffect(() => {
        if(isAnimating){
            setShowStats(false)
        }
    }, [isAnimating])


    // ${isAnimating ? "container animation-control animation-control-active" : "container animation-control"}
    return (
        <div className={`container animation-control 
                `}
            >  
            <div className="container-title">animation panel</div>
            <div className="animation-control-buttons"> 
                <button         
                    // className="time-lapse-btn"
                    className="timelapse-btn"
                    disabled={ disabled || timeUnitLabel == "day" } 
                    onClick={() => timeLapse()}
                >
                    <div  className="timelapse-btn-text">
                        time-lapse
                    </div>
                    {/* <div  className="timelapse-btn-emoji">
                        ⏳
                    </div> */}
                    {/* <span className="tooltip-text">view earthquakes over time</span> */}
                    {/* play button */}
                </button>
                <button 
                    className="timelapse-btn"
                    disabled={ disabled } 
                    onClick={() => filterByMagnitude()}
                >
                    <div className="timelapse-btn-text">
                        magnitude
                    </div>
                </button>
                <button 
                    className="timelapse-btn"
                    disabled={ disabled } 
                    onClick={() => setShowStats(!showStats)}
                >
                    <div className="timelapse-btn-text">
                        stats
                    </div>
                </button>
            </div>

            {isAnimating &&  currentTime && 
                <TimeAnimation
                    timeUnit={timeUnitLabel}
                    currentTime={currentTime}
                    currentCount={currentCount}
                    startTime={startTime as number}
                    endTime={endTime as number}
                />
            }

            {isAnimating && currentTime === null && 
                <MagnitudeAnimation
                    intensity={currentIntensity}
                    count={currentCount}
                />
            }

            {
                showStats && <EarthquakesSummary />
            }
        </div>
    )}

export default AnimationControl