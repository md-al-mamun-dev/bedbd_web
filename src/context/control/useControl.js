import { useContext } from "react"
import { ControlContext } from "./controlContext"

export default function useControl(){
    return useContext(ControlContext)
}