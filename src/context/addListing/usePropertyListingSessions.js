import { useEffect, useState } from "react"
import useData from "@/context/data/useData"
import useToken from "../account/useToken"
import useAddPropertySession from "./useAddPropertySession"
import useAddPropertySessionDispatch from "./useAddPropertySessionDispatch"



export default function usePropertyListingSession(){
    const [isLoading, setIsLoading] = useState(false)
    // const { propertyFeatures:{documents, isValid, fetchTime, err} } = useData()

    const {  isValid, fetchTime, documents, err, setterConditions: { isMapLocationSet } } = useAddPropertySession()

    const { token, isSet:isTokenSet, isLoading:tokenLoading, expireTime }  = useToken()

    const dispatch = useAddPropertySessionDispatch()
    useEffect(()=>{
        let ignore = false

        async function getPropertyListingActiveSession(){
            let query = process.env.NEXT_PUBLIC_API_URL + `/api/listing`
      
            // console.log(query)
            if(  isTokenSet && !ignore ){
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

                        if(response_data && response_data['documents'].length > 0){
                            const data = response_data['documents']
                                            .map( object => {
                                                if (object._id) {
                                                object.id = object._id;
                                                delete object._id;
                                                }
                                                return object;
                                            })

                            dispatch({type:'addProperty/sessions', data: response_data['documents']})
                            if(data.length === 1){
                                dispatch({type:'addProperty/activeSession', data: data[0]})
                                // if(data[0]['location'].length === 2){
                                //     dispatch({
                                //         type:'addProperty/setGeolocation', 
                                //         data: { 
                                //             'latitude':data[0]['location'][0], 
                                //             'longitude': data[0]['location'][1]   
                                //         } })
                                // }

                            }
        }

                        
                        // console.log(response_data)
                        
                    }
                    setIsLoading(()=>false)
                } catch (error) {
                    
                }finally{
      
                }   
            }
        }
        
        if(!isValid && ((Date.now() - fetchTime)/(1000 * 60 * 60) > 12 )){
            getPropertyListingActiveSession()
        }
      return ()=> ignore = true
      }, [isTokenSet])
    return { isLoading, addPropertySessions: documents };
}