import type { Coordinates, EarthQuake } from "../types/global.t";
import { HTTP, MIN_MAGNITUDE, MAX_MAGNITUDE } from "./constants";


interface FetchProps {
    epicenter: Coordinates
    startDate: Date | null
    endDate: Date | null
    searchRadius: number
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setEarthquakes:  React.Dispatch<React.SetStateAction<EarthQuake[]>>
}

export const buildUrl = ({epicenter, startDate, endDate, searchRadius}: Pick<FetchProps, "epicenter" | "startDate" | "endDate" | "searchRadius">) => {
    const {lat, lng} = epicenter
    const startTime = startDate?.toISOString().split('T')[0]
    const endTime = endDate?.toISOString().split('T')[0]

    return HTTP + `&starttime=${startTime}&endtime=${endTime}&latitude=${lat}&longitude=${lng}&maxradiuskm=${searchRadius}&minmagnitude=${MIN_MAGNITUDE}&maxmagnitude=${MAX_MAGNITUDE}` 
}

export const fetchEarthquakes = async ({epicenter, startDate, endDate, searchRadius, setLoading, setEarthquakes}: FetchProps) => {
    const url = buildUrl({epicenter, startDate, endDate, searchRadius})
    let earthquakes: EarthQuake[] = [];
    setLoading(true)
    console.log("fetching earthquake data")
    try {
        const res = await fetch(url);
        const jsonData = await res.json();
        earthquakes = format(jsonData)
        // setEarthquakes(prev => [...prev, ...earthquakes])
        setEarthquakes(earthquakes)
    } catch (err: any) {
        // TODO: handle error
        console.log("error: ", err)
    } finally {
        console.log("finished retrieve earthquake data")
    }
    return earthquakes;
};


const format = (json: any) => {
    const features = json["features"]
    const earthquakes: EarthQuake[] = features.map((feature: any) => { 
        const jcoords = feature["geometry"]["coordinates"]
        const coords: Coordinates = {lat: jcoords[1], lng: jcoords[0] }
        const title = feature["properties"]["title"]
        const magnitude = feature["properties"]["mag"]
        const time = feature["properties"]["time"]
        const dateTime = new Date(time)
        const date = dateTime.toLocaleDateString("en-US", {
            month: "long",  // "September"
            day: "2-digit", // "30"
            year: "numeric" // "2025"
        });
        return {"coordinates": coords, title, magnitude, date }})
    return earthquakes

}
