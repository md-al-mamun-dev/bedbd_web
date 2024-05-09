import { useContext } from "react"
import { AddPropertySessionContext } from "./AddPropertySessionContext"
// import { AddPropertySessionContext } from "./AddPropertySessionContext"
import usePropertyListingSession from "./usePropertyListingSessions"

export default function useAddPropertySession(){
    return useContext(AddPropertySessionContext)
}