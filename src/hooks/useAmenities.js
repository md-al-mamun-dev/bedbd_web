import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
import useData from "@/context/data/useData"
import useDataDispatch from "@/context/data/useDataDispatch"

export default function useAmenities(){
    const [isLoading, setIsLoading] = useState(false)
    // const [amenities, setAmenities] = useState([])
    const { amenities:{documents, isValid, fetchTime, err} } = useData()
    const dispatch = useDataDispatch()

    useEffect(()=>{
        let ignore = false
        async function getAmenities(){
            if(!ignore){
                setIsLoading( ()=> true)
                try {
                    const data =  await propertyService.getAmenities()
                    if(data){
                        dispatch({ type:'data/amenities', data:data })
                            setIsLoading( ()=> false )
                    }
                } catch (error) {
                    setIsLoading( ()=> false )
                }                
            }
        }
        if(     !(documents.length > 0 
                &&  isValid)        ){
                getAmenities()
            }
    return ()=> ignore = true
    }, [isValid])
    return {isLoading, amenities:documents};
}