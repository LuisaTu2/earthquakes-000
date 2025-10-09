import React, { useEffect, useState } from "react";
import "./TimeAnimation.css";
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
export const TimeAnimation: React.FC<TimeDotsProps> = ({
    timeUnit,
    currentTime,
    currentCount,
    startTime=0,
    endTime=3
}) => {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"];
    const [_, setLabels] = useState<string[]>([])

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

    return (
        <div className={`timelapse-popup-container`}>
            {/* <span className="timelapse-text"> */}
                total count in {timeUnit === "month" ? months[currentTime as number] : currentTime}: {currentCount}
            {/* </span> */}
        </div>
    )};

export default TimeAnimation;

