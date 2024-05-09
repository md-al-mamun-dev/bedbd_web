'use client'
import { createContext, useContext, useReducer } from "react";

import reservationReducers from "@/reducers/reservationReducers";
import { store } from "../store";




export const ReservationContext = createContext(null);
export const ReservationDispatchContext = createContext(null)

export default function ReservationProvider({ children }){
    const [reservation, dispatchReservation] = useReducer(reservationReducers, store['reservation']);

    return (
        <ReservationContext.Provider value={reservation}>
            <ReservationDispatchContext.Provider value={dispatchReservation}>
                {children}
            </ReservationDispatchContext.Provider>
        </ReservationContext.Provider>
    )
}
