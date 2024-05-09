import { useEffect, useState } from "react"
// import termsAndConditionService from "@/service/TermsAndConditionService";
// import { usePathname } from "next/navigation";
import accountService from "@/service/AccountService";
import localService from "@/service/LocalService";
import useDataDispatch from "@/context/data/useDataDispatch";
import useData from "@/context/data/useData";
import useAddPropertySession from "@/context/addListing/useAddPropertySession";
import useToken from "@/context/account/useToken";

export default function useIpLocation(){
    const { setterConditions: { isCountrySet,
                                isCitySet,
                                isTimezoneSet,
                                isZipCodeSet }} = useAddPropertySession()
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDataDispatch()

    const { 
            ipLocation:{ 
                            documents,
                            isValid,
                            fetchTime,
                            err
                        }, 
            localInfo:{ 
                            documents: { ip },
                        }, 
        
            } = useData()
    const { token, isSet, isLoading:tokenLoading, expireTime }  = useToken()
    if(ip){
        console.log(ip)
    }

    useEffect(()=>{
        let ignore = false



        async function getLocationFromIp(){
            
            if(!ignore && !(isCountrySet &&  isCitySet && isTimezoneSet && isZipCodeSet) ){
                if( ip && isSet ){ 
                    // console.log('....')
                    setIsLoading( ()=> true)
                    let query = process.env.NEXT_PUBLIC_API_URL + `/api/user-location?ip=${ip}`
                    const response = await fetch(query , {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            // Add any additional headers here if needed
                            },
                        });
                    const data = await response.json();
                    if(data){
                        console.log(data)
                        dispatch({ type:'data/ipLocation', data:data })
                    }
                }
            } 
        }

        if( !(Object.keys(documents).length > 0 
                && isValid 
                && ip)        ){
                    getLocationFromIp()
                }
        return ()=> ignore = true
    }, [isValid, ip, isSet])

    return {isLoading, ipLocation: documents};
}