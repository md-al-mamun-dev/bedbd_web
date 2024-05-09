'use client'
import { createContext, useReducer } from "react";
import controlReducers from "@/reducers/controlReducers";
import { store } from "../store";

export const ControlContext = createContext(null);
export const ControlDispatchContext = createContext(null)
export default function ControlProvider({ children }){
    const [control, dispatchControl] = useReducer(controlReducers, store['control']);

    return (
        <ControlContext.Provider value={control}>
            <ControlDispatchContext.Provider value={dispatchControl}>
                {children}
            </ControlDispatchContext.Provider>
        </ControlContext.Provider>
    )
}
