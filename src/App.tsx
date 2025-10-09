import './App.css'
import { EarthquakesContext } from './context/SearchSettingsContext';
import { useState } from 'react';
import { type Coordinates, type EarthQuake } from './types/global.t';
import ControlPanel from './components/ControlPanel/ControlPanel';
import EarthquakeMap from './components/Map';
import { LoadScript } from '@react-google-maps/api';
import { MapContext } from './context/MapContext';
import ScrollAfterDelay from './components/Auxiliary/ScrollAfterDelay';
import CreditBubble from './components/Auxiliary/CreditBubble';
import BouncingMovingEarth from './components/Loaders/BouncingEarthLoader';
import AnimationControl from './components/AnimationControl/AnimationControl';


const App = () => {
  const mapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // initialize search settings state
  const [epicenter, setEpicenter] = useState<Coordinates | null>(null)
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [earthquakes, setEarthquakes] = useState<EarthQuake[]>([]);
  const [searchRadius, setSearchRadius] = useState<number>(500);

  // initialize map state
  const [mapRef, setMapRef] = useState<React.RefObject<google.maps.Map | null> | null>(null)
  const [centerMarker, setCenterMarker] = useState<google.maps.marker.AdvancedMarkerElement | undefined | null>()
  const [centerMarkerInfo, setCenterMarkerInfo] = useState<google.maps.InfoWindow | undefined | null>()
  const [circle, setCircle] = useState<google.maps.Circle | null>()
  const [isAnimating, setIsAnimating] = useState<boolean>(false);


  return (
    <EarthquakesContext.Provider value={{epicenter, startDate, endDate, loading, earthquakes, searchRadius,
            setEpicenter, setStartDate, setEndDate, setLoading, setEarthquakes, setSearchRadius}}>
      <MapContext.Provider value={{mapRef, centerMarker, centerMarkerInfo, circle,isAnimating,
        setMapRef, setCenterMarker, setCenterMarkerInfo, setCircle, setIsAnimating
      }} >
        <div className='app' id="app">
          <h2 className="app-title"> quakes </h2>
          <BouncingMovingEarth visible={loading} />
          <LoadScript
              googleMapsApiKey={mapApiKey!} 
              libraries={['places', 'marker']}
                loadingElement={
                  <div className="map-loading">
                    🌎 loading map...
                  </div>
                  }>
                  <EarthquakeMap />
                  <AnimationControl />
                  <ScrollAfterDelay />
                  <ControlPanel />
              <CreditBubble />
          </LoadScript>
        </div>
      </MapContext.Provider>
    </EarthquakesContext.Provider>

  )
}

export default App
