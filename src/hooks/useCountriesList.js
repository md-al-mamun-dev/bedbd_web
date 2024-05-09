import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
// import usePropertyDispatch from "@/context/property/usePropertyDispatch"
// import veri from "@/service/DatabaseService";
// import userVerificationService from "@/service/UserVerificationService";
import localService from "@/service/LocalService"

import useData from "@/context/data/useData"
import useDataDispatch from "@/context/data/useDataDispatch"


export default function useCountriesList(){
    const [isLoading, setIsLoading] = useState(false)
    const { countryList:{ isValid, fetchTime, documents, err  } } = useData()
    const dispatch = useDataDispatch()
    
    useEffect(()=>{
        let ignore = false
        async function getCountryList(){
            if(!ignore){
                setIsLoading( ()=> true)
                try {
                    const data =  await localService.getCountries()
                    if(data){
                        // setCountries( ()=> data)
                        dispatch({ type:'data/countryList', data:data })
                        setIsLoading( ()=> false )
                    }
                } catch (error) {
                    setIsLoading( ()=> false )
                }                
            }
        }

        if(     !(documents.length > 0 
            &&  isValid)        ){
            getCountryList()
        }
        
    return ()=> ignore = true
    }, [isValid])
    return {isLoading, countries:documents};
}