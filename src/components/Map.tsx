import React, { useContext, useEffect, useRef, useState, } from "react";
import { type EarthquakeMapProps } from "../types/global.t";
import { EarthquakesContext } from "../context/SearchSettingsContext";
import "./Map.css"
import { GoogleMap } from "@react-google-maps/api";
import { MAP_CONTAINER_STYLE, MAP_OPTIONS, MAX_RADIUS } from "../utils/constants";
import { MapContext } from "../context/MapContext";


const EarthquakesMap: React.FC<EarthquakeMapProps> = ({}) => {
    const { epicenter: center, searchRadius } = useContext(EarthquakesContext) 
    const {  setMapRef } = useContext(MapContext)
    const [zoom, setZoom] = useState<number>(5)

    // TODO: use different styling for different magnitudes
    const mapRef = useRef<google.maps.Map | null>(null);
    
    const onLoad = (map: google.maps.Map) => {
      mapRef.current = map;
      setMapRef(mapRef)
      // Think this through, because you technically dont set a fixed location in the autocomplete
      // if (google?.maps?.marker?.AdvancedMarkerElement) {
      // setEpicenter(initCoords[0])
      // createLocationMarker({map: mapRef, markerInfo: {coordinates: location, title: "center"}, setLocationMarker, setLocationMarkerInfo})
        // setLocationMarker(marker)
      // } 
    };

    useEffect(() => {
      if(searchRadius <= 200) {
        setZoom(7)
      } else if (201 <= searchRadius && searchRadius <= 500) {
        setZoom(5)
      } else if (501 <= searchRadius && searchRadius <= 1100) {
        setZoom(4)
      } else if (1101 <= searchRadius && searchRadius <= MAX_RADIUS) {
        setZoom(3)
      } 
    }, [searchRadius])

    return  ( 
      <div className="earthquakes-map" id="earthquakes-map"> 
          {!center && <div className="overlay-content"> 
              <div className="overlay-text">
                <p> your map will show here </p>
                <p className="earth-emoji">🌍</p>
              </div>
            </div>}
          {
            center && <GoogleMap
                mapContainerStyle={MAP_CONTAINER_STYLE}
                center={center || undefined}
                zoom={zoom}  
                onLoad={onLoad}
                options={{...MAP_OPTIONS,                 
                  zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
              },
              rotateControl: true,
                  rotateControlOptions: { position: google.maps.ControlPosition.LEFT_TOP },
            }}
              >
            </GoogleMap>
          }
      </div>)
    };

export default EarthquakesMap;

