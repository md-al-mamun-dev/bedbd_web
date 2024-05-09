import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
import useData from "@/context/data/useData"
import useDataDispatch from "@/context/data/useDataDispatch"

export default function usePropertyBookingType(){
    const [isLoading, setisLoading] = useState(false)
    const { propertyBookingTypes:{documents, isValid, fetchTime, err} } = useData()
    const dispatch = useDataDispatch()

    useEffect(()=>{
        let ignore = false
        async function getPropertyBookingTypes(){
            if(!ignore){
                setisLoading( ()=> true)
                try {
                    const data =  await propertyService.getPropertyBookingTypes()
                    if(data){
                        dispatch({ type:'data/propertyBookingTypes', data:data })
                            setisLoading( ()=> false )
                    }
                } catch (error) {
                    setisLoading( ()=> false )
                }                
            }
        }
        if(     !(documents.length > 0 
            &&  isValid)        ){
            getPropertyBookingTypes()
        }
        
    return ()=> ignore = true
    }, [isValid])
    return {isLoading, propertyBookingTypes:documents};
}