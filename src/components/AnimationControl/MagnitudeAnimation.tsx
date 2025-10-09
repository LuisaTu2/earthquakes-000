import React from "react";
import "./TimeAnimation.css";
import type { MagnitudeIntensity } from "../../types/global.t";


interface MagnitudeAnimationProps {
    intensity: MagnitudeIntensity
    count: number | null
};


export const MagnitudeAnimation: React.FC<MagnitudeAnimationProps> = ({
    intensity, count
}) => {

    return (
        <div className={`timelapse-popup-container`}>
                quakes of {intensity} intensity: {count}
        </div>
    )};

export default MagnitudeAnimation;
