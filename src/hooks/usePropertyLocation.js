import { useEffect, useState } from "react"
import useDataDispatch from "@/context/data/useDataDispatch"
// import usePropertyDispatch from "@/context/property/usePropertyDispatch"
import accountService from "@/service/AccountService"
import useData from "@/context/data/useData"


export default function usePropertyLocation(propertyId){
    const [isLoading, setIsLoading] = useState(false)
    // const [userId, setUserId] = useState('')
    const [propertyLocation, setPropertyLocation] = useState({})

    const dispatch = useDataDispatch()
    const { locations } = useData()
    
    // const location = locations.filter(item => item['propertyId'] === propertyId)
    useEffect(()=>{
        let ignore = false
        async function getPropertyLocation(){
            let query = process.env.NEXT_PUBLIC_API_URL + `/api/property-location?propertyId=${propertyId}`
            if(!ignore){
                setIsLoading( ()=> true)
                try {
                    const user = await accountService.getLoggedInUser()
                    if(user['$id']){
                        query = query + `&userId=${user['$id']}`
                    }
                } catch (error) {

                }finally{
                    try {
                        // Need to send authorization token
                        const response = await fetch(query , {
                                            method: 'GET',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                // Add any additional headers here if needed
                                                },
                                            });

                        if(response){
                            const responseResult = await response.json()

                            // console.log(responseResult)
                            if(responseResult && !ignore){
                                // console.log(responseResult)
                                setPropertyLocation(()=>responseResult)
                                dispatch({type:'data/updateLocation', data: responseResult})
                                setIsLoading(()=>false)
                            }
                        }                        
                    } catch (error) {
                    }
                }
            }
        }
        



        

        const location = locations.filter(item => item['propertyId'] === propertyId)

        if(location.length > 0 ){
            if(location[0]['isValid'] && !ignore){
                setIsLoading(()=>false)
                setPropertyLocation(location[0])
                
                // return {       isLoading: false, 
                //         propertyLocation: location[0]};
            }else{
                dispatch({  type: 'data/removeLocation', 
                            data: propertyId    })
                getPropertyLocation()
            }
        }else{
            getPropertyLocation()
        }
        
        getPropertyLocation()
    return ()=> ignore = true
    }, [])

    return {isLoading, propertyLocation};
}