import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
import usePropertyDispatch from "@/context/property/usePropertyDispatch"
import useData from "@/context/data/useData"
import useDataDispatch from "@/context/data/useDataDispatch"
import useToken from "@/context/account/useToken"


export default function usePropertyTypes(){
    const [isLoading, setisLoading] = useState(false)
    const { propertyTypes:{documents, isValid, fetchTime, err} } = useData()
    const { token, isSet }  = useToken()
    const dispatch = useDataDispatch()

    useEffect(()=>{
        let ignore = false
        async function getPropertyTypes(){
            let query = process.env.NEXT_PUBLIC_HOME_URL + `/api/property-types`
            if(!ignore){
                setisLoading( ()=> true)


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
                        if(data['propertyTypes'].length > 0 ){
                            dispatch({ 
                                type:'data/propertyTypes', 
                                data: data['propertyTypes'].map(object=> {
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
        }

        if(isSet && !(documents.length > 0 
            &&  isValid)        ){
                getPropertyTypes()
            }
        
    return ()=> ignore = true
    }, [isSet])
    return {isLoading, propertyTypes: documents};
}