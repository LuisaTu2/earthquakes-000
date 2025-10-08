import React, { useEffect, useState } from "react";
import "./TimeDots.css";
import type { TimeUnit } from "../../types/global.t";

type TimeDotsProps = {
    currentTime: number | null;   
    currentCount: number | null;              
    timeUnit: TimeUnit;
    startTime: number;
    endTime: number;
};


// will only display dots for years and months. 
// only restrict for 12 years and 12 months at max 
// for individual days just name the days (at least for now)
export const TimeDots: React.FC<TimeDotsProps> = ({
    timeUnit,
    currentTime,
    currentCount,
    startTime=0,
    endTime=3
}) => {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"];
    const [labels, setLabels] = useState<string[]>([])

    useEffect(() => {
        if(timeUnit === "" || timeUnit === "day") {
            setLabels([])
        } else if (timeUnit === "month"){
            setLabels(months.slice(startTime, endTime + 1))
        } else if (timeUnit === "year"){
            const labels: string[] = []
            for (let label = startTime; label < endTime + 1; label++ ){
                labels.push(label.toString())
            }
            setLabels(labels)
        }
    }, [timeUnit, startTime, endTime])


    return (<div className="timedots-container">
        {
            labels.map((label, i) => 
            {
                return (<div className="timedot" key={i}>
                    <span className={currentTime === (startTime + i) ? `dot dot-active` : `dot`}></span>
                    <div className={currentTime === (startTime + i) ? `timedot-label timedot-label-active` : `timedot-label`}> {label} </div>
                    {
                        currentTime === (startTime + i) &&
                        <div className="tiemdot-label timedot-label-active"> &#183; {currentCount} </div>
                    }
               </div>
                )
            })
        }
    </div>)
};

export default TimeDots;

