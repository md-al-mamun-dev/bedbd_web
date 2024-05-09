import { useEffect, useState } from "react"
import accountService from "@/service/AccountService"
import useAccountDispatch from "./useAccountDispatch"
import isJWT from "@/components/Utility/isJWT"
import useAccount from "./useAccount"

export default function useAuthCheck(){
    const [isLoading, setIsLoading] = useState(false)
    const { isAuthChecked, user, isLoaggedIn } = useAccount()
    const dispatch = useAccountDispatch()

    useEffect(()=>{
        let ignore = false
        async function authCheck(){


            try {
                const result  = await accountService.getCurrentUser()
                if(result){
                    console.log('result')
                    console.log(result)
                }
            } catch (error) {
                console.log(error)
            }
            // const localstorageToken  = localStorage.getItem('token')
            // const validTill = parseInt(localStorage.getItem('tokenExpire'))
            // const currentTimestamp = Date.now();
            //  if(!localstorageToken ||  (currentTimestamp > validTill)){
            //     if(!ignore){
            //         setIsLoading(()=>true)
            //         const expireTime = Date.now() + (15 * 60 * 1000)
            //         try {
            //             const result  = await accountService.getJWToken()
            //             if(result){
            //                 console.log(token)
            //                 const JWTTokenObj = JSON.parse(JSON.stringify(result))
            //                 localStorage.setItem('token', JWTTokenObj['jwt']);
            //                 localStorage.setItem('tokenExpire', expireTime);

            //                 dispatch({
            //                             type:'account/jwt',
            //                             data:{
            //                                     jwt: JWTTokenObj['jwt'],
            //                                     expire: expireTime
            //                                 }
            //                         })
            //             }
            //         } catch (error) {
            //             // Error Code will be there 

            //         }
            //         setIsLoading(()=>false)
            //     } 
            // }else{
            //     if(!ignore){
            //         dispatch({
            //             type:'account/jwt', 
            //             data:{
            //                     jwt: localstorageToken,
            //                     expire: validTill
            //                 }
            //         })
            //     }
            // }
        }
        authCheck()
    // if( !isSet ||  (Date.now() > parseInt(expireTime)) ||  !isJWT(jwt)){
    //     authCheck()
    // }
    // return ()=> ignore = true
    }, [])
    return {isLoading, user, isLoaggedIn, isAuthChecked:false};
}