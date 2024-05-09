import { useContext } from "react"
import { ReservationContext } from "./reservationContext"

export default function useReservation(){
    return useContext(ReservationContext)
}