'use client'
import React, { useEffect, useState } from 'react'
// import PropertyFeature from './PropertyFeature'
import SwitchBtn from '../SwitchBtn'
import LucidIcon from '@/components/LucidIcon'
// import copyToClipboard from '@/components/Utility/copyToClipboard'
// import { City } from 'country-state-city'
// import usePropertyDispatch from '@/context/property/usePropertyDispatch'
import useAddPropertySessionDispatch from '@/context/addListing/useAddPropertySessionDispatch'
import useAddPropertySession from '@/context/addListing/useAddPropertySession'
import Heading from '../Heading'
import { useRouter } from 'next/navigation'
import useToken from '@/context/account/useToken'
import usePropertyListingSession from '@/context/addListing/usePropertyListingSessions'
// import useData from '@/context/data/useData'


export default function AccommodationDetails() {
    const propertyListingData =  usePropertyListingSession()
    const { activeSession:{ id: propertyId, 
                            roomCount: selectedRoomCount,
                            bedCount: selectedBedCount,
                            guestCount: selectedGuestCount  }}  = useAddPropertySession()
    const {isLoading:isTokenLoading,
        isSet,
        token} = useToken()



    const dispatch = useAddPropertySessionDispatch()
    // const {roomCount, bedCount, guestCount } = useData()

    const [roomCount, setRoomCount] = useState([
                                                    {
                                                        id:0,
                                                        name:'Bedroom',
                                                        count:0,
                                                    },
                                                    {
                                                        id:1,
                                                        name:'Dining Room',
                                                        count:0,
                                                    },
                                                    {
                                                        id:2,
                                                        name:'Washroom',
                                                        count:0,
                                                    },
                                                    {
                                                        id:3,
                                                        name:'Others',
                                                        count:0,
                                                    },
                                                ])
    const [bedCount, setBedCount] = useState([
                                                    {
                                                        id: 0,
                                                        name:'Single bed',
                                                        count:0,
                                                    },
                                                    {
                                                        id: 1,
                                                        name:'Double bed',
                                                        count:0,
                                                    },
                                                    {
                                                        id: 2,
                                                        name:'Extra bed (Request)',
                                                        count:0,
                                                    },
                                                ])
    const [guestCount, setGuestCount] = useState([
                                                    {
                                                        id: 0,
                                                        type:'Adult',
                                                        count:0,
                                                    },
                                                    {
                                                        id: 1,
                                                        type:'under 14',
                                                        count:0,
                                                    },
                                                ])  

    useEffect(()=>{
        setRoomCount(room => room.map(
                                roomCountItem => {
                                    const hasSelectedItem = selectedRoomCount.find(i=> roomCountItem['name']===i['name'])
                                    if(hasSelectedItem)
                                        return {...roomCountItem, count: hasSelectedItem['count'] }
                                    else return roomCountItem
                                    } 
                                ) 
                    )
    }, [selectedRoomCount])


    useEffect(()=>{
        setBedCount(bed => bed.map(
                                bedCountItem => {
                                    const hasSelectedItem = selectedBedCount.find(i=> bedCountItem['name']===i['name'])
                                    if(hasSelectedItem)
                                        return {...bedCountItem, count: hasSelectedItem['count'] }
                                        // return hasSelectedItem
                                    else return bedCountItem
                                    } 
                                ) 
                    )
    }, [selectedBedCount])

    useEffect(()=>{
        setGuestCount(guest => guest.map(
                                guestItem => {
                                    const hasSelectedItem = selectedGuestCount.find(i=> guestItem['type']===i['type'])
                                    if(hasSelectedItem)
                                        return {...guestItem, count: hasSelectedItem['count'] }
                                        // return hasSelectedItem
                                    else return guestItem
                                    } 
                                ) 
                    )
    }, [selectedGuestCount])


                                                
    const router = useRouter()
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
    
        //   if(response){
        //     console.log(response.json)
        //   }
      }
    function onContinueBtnClickHandlar(e) {
        e.preventDefault()
 
        const nonZeroRoomCount = roomCount.filter(i=>i['count']>0)
        const nonZeroBedCount = bedCount.filter(i=>i['count']>0)
        const nonZeroGuestCount = guestCount.filter(i=>i['count']>0)

        dispatch({type:'addProperty/roomCount', data: nonZeroRoomCount})
        dispatch({type:'addProperty/bedCount', data: nonZeroBedCount})
        dispatch({type:'addProperty/guestCount', data: nonZeroGuestCount})

                updateProperty({propertyId, 
                data:{
                    roomCount:nonZeroRoomCount,
                    bedCount: nonZeroBedCount,
                    guestCount:nonZeroGuestCount,
                    sessionStatus: 'amenities'
                }})
        router.push('/add-listing/amenities')
    }
    // function onContinueBtnClick() {
        
        
        


    //     nextPage()
    // }

    function onRoomCountIncrement(roomName){
        const othersRooms = roomCount.filter(i=> i['name'] !== roomName)
        const room = roomCount.find(i=>i['name']===roomName)
        setRoomCount([...othersRooms, {...room, count: room['count'] + 1}])
    }
    function onRoomCountDecrement(roomName){
        const othersRooms = roomCount.filter(i=> i['name'] !== roomName)
        const room = roomCount.find(i=>i['name']===roomName)
        if(room['count']>0)
            setRoomCount([...othersRooms, {...room, count: room['count'] - 1}])
    }
    function onBedCountIncrement(bedName){
        const othersBeds = bedCount.filter(i=> i['name'] !== bedName)
        const bed = bedCount.find(i=>i['name']===bedName)
        setBedCount([...othersBeds, {...bed, count: bed['count'] + 1}])
    }
    function onBedCountDecrement(bedName){
        const othersBeds = bedCount.filter(i=> i['name'] !== bedName)
        const bed = bedCount.find(i=>i['name']===bedName)
        if(bed['count']>0)
            setBedCount([...othersBeds, {...bed, count: bed['count'] - 1}])
    }

    function onGuestCountIncrement(guestType){
        const othersGuests = guestCount.filter(i=> i['type'] !== guestType)
        const guest = guestCount.find(i=>i['type']===guestType)

        if(guestType === 'under 14' &&  guestCount.find(i=>i['type']==='Adult')['count'] === 0 ){
            const adultGuest = guestCount.find(i=>i['type']==='Adult')
            setGuestCount([
                {...adultGuest, count: adultGuest['count'] + 1},
                {...guest, count: guest['count'] + 1}
            ])
        }else{
            setGuestCount([...othersGuests, {...guest, count: guest['count'] + 1}])
        }


        // const othersGuests = guestCount.filter(i=> i['type'] !== guestType)
        // const guest = guestCount.find(i=>i['type']===guestType)
    }
    function onGuestCountDecrement(guestType){
        const under_14_guest = guestCount.find(i=>i['type']==='under 14')
        const othersGuests = guestCount.filter(i=> i['type'] !== guestType)
        const guest = guestCount.find(i=>i['type']===guestType)

        if(guestType=== 'Adult' && under_14_guest['count'] > 0){
            if(guest['count']> 1 )
                setGuestCount([...othersGuests, {...guest, count: guest['count'] - 1}])
        }else{
            if(guest['count']>0)
                setGuestCount([...othersGuests, {...guest, count: guest['count'] - 1}])
        }  
    }

    function moveToPreviousPage() {
        router.push('/add-listing/location-confirmation')
      }
    function moveToNextPage() {
        router.push('/add-listing/amenities')
    }
    

  return (
    <div className='w-100 h-max-content absolute-h-center top-0 max-width-1280'>
        <div className='max-w-600px mr-l-auto mr-r-auto p-btm-80px'>
            <div className=''>
                <Heading txt='Accommodation Details'/>
                <div className='w-100 '>
                    <div>
                        <h2 className='clr-neutral-600 fs-600 radius-8 fs-600 fw-regular-dark'>Total Room</h2>
                        <div className='box-shadow-300 mr-top-16px p-top-8px p-btm-8px'>
                            {
                                roomCount
                                    .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                                    .map(i=>(
                                        <div key={i['id']} className='flex align-center space-between p-10px-24px position-relative item-underline'>
                                            <div>{i['name']}</div>
                                            <div className='flex'>
                                                <button onClick={ ()=> onRoomCountDecrement(i['name'])} className='no-border no-background cursor-pointer'>
                                                    <LucidIcon name='minus' size={24} />
                                                </button>
                                                <div className='fs-650 w-84px txt-align-center'>{i['count']}</div>
                                                <button onClick={ ()=> onRoomCountIncrement(i['name'])} className='no-border no-background cursor-pointer'>
                                                    <LucidIcon name='plus' size={24}/>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                            }
                            
                        </div>
                        {/* <button className='flex gap-8px flex-align-center mr-top-16px no-background no-outline border-btm-500'>
                            <LucidIcon className='opacity-0_70' name='plus' size={24}/>  
                                add more option
                        </button> */}
                    </div>
                    <div className='mr-top-40px'>
                        <h2 className='clr-neutral-600 fs-600 radius-8 fs-600 fw-regular-dark'>Total Bed</h2>
                        <div className='box-shadow-300 mr-top-16px p-top-8px p-btm-8px'>
                            {
                                bedCount
                                .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                                .map(i=>(
                                    <div key={i['id']} className='flex align-center space-between p-10px-24px position-relative item-underline'>
                                        <div>{i['name']}</div>
                                        <div className='flex'>
                                            <button onClick={()=>onBedCountDecrement(i['name'])} className='no-border no-background cursor-pointer'>
                                                <LucidIcon name='minus' size={24}/>
                                            </button>
                                            <div className='fs-650 w-84px txt-align-center'>{i['count']}</div>
                                            <button onClick={()=>onBedCountIncrement(i['name'])} className='no-border no-background cursor-pointer'>
                                                <LucidIcon name='plus' size={24}/>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }                            
                        </div>
                        {/* <button className='flex gap-8px flex-align-center mr-top-16px no-background border-btm-500'> 
                            <LucidIcon name='plus' size={24}/> 
                            add more option
                        </button> */}
                    </div>

                    <div className='mr-top-40px'>
                        <h2 className='clr-neutral-600 fs-600 radius-8 fs-600 fw-regular-dark'>Total Guest</h2>
                        <div className='box-shadow-300 mr-top-16px p-top-8px p-btm-8px'>
                            {
                                guestCount
                                    .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                                    .map(i=>(
                                    <div key={i['id']} className='flex align-center space-between p-10px-24px position-relative item-underline'>
                                        <div>{i['type']}</div>
                                        <div className='flex'>
                                            <button onClick={()=>onGuestCountDecrement(i['type'])} className='no-border no-background cursor-pointer'>
                                                <LucidIcon name='minus' size={24}/>
                                            </button>
                                            <div className='fs-650 w-84px txt-align-center'>{i['count']}</div>
                                            <button onClick={()=>onGuestCountIncrement(i['type'])} className='no-border no-background cursor-pointer'>
                                                <LucidIcon className='opacity-0_70' name='plus' size={24}/>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }                            
                        </div>
                    </div>
                </div>


            </div>
            
            <SwitchBtn nextPage={onContinueBtnClickHandlar} previousPage={moveToPreviousPage}/>
        </div>
    </div>
  )
}
