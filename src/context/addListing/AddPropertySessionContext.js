'use client'
import { createContext, useContext, useReducer } from "react";
import addPropertyReducers from "@/reducers/AddPropertyReducers";
// import propertyReducers from "@/reducers/propertyReducers";
import { store } from "../store";




export const AddPropertySessionContext = createContext(null);
export const AddPropertySessionDispatchContext = createContext(null)

export default function AddPropertySessionProvider({ children }){
    const [addPropertyData, dispatchAddPropertyData] = useReducer(addPropertyReducers, store['addPropertySessions']);

    return (
        <AddPropertySessionContext.Provider value={addPropertyData}>
            <AddPropertySessionDispatchContext.Provider value={dispatchAddPropertyData}>
                {children}
            </AddPropertySessionDispatchContext.Provider>
        </AddPropertySessionContext.Provider>
    )
}
