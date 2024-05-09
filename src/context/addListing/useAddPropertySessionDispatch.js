import { useContext } from "react"
import { PropertyDispatchContext } from "./AddPropertySessionContext"
import { AddPropertySessionDispatchContext } from "./AddPropertySessionContext"

export default function useAddPropertySessionDispatch(){
    return useContext(AddPropertySessionDispatchContext)
}