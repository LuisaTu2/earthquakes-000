import { createContext } from "react";
import { initCoords, type Coordinates, type EarthQuake } from "../types/global.t";
import React from "react";


// TODO: rename to SearchSettings
export interface EarthquakesContextType {
  epicenter: Coordinates | null
  startDate: Date | null
  endDate: Date | null
  loading: boolean
  earthquakes: EarthQuake[]
  searchRadius: number
  setEpicenter: React.Dispatch<React.SetStateAction<Coordinates | null>>
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setEarthquakes: React.Dispatch<React.SetStateAction<EarthQuake[]>>
  setSearchRadius: React.Dispatch<React.SetStateAction<number>>
}


const initContext: EarthquakesContextType = {
    epicenter: initCoords[0],
    startDate: null,
    endDate: null,
    loading: false,
    earthquakes: [],
    searchRadius: 0,
    setEpicenter: () => null,
    setStartDate: () => null,
    setEndDate: () => null,
    setLoading: () => null,
    setEarthquakes: () => null,
    setSearchRadius: () => null
}

export const EarthquakesContext = createContext<EarthquakesContextType>(initContext);