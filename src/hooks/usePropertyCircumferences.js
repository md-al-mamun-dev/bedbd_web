import { useEffect, useState } from "react"
import propertyService from "@/service/PropertyService"
import usePropertyDispatch from "@/context/property/usePropertyDispatch"
import useDataDispatch from "@/context/data/useDataDispatch"
// import veri from "@/service/DatabaseService";
// import userVerificationService from "@/service/UserVerificationService";


export default function usePropertyCircumferences(){
    const [isLoading, setisLoading] = useState(false)
    // const [popertyCircumferences, setPopertyCircumferences] = useState([])
    const { circumferences:{documents, isValid, fetchTime, err} } = useData()
    const dispatch = useDataDispatch()
    useEffect(()=>{
        let ignore = false
        async function getPropertyCircumferences(){
            if(!ignore){
                setisLoading( ()=> true)
                try {
                    const data =  await propertyService.getPropertyCircumferences()
                    if(data){
                        // setPopertyCircumferences( ()=> data)
                        dispatch({ type:'data/propertyCircumferences', data:data })
                            setisLoading( ()=> false )
                    }
                } catch (error) {
                    setisLoading( ()=> false )
                }                
            }
        }
        if(     !(documents.length > 0 
            &&  isValid)        ){
            getPropertyCircumferences()
        }
        
    return ()=> ignore = true
    }, [])
    return {isLoading, popertyCircumferences:documents};
}