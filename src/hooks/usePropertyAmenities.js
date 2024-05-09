import { useEffect, useState } from "react"
import useData from "@/context/data/useData"
import useDataDispatch from "@/context/data/useDataDispatch"
import useToken from "@/context/account/useToken"


export default function usePropertyAmenities(){
    const [isLoading, setIsLoading] = useState(false)
    const { amenities:{documents, isValid, fetchTime, err} } = useData()
    const dispatch = useDataDispatch()
    const { token, isSet }  = useToken()

    useEffect(()=>{
        let ignore = false
        async function getAmenities(){
            let query = process.env.NEXT_PUBLIC_HOME_URL + `/api/property-amenities`
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
                                type:'data/amenities', 
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
                getAmenities()
            }
        
    return ()=> ignore = true
    }, [isSet])
    return {isLoading, amenities: documents};
}
