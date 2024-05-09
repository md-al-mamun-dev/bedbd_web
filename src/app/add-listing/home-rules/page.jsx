
'use client'
import LucidIcon from "@/components/LucidIcon"
import { Square, SquareCheckBig } from "lucide-react"
import SwitchBtn from "../SwitchBtn"
import { useEffect, useState } from "react"
import getAllTimeSegment from "@/components/Utility/getAllTimeSegment"
// import useAreaLocation from "@/hooks/useLocal"
// import usePropertyDispatch from "@/context/property/usePropertyDispatch"
// import useHomeRules from "@/hooks/useHomeRules_old"
import useHomeRules from "@/hooks/useHomeRules"
// import useHomeRules from "@/hooks/useHomeRules"
// import AddHomeRules from "./AddHomeRulesModal"
import AddPropertyParameterModal from "../AddPropertyParameterModal"
import useProperty from "@/context/property/useProperty"
import { useRouter } from "next/navigation"
import usePropertyListingSession from "@/context/addListing/usePropertyListingSessions"
import useAddPropertySession from "@/context/addListing/useAddPropertySession"
import useAddPropertySessionDispatch from "@/context/addListing/useAddPropertySessionDispatch"
import useToken from '@/context/account/useToken'

export default function HomeRules() {
    const data = usePropertyListingSession()
    const {isLoading:isTokenLoading,
        isSet,
        token} = useToken()
    const [addHomeRulesModalOpen, setAddHomeRulesModalOpen] = useState(false)
    const [timeZone, setTimeZone] =useState('+6')
    const router = useRouter()
    const { isLoading, homeRules : homeRulesData } = useHomeRules() 

    const {activeSession: { id:propertyId, homeRules:selectedHomeRules,checkInTime, checkOutTime, timezone, customHomeRules}, } = useAddPropertySession()
    const {  timeZone:timezoneData } = useProperty()


    console.log(timezoneData)
    function moveToPreviousPage() {
        router.push('/add-listing/amenities')
      }
    function moveToNextPage() {
        router.push('/add-listing/images')
    }


    const dispatch = useAddPropertySessionDispatch()
    // const [checkInTime, setCheckInTime] = useState('')
    // const [checkOutTime, setCheckOutTime] = useState('')


    const timeSegments = getAllTimeSegment()
    async function updateProperty({propertyId, data}){
        let query = process.env.NEXT_PUBLIC_API_URL + `/api/listing?id=${propertyId}`
        const response = await fetch(query , {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              },
          body: JSON.stringify(data)
          });
    
          if(response){
            console.log(response.json)
          }
      }
    function onContinueBtnClickHandlar(e) {
        e.preventDefault()
        updateProperty({propertyId, 
            data:{
                homeRules:selectedHomeRules,
                customHomeRules, 
                checkInTime,
                checkOutTime
            }})
        moveToNextPage()
        // router.push('/add-listing/accommodation-details')
    }

    useEffect(()=>{
        let ignore = false
        if(!isLoading && !ignore && (typeof timezoneData !== undefined) ){
            timezoneData.length > 0 && setTimeZone(timezoneData)
        }

        return ()=> ignore = true
    }, [timezoneData])

    function homeRulesToggle(id) {
        dispatch({type:'addProperty/toggleHomeRulesSelect', data:id})
    }


    function onContinueBtnClick() {
        // dispatch({type:'property/checkIn', data:checkInTime})
        // dispatch({type:'property/checkOut', data:checkOutTime})





        nextPage()
    }
  return (
    <>
        <div className='w-100 h-max-content absolute-h-center top-0 max-width-1280 '>
            <div className='max-w-600px mr-l-auto mr-r-auto p-btm-80px p-top-56px'>
                <h3 className='mr-btm-48px clr-primary-400 txt-align-center fw-regular-dark fs-875'>Home Rules</h3>
                <div className="">
                    <h4 className="fw-regular-dark fs-600 clr-neutral-600">Home Rules</h4>
                    <div className="grid gap-16px">
                        {
                            homeRulesData.map(i=>{
                                return (    <button 
                                                onClick={()=>homeRulesToggle(i['id'])}
                                                className="flex bg-transparent no-outline align-center space-between radius-8 border-neutral-300 p-16px-24px cursor-pointer" >
                                                <p>{i['title']}</p>
                                                {
                                                    selectedHomeRules.includes(i['id'])
                                                        ? <SquareCheckBig className='opacity-0_70' size={24}/>
                                                        : <Square className='opacity-0_70' size={24}/>
                                                }
                                                {/* <LucidIcon className='opacity-0_70' name={icon} size={24} /> */}
                                            </button>)
                                        })
                                        
                        }
                        {
                            customHomeRules.length > 0 &&
                            customHomeRules.map(i=>{
                                return (    <button 
                                                onClick={()=>dispatch({type:'addProperty/toggleCustomHomeRules', data:i['id']})}
                                                className="flex bg-transparent no-outline align-center space-between radius-8 border-neutral-300 p-16px-24px cursor-pointer" >
                                                <p>{i['title']}</p>
                                                {
                                                    i['isSelected']
                                                    // selectedHomeRules.includes(i['id'])
                                                        ? <SquareCheckBig className='opacity-0_70' size={24}/>
                                                        : <Square className='opacity-0_70' size={24}/>
                                                }
                                                {/* <LucidIcon className='opacity-0_70' name={icon} size={24} /> */}
                                            </button>)
                                        })
                        }
                    </div>
                    <button 
                        onClick={()=>setAddHomeRulesModalOpen(true)}
                        className="flex gap-8px mr-top-14px border-btm-500 no-background cursor-pointer">
                        <LucidIcon name='plus' size={24}/>
                        Add more
                    </button>
                </div>
                <div className='mr-top-32px'>
                    <div className='w-100'>
                        <h1 className='fs-600 fw-regular-dark clr-neutral-600 '>Check-in {(timezone.length > 0) && timezone.substring(timezone.indexOf("("), timezone.indexOf(")") + 1)}</h1>
                        <div className="flex gap-40px space-between mr-top-8px">
                            {/* <div className="position-relative w-100">
                                <select
                                    onChange={e=>setCheckInTime([e.target.value, checkInTime[1]])}
                                    className='w-100 p-16px-24px border-neutral-300 radius-8'>
                                    {
                                        timeSegments.map(i=>(
                                            <option                                            
                                                value={`${i['hour']}:${i['minute']} ${parseInt(i['hour'])<12 ? 'AM' : 'PM'}`}>
                                                    {`${i['hour']}:${i['minute']} ${parseInt(i['hour'])<12 ? 'AM' : 'PM'}`}                                                                                            
                                            </option>))
                                    }
                                </select>
                                <LucidIcon className='position-absolute top-50 translateY-50 right-24px ' name='chevron-down' size={24}/>
                            </div> */}
                            
                            <div className="position-relative w-100">
                                <select 
                                    // onChange={e=>setCheckInTime([checkInTime[0], e.target.value])}
                                    value={checkInTime}
                                    onChange={e=>dispatch({type:'addProperty/checkInTime', data: e.target.value})}
                                    className='w-100 p-16px-24px border-neutral-300 radius-8'>
                                    {
                                        timeSegments.map(i=>(
                                            <option value={`${i['hour']}:${i['minute']} ${parseInt(i['hour'])<12 ? 'AM' : 'PM'}`}>{`${i['hour']}:${i['minute']} ${parseInt(i['hour'])<12 ? 'AM' : 'PM'}`}</option>))
                                    }                            
                                </select>
                                <LucidIcon className='position-absolute top-50 translateY-50 right-24px ' name='chevron-down' size={24}/>
                            </div>
                        </div>
                    </div>
                    <div className='w-100 mr-top-16px'>
                        <h1 className='fs-600 fw-regular-dark clr-neutral-600 '>Check-out {(timezone.length > 0) && timezone.substring(timezone.indexOf("("), timezone.indexOf(")") + 1)}</h1>
                        <div className="flex gap-40px space-between mr-top-8px">
                            {/* <div className="position-relative w-100">
                                <select 
                                    onChange={e=>setCheckOutTime([e.target.value, checkInTime[1]])}
                                    className='w-100 p-16px-24px border-neutral-300 radius-8'>
                                    {
                                        timeSegments.map(i=>(
                                            <option value={`${i['hour']}:${i['minute']} ${parseInt(i['hour'])<12 ? 'AM' : 'PM'}`}>{`${i['hour']}:${i['minute']} ${parseInt(i['hour'])<12 ? 'AM' : 'PM'}`}</option>))
                                    }                            
                                </select>
                                <LucidIcon className='position-absolute top-50 translateY-50 right-24px ' name='chevron-down' size={24}/>
                            </div> */}
                            
                            <div 
                                
                                className="position-relative w-100">
                                <select 
                                    onChange={e=>dispatch({type:'addProperty/checkOutTime', data:e.target.value})}
                                    value={checkOutTime}
                                    className='w-100 p-16px-24px border-neutral-300 radius-8'>
                                    {
                                        timeSegments.map(i=>(
                                            <option value={`${i['hour']}:${i['minute']} ${parseInt(i['hour'])<12 ? 'AM' : 'PM'}`}>{`${i['hour']}:${i['minute']} ${parseInt(i['hour'])<12 ? 'AM' : 'PM'}`}</option>))
                                    }                            
                                </select>
                                <LucidIcon className='position-absolute top-50 translateY-50 right-24px ' name='chevron-down' size={24}/>
                            </div>
                        </div>
                    </div>
                </div>  
                        
                <SwitchBtn nextPage={onContinueBtnClickHandlar} previousPage={moveToPreviousPage}/>
            </div>
        </div>
        { 
                    addHomeRulesModalOpen 
                &&  <AddPropertyParameterModal 
                        title='Add a new Home Rules'
                        closeModal={()=>setAddHomeRulesModalOpen(false)} 
                        addType= 'addProperty/addCustomHomeRules'
                        // selectType= 'property/selectHomeRules'
                        />}
        {/* { addHomeRulesModalOpen && <AddHomeRules data={data} closeModal={()=>setAddHomeRulesModalOpen(false)}/>} */}
    </>
    
  )
}
