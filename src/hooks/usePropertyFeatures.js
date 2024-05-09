import { useEffect, useState } from "react"
import useData from "@/context/data/useData"
import useDataDispatch from "@/context/data/useDataDispatch"
import useToken from "@/context/account/useToken"


export default function usePropertyFeatures(){
    const [isLoading, setisLoading] = useState(false)
    const { propertyFeatures :{documents, isValid, fetchTime, err} } = useData()
    const dispatch = useDataDispatch()

    const { token, isSet }  = useToken()

    useEffect(()=>{
        let ignore = false
        async function getPropertyFeatures(){
            let query = process.env.NEXT_PUBLIC_HOME_URL + `/api/property-features`
            if(!ignore){
                setisLoading( ()=> true)
                try {
                    const response = await fetch(query , {
                                            method: 'GET',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${token}`,
                                                },
                                            });
                    const data = await response.json()
                    
                            
                    if(data){
                        console.log(data)
                        if(data['documents'].length > 0 ){
                            dispatch({ 
                                type:'data/propertyFeatures', 
                                data: data['documents'].map(object=> {
                                                                if(object._id){
                                                                    object['id'] = object._id;
                                                                    delete object._id;
                                                                }
                                                                return object
                                                            }) })
                                    }
                        setisLoading( ()=> false )
                    }
                } catch (error) {
                    setisLoading( ()=> false )
                }                
            }
        }

        if(!(documents.length > 0 
            &&  isValid && isSet)        ){

                console.log('getting...')
                getPropertyFeatures()
            }
        
    return ()=> ignore = true
    }, [isSet])
    return {isLoading, propertyFeatures: documents};
}



// import { useEffect, useState } from "react"
// import propertyService from "@/service/PropertyService"
// import useDataDispatch from "@/context/data/useDataDispatch"
// import useData from "@/context/data/useData"


// export default function usePropertyFeatures(){
//     const [isLoading, setisLoading] = useState(false)
//     const { propertyFeatures:{documents, isValid, fetchTime, err} } = useData()

//     const dispatch = useDataDispatch()
//     useEffect(()=>{
//         let ignore = false
//         async function getPropertyFeatures(){
//             if(!ignore){
//                 setisLoading( ()=> true)
//                 try {
//                     const data =  await propertyService.getPropertyFeatures()
//                     if(data){
//                         dispatch({ type:'data/propertyFeatures', data:data })
//                             setisLoading( ()=> false )
//                     }
//                 } catch (error) {
//                     setisLoading( ()=> false )
//                 }                
//             }
//         }

//         if(     !(documents.length > 0 
//                     &&  isValid)        ){
//             getPropertyFeatures()
//         }
//     return ()=> ignore = true
//     }, [isValid])
//     return {isLoading, propertyFeatures: documents};
// }