import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
import useDataDispatch from "@/context/data/useDataDispatch"
import useData from "@/context/data/useData"

export default function useHomeRules(){
    const [isLoading, setIsLoading] = useState(false)
    const { homeRules:{documents, isValid, fetchTime, err} } = useData()
    const dispatch = useDataDispatch()

    useEffect(()=>{
        let ignore = false
        async function getHomeRules(){
            if(!ignore){
                setIsLoading( ()=> true)
                try {
                    const data =  await propertyService.getHomeRules()
                    if(data){
                        dispatch({ type:'data/homeRules', data:data })
                            setIsLoading( ()=> false )
                    }
                } catch (error) {
                    setIsLoading( ()=> false )
                }                
            }
        }

        if(     !(  documents.length > 0  
            &&  isValid       )){
                getHomeRules()
            }
    return ()=> ignore = true
    }, [isValid])
    return {isLoading, homeRules:documents};
}



