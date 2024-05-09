import { useEffect, useState } from "react"
import localService from "@/service/LocalService";
import useDataDispatch from "@/context/data/useDataDispatch";
import useData from "@/context/data/useData";
import useAddPropertySession from "@/context/addListing/useAddPropertySession";

export default function useLocalInfo(){
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDataDispatch()

    const {setterConditions: {  isCountrySet }} = useAddPropertySession() 

    const { localInfo:{documents, isValid, fetchTime, err} } = useData()

    useEffect(()=>{
        let ignore = false
        if(!ignore && !isCountrySet){
            async function getUserLocalData(){
                setIsLoading(()=>true)
                const data = await localService.getUsersLocalInformation()
                if(data){
                    console.log(data)
                    dispatch({ type:'data/local', data:data })

                    setIsLoading(()=>false)
                }
            }
            if( !(Object.keys(documents).length > 0 
                &&  isValid)        ){
                    getUserLocalData()
                }
        }
        return ()=> ignore = true
    }, [isValid])
    return {isLoading, localInfo: documents};
}