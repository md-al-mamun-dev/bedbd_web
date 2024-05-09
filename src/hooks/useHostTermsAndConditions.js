import { useEffect, useState } from "react"
import termsAndConditionService from "@/service/TermsAndConditionService";
import { usePathname } from "next/navigation";
import useData from "@/context/data/useData";
import useDataDispatch from "@/context/data/useDataDispatch";

export default function useHostTermsAndConditions(){
    const [isLoading, setIsLoading] = useState(false)
    const { hostTermsAndCondition: {documents, isValid, fetchTime, err} } = useData()
    const dispatch = useDataDispatch()

    useEffect(()=>{
        let ignore = false
        async function getHostTermsCondition() {
            if(!ignore){
                setIsLoading( ()=> true)
                const data =  await termsAndConditionService.getHostTermsConditions()
                if(data){
                    dispatch({ type:'data/hostTermsAndConditions', data: data })
                    setIsLoading( ()=> false )
                }
            }
        }

        if(!(documents.length > 0 &&  isValid)){
                getHostTermsCondition()
        }

        return ()=> ignore = true
    }, [isValid])

    return {isLoading, termsConditions: documents};
}