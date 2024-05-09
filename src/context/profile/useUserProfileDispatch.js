import { useContext } from "react"
// import { AccountDispatchContext } from "./accountContext"
import { UserProfileDispatchContext } from "./userProfileContext"

export default function useUserProfileDispatch(){
    return useContext(UserProfileDispatchContext)
}