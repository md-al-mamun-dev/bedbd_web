import { useEffect, useState } from "react"
import accountService from "@/service/AccountService"
import useAccountDispatch from "./useAccountDispatch"
import isJWT from "@/components/Utility/isJWT"
import useAccount from "./useAccount"
// import useAuthCheck from "./useAuthCheck"
import useAuthCheck from "@/hooks/useAuthCheck"

export default function useToken(){
    const [isLoading, setIsLoading] = useState(false)
    const {isLoding, isLoggedIn, authCheck:isAuthChecked, user } = useAuthCheck()
    const { token: { isSet, jwt, expireTime }} = useAccount()
    const data = useAccount()

    const dispatch = useAccountDispatch()

    useEffect(()=>{
        console.log(user)
        let ignore = false
        async function getToken(){
            const localstorageToken  = localStorage.getItem('token')
            const validTill = parseInt(localStorage.getItem('tokenExpire'))
            const currentTimestamp = Date.now();
             if(!localstorageToken ||  (currentTimestamp > validTill)){
                if(!ignore){
                    setIsLoading(()=>true)
                    const expireTime = Date.now() + (15 * 60 * 1000)
                    try {
                        const result  = await accountService.getJWToken()

                        if(result){
                            // console.log(token)
                            const JWTTokenObj = JSON.parse(JSON.stringify(result))
                            localStorage.setItem('token', JWTTokenObj['jwt']);
                            localStorage.setItem('tokenExpire', expireTime);

                            dispatch({
                                        type:'account/jwt',
                                        data:{
                                                jwt: JWTTokenObj['jwt'],
                                                expire: expireTime
                                            }
                                    })
                        }
                    } catch (error) {
                        // Error Code will be there 

                    }
                    setIsLoading(()=>false)
                } 
            }else{
                if(!ignore && isAuthChecked){
                    dispatch({
                        type:'account/jwt', 
                        data:{
                                jwt: localstorageToken,
                                expire: validTill
                            }
                    })
                }
            }
        }

    if( !isSet ||  (Date.now() > parseInt(expireTime)) ||  !isJWT(jwt)){
        getToken()
    }
    return ()=> ignore = true
    }, [isAuthChecked])
    return {isLoading, isSet, token:jwt, expireTime };
}