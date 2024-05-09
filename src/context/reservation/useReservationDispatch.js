import { useContext } from "react"
import { ReservationDispatchContext } from "./reservationContext"

export default function useReservationDispatch(){
    return useContext(ReservationDispatchContext)
}