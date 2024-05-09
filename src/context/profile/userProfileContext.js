'use client'
import { createContext, useContext, useReducer } from "react";
import userProfileReducers from "@/reducers/userProfileReducers";
// import accountReducers from "../../reducers/accountReducers";
import { store } from "../store";




export const UserProfileContext = createContext(null);
export const UserProfileDispatchContext = createContext(null)

export default function UserProfileProvider({ children }){
    const [userProfile, dispatchUserProfile] = useReducer(userProfileReducers, store['userProfile']);

    return (
        <UserProfileContext.Provider value={userProfile}>
            <UserProfileDispatchContext.Provider value={dispatchUserProfile}>
                {children}
            </UserProfileDispatchContext.Provider>
        </UserProfileContext.Provider>
    )
}
