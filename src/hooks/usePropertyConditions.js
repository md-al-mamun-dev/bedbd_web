import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
import usePropertyDispatch from "@/context/property/usePropertyDispatch"
import useDataDispatch from "@/context/data/useDataDispatch"
// import veri from "@/service/DatabaseService";
// import userVerificationService from "@/service/UserVerificationService";
import useData from "@/context/data/useData"


export default function usePropertyConditions(){
    const [isLoading, setisLoading] = useState(false)
    // const [popertyCircumferences, setPopertyCircumferences] = useState([])
    const { popertyConditions:{documents, isValid, fetchTime, err} } = useData()
    const dispatch = useDataDispatch()
    useEffect(()=>{
        let ignore = false
        async function getPropertyConditions(){
            if(!ignore){
                setisLoading( ()=> true)
                try {
                    const data =  await propertyService.getPropertyConditions()
                    if(data){
                        // setPopertyCircumferences( ()=> data)
                        dispatch({ type:'data/propertyConditions', data:data })
                            setisLoading( ()=> false )
                    }
                } catch (error) {
                    setisLoading( ()=> false )
                }                
            }
        }
        if(     !(documents.length > 0 
            &&  isValid)        ){
            getPropertyConditions()
        }
        
    return ()=> ignore = true
    }, [])
    return {isLoading, popertyConditions:documents};
}