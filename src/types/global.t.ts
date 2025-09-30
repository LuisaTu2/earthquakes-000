export interface Coordinates {
  lat: number;
  lng: number;
}

export interface EarthquakeMapProps {
  coordinatesList?: Coordinates[]; 
  zoom?: number;
}

export const initCoords: Coordinates[] = [{lat: 37.7749, lng: -122.4194}] // SF as loading point

export interface EarthQuake {
    magnitude: number
    title: string
    coordinates: Coordinates
    content?: string
    date: string
}

export interface CenterMarker {
    title: string
    coordinates: Coordinates
    content?: string
}

export interface EarthquakeMarker extends CenterMarker {
  magnitude: number
  date: string
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

export     interface ClearCenterMarkerProps {
        centerMarker: google.maps.marker.AdvancedMarkerElement | null | undefined
        centerMarkerInfo: google.maps.InfoWindow | null | undefined
        setCenterMarker: (value: React.SetStateAction<google.maps.marker.AdvancedMarkerElement | null | undefined>) => void
        setCenterMarkerInfo: (value: React.SetStateAction<google.maps.InfoWindow | null | undefined>) => void
    }

export     interface CreateEarthquakeMarkerProps {
        mapRef: React.RefObject<google.maps.Map | null> | null
      markerInfo:  CenterMarker | EarthquakeMarker | null

    }

export     interface CreateEarthquakesMarkersProps {
        mapRef: React.RefObject<google.maps.Map | null> | null
        setEarthquakesMarkers: React.Dispatch<React.SetStateAction<google.maps.marker.AdvancedMarkerElement[]>>
        setEarthquakesInfos: React.Dispatch<React.SetStateAction<google.maps.InfoWindow[]>>
        earthquakes: EarthQuake[]
    }

export     interface ClearEarthquakesMarkersProps {
        earthquakesMarkers: google.maps.marker.AdvancedMarkerElement[]
        earthquakesInfos: google.maps.InfoWindow[]
        setEarthquakesMarkers: React.Dispatch<React.SetStateAction<google.maps.marker.AdvancedMarkerElement[]>>
        setEarthquakesInfos: React.Dispatch<React.SetStateAction<google.maps.InfoWindow[]>>
    }