import { useContext } from "react"
import { DataContext } from "./dataContext"

export default function useData(){
    return useContext(DataContext)
}