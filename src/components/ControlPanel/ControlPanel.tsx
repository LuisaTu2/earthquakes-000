import { useContext, useEffect, useRef } from "react";
import DatePicker from "./DatePicker";
import { Autocomplete } from "@react-google-maps/api";
import { EarthquakesContext } from "../../context/SearchSettingsContext";
import "./ControlPanel.css"
import SearchRadiusSlider from "./SearchRadiusSlider";
import { EARLIEST_SEARCH_DATE, LATEST_SEARCH_DATE } from "../../utils/constants";
import { fetchEarthquakes } from "../../utils/fetchEarthquakes";
import { MapContext } from "../../context/MapContext";
import { clearCenterMarker, clearCircle, clearEarthquakes, createCenterMarker, createCircle, createEarthquakesMarkers } from "../MapElements";



const MapControlPanel: React.FC<any> = ({
}) => {
    
    const { 
        epicenter: center, 
        searchRadius, 
        earthquakes,
        startDate, 
        endDate,
        loading,
        setLoading, 
        setEarthquakes,
        setEpicenter,
        setStartDate, 
        setEndDate,
        setSearchRadius
    } = useContext(EarthquakesContext)
    const { 
        mapRef, 
        // markerInfo, 
        centerMarker, 
        circle, 
        centerMarkerInfo,
        earthquakesMarkers, 
        earthquakesInfos,
        setCircle, 
        setEarthquakesMarkers, 
        setEarthquakesInfos, 
        setCenterMarker, 
        setCenterMarkerInfo
    } = useContext(MapContext)

    const activeInfoWindowRef = useRef<google.maps.InfoWindow | null>(null);
    const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const onLoad = (autocomplete: google.maps.places.Autocomplete | null) => {
        autoCompleteRef.current = autocomplete;
    };

    const onPlaceChanged = () => {
        if (autoCompleteRef.current) {
            const place = autoCompleteRef.current.getPlace();
            if (place.geometry?.location) {
                const coords = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };

                setLoading(true)
                clearEarthquakes({earthquakesMarkers, earthquakesInfos, setEarthquakesMarkers, setEarthquakesInfos})
                clearCircle({circle, setCircle})
                clearCenterMarker({centerMarker, centerMarkerInfo, setCenterMarker, setCenterMarkerInfo})
                setEpicenter(coords)
            }
        }
    };

    const onDateChange = (date: Date | null, type: string) => {
        setLoading(true)
        clearEarthquakes({earthquakesMarkers, earthquakesInfos, setEarthquakesMarkers, setEarthquakesInfos})
        if (type == "start") {
            setStartDate(date)
        } else {
            setEndDate(date)
        }
    }

    const onRadiusChange = (value: number | number[]) => {
        clearEarthquakes({earthquakesMarkers, earthquakesInfos, setEarthquakesMarkers, setEarthquakesInfos})
        clearCircle({circle, setCircle})
        setSearchRadius(value as number)
    }

    useEffect(() => {
        if (center ){
            createCenterMarker({mapRef, center, setCenterMarker, setCenterMarkerInfo})
            createCircle({mapRef, center, searchRadius, setCircle})
        } 
    }, [mapRef])


    useEffect(() => {
        if (center && searchRadius && !circle){
            createCircle({mapRef, center, searchRadius, setCircle})
        }
        if (center && !centerMarker){
            createCenterMarker({mapRef, center, setCenterMarker, setCenterMarkerInfo})
        }

        if (center === null || startDate === null || endDate === null) {setLoading(false); return}

        fetchEarthquakes({epicenter: center, startDate, endDate, searchRadius, setLoading, setEarthquakes})
    }, [center, startDate, endDate, searchRadius])


    useEffect(() => {
        if (earthquakes.length && !earthquakesMarkers.length && !earthquakesInfos.length) {
            createEarthquakesMarkers({ activeInfoWindowRef, earthquakes, mapRef, setEarthquakesInfos, setEarthquakesMarkers})
        }
        setLoading(false)
    }, [earthquakes, setEarthquakes])




    useEffect(() => {

        function pulseCircle(circle: google.maps.Circle) {
            let growing = true;
            let baseRadius = circle.getRadius();
            let maxIncrease = baseRadius * 0.1; // 10% bigger
            let step = 50; // ms per frame
            let delta = 0;

            const interval = setInterval(() => {
                if (!circle.getMap()) {
                clearInterval(interval);
                return;
                }

                if (growing) {
                delta += 20;
                if (delta >= maxIncrease) growing = false;
                } else {
                delta -= 20;
                if (delta <= 0) growing = true;
                }

                circle.setRadius(baseRadius + delta);
            }, step);

            return () => clearInterval(interval); // cleanup function
            }
        
        if(circle && loading){
            pulseCircle(circle)
        }

    }, [loading])

    return (
        <div className="container">
            <div className="container-title">settings</div>
            {/* TODO: update to PlacesAutoComplete */}
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <div className="field"> 
                    <p className="label">center </p> 
                    <input type="text" placeholder="Enter a city or place" disabled={loading}
                    className={center ? "" : "glowing-input" }/> 
                </div>
            </Autocomplete>
            <div className="field">
                <p className="label"> start date </p> 
                <DatePicker minDate={EARLIEST_SEARCH_DATE} maxDate={endDate || LATEST_SEARCH_DATE} date={startDate} handleDateChange={(date: Date | null) => onDateChange(date, "start")}/>
            </div>
            <div className="field">
                <p className="label">end date </p> 
                <DatePicker minDate={startDate || EARLIEST_SEARCH_DATE} maxDate={LATEST_SEARCH_DATE} date={endDate} handleDateChange={(date: Date | null) => onDateChange(date, "")}/>
            </div>
            <div className="field">
                <p className="label search-radius-label">search radius (km) </p> 
                <SearchRadiusSlider onRadiusChange={onRadiusChange}/>
            </div>
        </div>
    )};

export default MapControlPanel;