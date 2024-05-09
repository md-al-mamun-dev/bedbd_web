import { useEffect, useState } from "react"
import useData from "@/context/data/useData"
import useDataDispatch from "@/context/data/useDataDispatch"
import useToken from "@/context/account/useToken"


export default function useHomeRules(){
    const [isLoading, setIsLoading] = useState(false)
    const { homeRules:{documents, isValid, fetchTime, err} } = useData()
    const dispatch = useDataDispatch()
    const { token, isSet }  = useToken()

    useEffect(()=>{
        let ignore = false
        async function getHomeRules(){
            let query = process.env.NEXT_PUBLIC_API_URL + `/api/home-rules`
            if(!ignore){
                setIsLoading( ()=> true)
                try {
            console.log(token)

                    const response = await fetch(query , {
                                            method: 'GET',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${token}`,
                                                },
                                            });
                    const data = await response.json()
                    
                            
                    if(data){
                        console.log(data)
                        if(data['documents'].length > 0 ){
                            dispatch({ 
                                type:'data/homeRules', 
                                data: data['documents'].map(object=> {
                                                                if(object._id){
                                                                    object['id'] = object._id;
                                                                    delete object._id;
                                                                }
                                                                return object
                                                            }) })
                                    }
                        setIsLoading( ()=> false )
                    }
                } catch (error) {
                    setIsLoading( ()=> false )
                }                
            }
        }

        if(!(documents.length > 0 
            &&  isValid && isSet)        ){

                console.log('getting...')
                getHomeRules()
            }
        
    return ()=> ignore = true
    }, [isSet])
    return {isLoading, homeRules: documents};
}
