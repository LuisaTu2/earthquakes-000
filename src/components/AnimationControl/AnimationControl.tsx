import { useContext, useEffect, useState } from "react"
import { MapContext } from "../../context/MapContext"
import { EarthquakesContext } from "../../context/SearchSettingsContext"
import { clearEarthquakes } from "../MapControls"
import type { TimeLapseProps, EarthQuake } from "../../types/global.t"


const AnimationControl = () => {
    const { earthquakes,loading, startDate, endDate  } = useContext(EarthquakesContext) 
    const { isAnimating, mapRef, setIsAnimating } = useContext(MapContext)
    const [currentYear, setCurrentYear] = useState<number | null>(null)
    const isDisabled = !earthquakes.length || loading || isAnimating || !startDate || !endDate


    const timeLapse = ({ earthquakes, startDate, endDate,  mapRef }: TimeLapseProps) => {
        // years lapse
        const startYear = startDate?.getFullYear();
        const endYear = endDate?.getFullYear();

        let temp: EarthQuake[] = [];

        if (endYear && startYear && (endYear - startYear)){
            let time = 0;
            for(let year=startYear; year < endYear+1; year++){
                const earthquakesInYear: EarthQuake[] = earthquakes.filter(e => {
                    const earthquakeDate: Date = new Date(e.date)
                    return earthquakeDate.getFullYear() === year
                })

                setTimeout(() => {
                    // TODO: create functions
                    setCurrentYear(year)
                    console.log("temp, eqinYear: ",year, temp, earthquakesInYear)
                    temp.forEach(e => {
                        e.marker.map = null
                    })
                    earthquakesInYear.forEach(e => {
                        e.marker.map = mapRef?.current
                        // anything with infowindow? 
                    })

                    temp = [...earthquakesInYear]
                    if (year === endYear ) {
                        // I could to a useEffect
                        setTimeout(() => {
                            console.log("am I reaching here?")
                            earthquakes.forEach(e => {
                                e.marker.map = mapRef?.current
                            }) 
                            setIsAnimating(false)
                        }, 4000)
                    }
                }, time * 4000)
                time++
            }
        }

        // same year, do make a month lapse

        // same month, make a week lapse

        // same week, make a day lapse
    }


    useEffect(() => {
        if (isAnimating && earthquakes.length) {
            clearEarthquakes(earthquakes)
            timeLapse({ earthquakes, startDate, endDate, mapRef })
            return
        }
    }, [isAnimating])


    return <div>
        <button disabled={ isDisabled } 
        onClick={() => setIsAnimating(true)}>
            animate
        </button>
        <div>
             {currentYear}
        </div>
    </div>
}

export default AnimationControl