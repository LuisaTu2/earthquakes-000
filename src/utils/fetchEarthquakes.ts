import { buildEarthquakes } from "../components/MapElements";
import type { Coordinates, EarthQuake } from "../types/global.t";
import { HTTP, MIN_MAGNITUDE, MAX_MAGNITUDE } from "./constants";


interface FetchProps {
    epicenter: Coordinates
    startDate: Date | null
    endDate: Date | null
    searchRadius: number
    mapRef:  React.RefObject<google.maps.Map | null> | null, 
    activeInfoWindowRef: React.RefObject<google.maps.InfoWindow | null>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setEarthquakes:  React.Dispatch<React.SetStateAction<EarthQuake[]>>
}

export const buildUrl = ({epicenter, startDate, endDate, searchRadius}: Pick<FetchProps, "epicenter" | "startDate" | "endDate" | "searchRadius">) => {
    const {lat, lng} = epicenter
    const startTime = startDate?.toISOString().split('T')[0]
    const endTime = endDate?.toISOString().split('T')[0]

    return HTTP + `&starttime=${startTime}&endtime=${endTime}&latitude=${lat}&longitude=${lng}&maxradiuskm=${searchRadius}&minmagnitude=${MIN_MAGNITUDE}&maxmagnitude=${MAX_MAGNITUDE}` 
}

export const fetchEarthquakes = async ({mapRef, activeInfoWindowRef, epicenter, startDate, endDate, searchRadius, 
    setLoading, setEarthquakes}: FetchProps) => {
    let earthquakes: EarthQuake[] = [];
    try {
        setLoading(true)
        const url = buildUrl({epicenter, startDate, endDate, searchRadius})
        console.log("fetching earthquake data")
        const res = await fetch(url);
        const data = await res.json();
        earthquakes = buildEarthquakes({data, mapRef, activeInfoWindowRef})
        setEarthquakes(earthquakes)
    } catch (err: any) {
        // TODO: handle error
        console.log("error: ", err)
    } finally {
        console.log("finished retrieve earthquake data")
        setLoading(false)
    }
    return earthquakes;
};

