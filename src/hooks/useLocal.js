import { useEffect, useState } from "react"
// import termsAndConditionService from "@/service/TermsAndConditionService";
// import { usePathname } from "next/navigation";
import accountService from "@/service/AccountService";
import localService from "@/service/LocalService";
import useDataDispatch from "@/context/data/useDataDispatch";
import useData from "@/context/data/useData";


export default function useLocal(){
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDataDispatch()

    const { localInfo:{ documents, isValid, fetchTime, err} } = useData()
    useEffect(()=>{
        let ignore = false
        async function getUserLocalData(){
            if(!ignore){
                setIsLoading(()=>true)
                const data = await localService.getUsersLocalInformation()
                if(data){
                    dispatch({ type:'data/local', data:data })
                    setIsLoading(()=>false)
                }
            }
        }
        if( !(Object.keys(documents).length > 0 
            &&  isValid)        ){
                getUserLocalData()
            }
        
        return ()=> ignore = true
    }, [])


    useEffect(()=>{
        let ignore = false

        if(!ignore ){
            
            async function getLocationFromIp(){
                // const tokenResult = await accountService.getToken()
                if(Object.keys(localData).length>0 ){
                    // const token = tokenResult['jwt']                    
                    let result = await fetch(`/api/location?ip=${localData['ip']}`, 
                    { 
                        method: 'GET',
                        // headers: { Authorization: `Bearer ${token}` }
                    });

                // if(result){
                //     // const data = await result.json()
                //     if(data)
                //         setLocation(data)
                // }
                }
            }

            getLocationFromIp()
        }
        return ()=> ignore = true
    }, [localData])


    // return {localInfo:localData, location:location};
    return {isLoading, localInfo: documents};
}