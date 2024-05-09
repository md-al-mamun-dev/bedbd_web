import { useContext } from "react"
import { ControlDispatchContext } from "./controlContext"

export default function useControlDispatch(){
    return useContext(ControlDispatchContext)
}