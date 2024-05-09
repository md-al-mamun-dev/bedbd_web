import { useContext } from "react"
import { DataDispatchContext } from "./dataContext"

export default function useDataDispatch(){
    return useContext(DataDispatchContext)
}