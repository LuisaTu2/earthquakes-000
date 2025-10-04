import type { BuildEarthquakesProps, BuildMarkerInfoProps,
     ClearCenterMarkerProps, ClearCircleProps, CreateCenterMarkerProps, CreateCircleProps, 
     EarthQuake } from "../types/global.t"
import { CIRCLE_OPTIONS } from "../utils/constants"


export const createCenterMarker = ({mapRef, center, setCenterMarker, setCenterMarkerInfo}: CreateCenterMarkerProps) => {
    const marker: google.maps.marker.AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef?.current,
        position: center,
        title: "center",
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


export const clearEarthquakes = (earthquakes: EarthQuake[]) => {
    earthquakes.forEach(earthquake => {
        if (earthquake.marker) {
            earthquake.marker.map = null
        }
        earthquake.infoWindow.close()
    })
    return;
}


export const buildMarkerInfo = ({coordinates, title, date, magnitude, mapRef, activeInfoWindowRef}: BuildMarkerInfoProps) : 
[google.maps.marker.AdvancedMarkerElement, google.maps.InfoWindow] => {
    const earthquakeMarkerContent = document.createElement("div");
    earthquakeMarkerContent.className = "earthquake-marker";
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

        const magnitude = feature["geometry"]["mag"]
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

        const [marker, infoWindow] = buildMarkerInfo({coordinates, title, date, magnitude, mapRef, activeInfoWindowRef})

        const earthquake: EarthQuake = {
            magnitude: feature["properties"]["mag"],
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


// export const timeLapse = ({ earthquakes, startDate, endDate,  mapRef }: TimeLapseProps) => {
//     // years lapse
//     const startYear = startDate?.getFullYear();
//     const endYear = endDate?.getFullYear();

//     let visibleMarkers: google.maps.marker.AdvancedMarkerElement[] = [];

//     if(endYear && startYear && (endYear - startYear)){
//         let time = 0;
//         for(let year=startYear; year < endYear+1; year++){
//             const earthquakesInYear: EarthQuake[] = earthquakes.filter(e => {
//                 const earthquakeDate: Date = new Date(e.date)
//                 return earthquakeDate.getFullYear() === year
//             })

//             setTimeout(() => {
//                 for (let i = 0; i < visibleMarkers.length; i++){
//                     visibleMarkers.forEach(m => m.map = null)
//                 }
//                 visibleMarkers = []

//                 earthquakesInYear.forEach(e => {
//                     e.marker.map = mapRef?.current
//                     // anything with infowindow? 

//                     // const marker = createNewMarker(e, mapRef)
//                     // visibleMarkers.push(marker)
//                 })

//                 if (year === endYear + 1){
//                     setTimeout(() => {
//                         // clear previous
//                         for (let i = 0; i < visibleMarkers.length; i++){
//                             visibleMarkers.forEach(m => m.map = null)
//                         }
//                     }, (time + 1) * 4000)
//                 }      
//             }, time * 4000)
//             time++
//         }
//     }


//     for (let i = 0; i < visibleMarkers.length; i++){
//         visibleMarkers.forEach(m => m.map = null)
//     }
//     // same year, make a month lapse


//     // same month, make a week lapse

//     // same week, make a day lapse
// }

// const createNewMarker = (earthquake: EarthQuake, mapRef:  React.RefObject<google.maps.Map | null> | null ): google.maps.marker.AdvancedMarkerElement  => {
//     const earthquakeMarkerContent = document.createElement("div");
//     earthquakeMarkerContent.className = "earthquake-marker";
//     const marker: google.maps.marker.AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
//         map: mapRef?.current,
//         position: earthquake.coordinates,
//         title: earthquake.title,
//         content: earthquakeMarkerContent 
//     });
//     return marker
// }