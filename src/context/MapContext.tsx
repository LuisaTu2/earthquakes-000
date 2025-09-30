import { createContext } from "react";
import React from "react";
import type { EarthquakeMarker, CenterMarker } from "../types/global.t";


export interface MapContextType {
    mapRef: React.RefObject<google.maps.Map | null> | null
    markerInfo: CenterMarker | EarthquakeMarker | null
    centerMarker: google.maps.marker.AdvancedMarkerElement | undefined | null
    centerMarkerInfo: google.maps.InfoWindow | undefined | null
    earthquakesMarkers: google.maps.marker.AdvancedMarkerElement[]
    earthquakesInfos: google.maps.InfoWindow[]
    circle: google.maps.Circle | undefined| null
    setMapRef: React.Dispatch<React.SetStateAction<React.RefObject<google.maps.Map | null> | null>>
    setMarkerInfo: React.Dispatch<React.SetStateAction<CenterMarker | EarthquakeMarker | null>>
    setCenterMarker: React.Dispatch<React.SetStateAction<google.maps.marker.AdvancedMarkerElement | undefined | null>>
    setCenterMarkerInfo: React.Dispatch<React.SetStateAction<google.maps.InfoWindow | undefined | null>>
    setEarthquakesMarkers: React.Dispatch<React.SetStateAction<google.maps.marker.AdvancedMarkerElement[]>>
    setEarthquakesInfos: React.Dispatch<React.SetStateAction<google.maps.InfoWindow[]>>
    setCircle: React.Dispatch<React.SetStateAction<google.maps.Circle | undefined | null>>
}


const initContext: MapContextType = {
    mapRef: null,
    markerInfo: null,
    centerMarker: undefined,
    centerMarkerInfo: undefined,
    earthquakesMarkers: [],
    earthquakesInfos: [],
    circle: null,
    setMapRef: () => null, 
    setMarkerInfo: () => null,
    setCenterMarker: () => null,
    setCenterMarkerInfo: () => null,
    setEarthquakesMarkers: () => null,
    setEarthquakesInfos: () => null,
    setCircle: () => null,
}

export const MapContext = createContext<MapContextType>(initContext);