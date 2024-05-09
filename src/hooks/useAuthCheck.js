import { useEffect, useState } from "react"
import { Jwt } from "jsonwebtoken";
import { account } from "@/service/config";
import useAccount from "@/context/account/useAccount";

import useAccountDispatch from "@/context/account/useAccountDispatch";
// import { useAccountDispatch } from "@/context/account/accountContext";
// import { useDispatch } from "react-redux";
// import { userLoggedIn } from "../features/auth/authSlice";

import accountService from "@/service/AccountService";


export default function useAuthCheck(){
    const [isLoading, setIsLoading] = useState(false)
    const userData = useAccount()
    const [authCheck, setAuthChecked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] =  useState(false)
    const dispatch = useAccountDispatch()
    
    useEffect(()=> {        
        let ignore = false
        async function checkLoggedIn(){
            setIsLoading(()=> true)
            try {
                const data = await accountService.getCurrentUser()
                if(data){
                    setIsLoggedIn(true)
                    dispatch({ type:'login', data:data })
                }else{
                    setIsLoggedIn(false)
                }

                // setIsLoggedIn(isLoggedIn)
                // if(isLoggedIn){
                //     try {
                //         const user =  await accountService.getCurrentUser()
                //         if(user){
                //             dispatch({ type:'login', data:user })
                //         }
                //     } catch (error) {
                        
                //     }
                // }
            } catch (error) {
                
            }
            finally{
                setAuthChecked(()=>true)
                setIsLoading(()=> false)
            }

            
        }

        if(!ignore && !authCheck){
            checkLoggedIn()
        }


        // async function getUserAccount() {
        //     const userData =  await accountService.getCurrentUser()
        //     if(userData)
        //         console.log(userData)
        //         dispatch({ type:'login', data:userData })
        //     setAuthChecked(true)
        // }
        // if(!ignore){
        //     if(Object.keys(userData).length > 0 ){
        //         setAuthChecked(true)
        //     }else{
        //         getUserAccount()
        //     }
        // }
        return ()=> ignore = true
    }, [])
    return {isLoading, isLoggedIn, authCheck, user:userData['user']   };
}