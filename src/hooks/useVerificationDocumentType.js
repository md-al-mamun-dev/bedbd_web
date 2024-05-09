import { useEffect, useState } from "react"
// import veri from "@/service/DatabaseService";
import userVerificationService from "@/service/UserVerificationService";
import useDataDispatch from "@/context/data/useDataDispatch";
import useData from "@/context/data/useData";


export default function useVerificationDocumentType(){
    // const [verificationDocumentTypes, setVerificationDocumentTypes] = useState([]);

    const [isLoading, setIsLoading] = useState(false)
    const { verificationDocumentTypes :{documents, isValid, fetchTime, err} } = useData()
    const dispatch = useDataDispatch()
    useEffect(()=>{
        let ignore = false
        async function getVerificationDocumentType() {


            if(!ignore){
                setIsLoading(()=>true)
                const data =  await userVerificationService.getVerificationDocumentTypes()
                if(data){
                    dispatch({ type:'data/verificationDocumentTypes', data:data })
                }
                setIsLoading(()=>false)
            }
        }
        

        if(     !(documents.length > 0 
            &&  isValid)        ){
                getVerificationDocumentType()
            }
        return ()=> ignore = true
    }, [])
    return {isLoading, verificationDocumentTypes:documents};
}