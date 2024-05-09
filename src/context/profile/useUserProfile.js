import { useContext } from "react"
import { UserProfileContext } from "./userProfileContext"

export default function useUserProfile(){
    return useContext(UserProfileContext)
}