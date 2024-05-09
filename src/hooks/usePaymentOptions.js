'use client'
import { useEffect, useState } from "react"
import paymentService from "@/service/PaymentService"
import useDataDispatch from "@/context/data/useDataDispatch"
import useData from "@/context/data/useData"


export default function usePaymentOptions(){
    const [isLoading, setIsLoading] = useState(false)
    const { paymentOptions:{documents, isValid, fetchTime, err} } = useData()
    const dispatch = useDataDispatch()

    useEffect(()=>{
        let ignore = false
        async function getPaymentOptions(){
            if(!ignore){
                setIsLoading( ()=> true)
                try {
                    const data =  await paymentService.getPaymentOptions()
                    if(data){
                        dispatch({ type:'data/paymentOptions', data:data })
                        setIsLoading( ()=> false )
                    }
                } catch (error) {
                    setIsLoading( ()=> false )
                }                
            }
        }
       
        if(     !(  documents.length > 0  
                        &&  isValid       )){
                getPaymentOptions()
            }
    return ()=> ignore = true
    }, [isValid])
    return {isLoading, paymentOptions: documents};
}