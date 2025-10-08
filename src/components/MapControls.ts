import type { BuildEarthquakesProps, BuildMarkerInfoProps,
     ClearCenterMarkerProps, ClearCircleProps, CreateCenterMarkerProps, CreateCircleProps, 
     EarthQuake, } from "../types/global.t"
import { CIRCLE_OPTIONS } from "../utils/constants"



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

export const createCenterMarker = ({mapRef, center, setCenterMarker, setCenterMarkerInfo}: CreateCenterMarkerProps) => {
    const pin = new google.maps.marker.PinElement({
        background: "#22511cff", 
        borderColor: "#ccc",  
        glyphColor: "#8ee48dff",  
    });
    
    
    const marker: google.maps.marker.AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef?.current,
        position: center,
        title: "center",
        content: pin.element,
    });

    // TODO: fix with center name
    const  infoWindow = new google.maps.InfoWindow({
        content: `<div class="info-window">
                    <h3>SEARCH CENTER</h3>
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

export const clearCenterMarker = ({centerMarker, centerMarkerInfo, setCenterMarker, setCenterMarkerInfo}: ClearCenterMarkerProps) => {
  if(centerMarker) {
    centerMarker.map = null
    setCenterMarker(null)
  }
  centerMarkerInfo?.close()
  setCenterMarkerInfo(null)
}

export const clearEarthquakeMarkers = (earthquakes: EarthQuake[]) => {
    earthquakes.forEach(earthquake => {
        if (earthquake.marker) {
            earthquake.marker.map = null
        }
        earthquake.infoWindow.close()
    })
    return;
}

export const createMarkerAndInfo = ({coordinates, title, date, magnitude, mapRef, activeInfoWindowRef}: BuildMarkerInfoProps) : [google.maps.marker.AdvancedMarkerElement, google.maps.InfoWindow] => {
    const earthquakeMarkerContent = document.createElement("div");
    if (magnitude <= 5) {
        earthquakeMarkerContent.className = "earthquake-marker mag-low"
    } else if (5 < magnitude && magnitude <= 8) {
        earthquakeMarkerContent.className = "earthquake-marker mag-medium"
    } else if (8 < magnitude && magnitude <= 10) {
        earthquakeMarkerContent.className = "earthquake-marker mag-high"
    }
    const marker = new google.maps.marker.AdvancedMarkerElement({
            map: mapRef?.current,
            position: coordinates,
            title,
            content: earthquakeMarkerContent 
        })

    const infoWindow = new google.maps.InfoWindow({
        content: `<div class="info-window">
                    <h3>${title}</h3>
                    <p>Magnitude: ${magnitude}</p>
                    <p>Date: ${date}</p>
                </div>`,
    });

    marker.addListener("click", () => {
        // ensures only one infoWindow is open
        if (activeInfoWindowRef.current) {
            activeInfoWindowRef.current.close();
        }

        infoWindow.open({
            anchor: marker, // ties the infoWindow to the marker
            map: mapRef?.current,
        });
        
        activeInfoWindowRef.current = infoWindow;
    })

    return [marker, infoWindow]
}

export const buildEarthquakes = ({data, mapRef, activeInfoWindowRef}: BuildEarthquakesProps ) => {
    const features = data["features"]
    const earthquakes: EarthQuake[] = features.map((feature: any) => { 

        const magnitude = feature["properties"]["mag"]
        const coordsObj = feature["geometry"]["coordinates"]
        const coordinates = { lat: coordsObj[1], lng: coordsObj[0] }
        const title = feature["properties"]["title"];
        const time = feature["properties"]["time"]
        const dateTime = new Date(time)
        const date = dateTime.toLocaleDateString("en-US", {
            month: "long",  
            day: "2-digit", 
            year: "numeric"
        });

        const [marker, infoWindow] = createMarkerAndInfo({coordinates, title, date, magnitude, mapRef, activeInfoWindowRef})

            const earthquake: EarthQuake = {
                magnitude,
                title,
                coordinates,
                content: "",
                date,
                marker,
                infoWindow
            }
        return earthquake
    })
    
    return earthquakes

}

export const showMarkers = (earthquakes: EarthQuake[], mapRef:  React.RefObject<google.maps.Map | null> | null ) => {
    earthquakes.forEach(e => {
        e.marker.map = mapRef?.current
        // anything with infowindow? 
    })
}

export const hideMarkers = (earthquakes: EarthQuake[]) => {
    earthquakes.forEach(e => {
        e.marker.map = null
        e.infoWindow.close()
    })
}