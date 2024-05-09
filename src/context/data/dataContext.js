'use client'
import { createContext, useContext, useReducer } from "react";
import dataReducers from "@/reducers/dataReducers";
import { store } from "../store";




export const DataContext = createContext(null);
export const DataDispatchContext = createContext(null)

export default function DataProvider({ children }){
    const [data, dispatchData] = useReducer(dataReducers, store['data']);

    return (
        <DataContext.Provider value={data}>
            <DataDispatchContext.Provider value={dispatchData}>
                {children}
            </DataDispatchContext.Provider>
        </DataContext.Provider>
    )
}
