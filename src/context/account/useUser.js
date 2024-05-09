import { useEffect, useState } from "react"
import accountService from "@/service/AccountService"
// import useAccountDispatch from "./useAccountDispatch"
// import isJWT from "@/components/Utility/isJWT"
import useAccount from "./useAccount"
// import useToken from "./useToken"
import useToken from "./useToken"
// import isJWT from "@/components/Utility/isJWT"
import useAccountDispatch from "./useAccountDispatch"

export default function useUser(){
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAccount()
    const dispatch = useAccountDispatch()
    const { token, isSet }  = useToken()


    useEffect(()=>{
        let ignore = false

        async function getUser(){
            let query = process.env.NEXT_PUBLIC_API_URL + `/api/user-data`

            console.log(query)
            if(  isSet && !ignore && Object.keys(user).length < 1 ){
                setIsLoading(()=>true)
                try {
                    const response = await fetch(query , {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            },
                        });
                    if(response){
                        const response_data = await response.json()
                        
                        dispatch({type:'account/user', data: response_data})
                    }
                } catch (error) {
                    
                }finally{
                    setIsLoading(()=>false)
                }   
            }
        }
        
        getUser()

    return ()=> ignore = true
    }, [isSet])
    return { isLoading, user };
}