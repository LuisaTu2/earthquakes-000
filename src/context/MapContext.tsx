import { createContext } from "react";
import React from "react";


export interface MapContextType {
    mapRef: React.RefObject<google.maps.Map | null> | null
    centerMarker: google.maps.marker.AdvancedMarkerElement | undefined | null
    centerMarkerInfo: google.maps.InfoWindow | undefined | null
    circle: google.maps.Circle | undefined| null
    isAnimating: boolean
    setMapRef: React.Dispatch<React.SetStateAction<React.RefObject<google.maps.Map | null> | null>>
    setCenterMarker: React.Dispatch<React.SetStateAction<google.maps.marker.AdvancedMarkerElement | undefined | null>>
    setCenterMarkerInfo: React.Dispatch<React.SetStateAction<google.maps.InfoWindow | undefined | null>>
    setCircle: React.Dispatch<React.SetStateAction<google.maps.Circle | undefined | null>>
    setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>
}


const initContext: MapContextType = {
    mapRef: null,
    centerMarker: undefined,
    centerMarkerInfo: undefined,
    circle: null,
    isAnimating: false,
    setMapRef: () => null, 
    setCenterMarker: () => null,
    setCenterMarkerInfo: () => null,
    setCircle: () => null,
    setIsAnimating: () => null
}

export const MapContext = createContext<MapContextType>(initContext);