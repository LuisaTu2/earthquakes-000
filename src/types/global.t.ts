import { SAN_FRAN_COORDS } from "../utils/constants";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface EarthquakeMapProps {
  coordinatesList?: Coordinates[]; 
  zoom?: number;
}

export const initCoords: Coordinates[] = SAN_FRAN_COORDS

export interface EarthQuake {
    title: string
    coordinates: Coordinates
    magnitude: number
    date: string
    content: string // can remove and leave in marker
    marker: google.maps.marker.AdvancedMarkerElement
    infoWindow: google.maps.InfoWindow
}

export interface CenterMarker {
    title: string
    coordinates: Coordinates
    // content?: string
}


export   interface CreateCircleProps {
      mapRef: React.RefObject<google.maps.Map | null> | null
      center: Coordinates
      searchRadius: number
      setCircle: React.Dispatch<React.SetStateAction<google.maps.Circle | null | undefined>>
  }

export     interface CreateCenterMarkerProps {
        mapRef: React.RefObject<google.maps.Map | null> | null
        center: Coordinates
        setCenterMarker: (value: React.SetStateAction<google.maps.marker.AdvancedMarkerElement | null | undefined>) => void
        setCenterMarkerInfo: (value: React.SetStateAction<google.maps.InfoWindow | null | undefined>) => void
    }

export interface ClearCircleProps {
    circle: google.maps.Circle | null | undefined
    setCircle: React.Dispatch<React.SetStateAction<google.maps.Circle | null | undefined>>
}

export interface ClearCenterMarkerProps {
  centerMarker: google.maps.marker.AdvancedMarkerElement | null | undefined
  centerMarkerInfo: google.maps.InfoWindow | null | undefined
  setCenterMarker: (value: React.SetStateAction<google.maps.marker.AdvancedMarkerElement | null | undefined>) => void
  setCenterMarkerInfo: (value: React.SetStateAction<google.maps.InfoWindow | null | undefined>) => void
}

export interface CreateEarthquakesMarkersProps {
    activeInfoWindowRef: React.RefObject<google.maps.InfoWindow | null>
    mapRef: React.RefObject<google.maps.Map | null> | null
    setEarthquakesMarkers: React.Dispatch<React.SetStateAction<google.maps.marker.AdvancedMarkerElement[]>>
    setEarthquakesInfos: React.Dispatch<React.SetStateAction<google.maps.InfoWindow[]>>
    earthquakes: EarthQuake[]
}

export interface ClearEarthquakesMarkersProps {
    earthquakesMarkers: google.maps.marker.AdvancedMarkerElement[]
    earthquakesInfos: google.maps.InfoWindow[]
    setEarthquakesMarkers: React.Dispatch<React.SetStateAction<google.maps.marker.AdvancedMarkerElement[]>>
    setEarthquakesInfos: React.Dispatch<React.SetStateAction<google.maps.InfoWindow[]>>
}

export interface TimeLapseProps {
  earthquakes: EarthQuake[]
  startDate: Date | null
  endDate: Date | null
  mapRef: React.RefObject<google.maps.Map | null> | null
}


export interface BuildEarthquakesProps {
  data: any, 
  mapRef:  React.RefObject<google.maps.Map | null> | null, 
  activeInfoWindowRef: React.RefObject<google.maps.InfoWindow | null>
}


export interface BuildMarkerInfoProps {
  title: string
  coordinates: Coordinates
  magnitude: number
  date: string
  mapRef:  React.RefObject<google.maps.Map | null> | null, 
  activeInfoWindowRef: React.RefObject<google.maps.InfoWindow | null>
} 


export type TimeUnit = "year" | "month" | "day" | ""