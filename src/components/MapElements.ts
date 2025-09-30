import type { ClearCenterMarkerProps, ClearCircleProps, ClearEarthquakesMarkersProps, CreateCenterMarkerProps, CreateCircleProps, CreateEarthquakeMarkerProps, CreateEarthquakesMarkersProps, EarthquakeMarker } from "../types/global.t"
import { CIRCLE_OPTIONS } from "../utils/constants"


export const clearCenterMarker = ({centerMarker, centerMarkerInfo, setCenterMarker, setCenterMarkerInfo}: ClearCenterMarkerProps) => {
  if(centerMarker) {
    centerMarker.map = null
    setCenterMarker(null)
  }
  centerMarkerInfo?.close()
  setCenterMarkerInfo(null)
}

export const clearEarthquakes = ({earthquakesMarkers, earthquakesInfos, setEarthquakesMarkers, setEarthquakesInfos}: ClearEarthquakesMarkersProps) => {
    earthquakesMarkers.forEach(marker => {
        marker.map = null
    })
    setEarthquakesMarkers([])
    
    earthquakesInfos.forEach(info => {
        info.close()
    })
    setEarthquakesInfos([])
    return;
}

export const createCenterMarker = ({mapRef, center, setCenterMarker, setCenterMarkerInfo}: CreateCenterMarkerProps) => {
    const marker: google.maps.marker.AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef?.current,
        position: center,
        title: "center",
    });

    // TODO: fix with center name
    const  infoWindow = new google.maps.InfoWindow({
        content: `<div class="info-window">
                    <h3>${"SEARCH CENTER"}</h3>
                    <p> center center  </p>
                </div>`,
    });

    marker.addListener("click", () => {
        infoWindow.open({
        anchor: marker, // ties the infoWindow to the marker
        map: mapRef?.current,
        });
    })

    setCenterMarker(marker)
    setCenterMarkerInfo(infoWindow)
}

export const createEarthquakeMarker = ({mapRef, markerInfo}: CreateEarthquakeMarkerProps) : [google.maps.marker.AdvancedMarkerElement, google.maps.InfoWindow] => {
    const earthquakeMarkerContent = document.createElement("div");
    earthquakeMarkerContent.className = "earthquake-marker";
    const marker: google.maps.marker.AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef?.current,
        position: markerInfo?.coordinates,
        title: markerInfo?.title,
        content: earthquakeMarkerContent 
    });

    const mag = markerInfo && "magnitude" in markerInfo ? markerInfo.magnitude  : ""
    const date = markerInfo && "date" in markerInfo ? markerInfo.date  : ""

    const infoWindow = new google.maps.InfoWindow({
            content: `<div class="info-window">
                        <h3>${markerInfo?.title}</h3>
                        <p>Magnitude: ${mag}</p>
                        <p>Date: ${date}</p>
                    </div>`,
        });

    marker.addListener("click", () => {
        infoWindow.open({
        anchor: marker, // ties the infoWindow to the marker
        map: mapRef?.current,
        });
    })

    return [marker, infoWindow]
}

export const createEarthquakesMarkers = ({earthquakes, mapRef, setEarthquakesInfos, setEarthquakesMarkers}: CreateEarthquakesMarkersProps) => {
    const markers: google.maps.marker.AdvancedMarkerElement[] = []
    const infos: google.maps.InfoWindow[] = []  
    earthquakes.forEach(earthquake => {
        const markerInfo: EarthquakeMarker  = {
            title: earthquake.title,
            magnitude: earthquake.magnitude,
            coordinates: earthquake.coordinates,
            content: earthquake.content,
            date: earthquake.date
        }
        const [marker, info] = createEarthquakeMarker({mapRef, markerInfo})
        markers.push(marker)
        infos.push(info)
    })

    setEarthquakesMarkers(markers)
    setEarthquakesInfos(infos)
}

export  const createCircle = ({mapRef, center, searchRadius, setCircle} : CreateCircleProps) => {
    const newCircle = new google.maps.Circle({ ...CIRCLE_OPTIONS, radius: searchRadius * 1000, center, map: mapRef?.current})
    setCircle(newCircle)
}

export const clearCircle = ({circle, setCircle}: ClearCircleProps) => {
    if(circle) {
        circle.setMap(null)
        setCircle(null)
    }
}