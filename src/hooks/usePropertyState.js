import { useEffect, useState } from "react"
import useData from "@/context/data/useData"
import useDataDispatch from "@/context/data/useDataDispatch"
import useToken from "@/context/account/useToken"
import usePropertyListingSession from "@/context/addListing/usePropertyListingSessions"

export default function usePropertyStates(){
    const data = usePropertyListingSession()
    const [isLoading, setisLoading] = useState(false)
    // const [propertyTypes, setPropertyTypes] = useState([])
    const { propertyStates:{documents, isValid, fetchTime, err} } = useData()
    const { token, isSet }  = useToken()
    const dispatch = useDataDispatch()

    useEffect(()=>{
        let ignore = false
        async function getPropertyState(){
            setisLoading( ()=> true)

            let query = process.env.NEXT_PUBLIC_HOME_URL + `/api/property-states`
            if(!ignore){
                // console.log(token)
                try {
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
                                type:'data/propertyStates', 
                                data: data['documents'].map(object=> {
                                                                if(object._id){
                                                                    object.id = object._id;
                                                                    delete object._id;
                                                                }
                                                                return object
                                                            }) })
                                    }

                        
                        setisLoading( ()=> false )
                    }
                } catch (error) {
                    setisLoading( ()=> false )
                }                
            }
            setisLoading( ()=> false)
        }

        if(!(documents.length > 0 
            &&  isValid && isSet)        ){
                getPropertyState()
            }

    return ()=> ignore = true
    }, [isSet])
    return {isLoading, propertyStates: documents};
}