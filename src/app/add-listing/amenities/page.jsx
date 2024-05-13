'use client'
import React, { useEffect, useState } from 'react'
import Heading from '../Heading'
import SwitchBtn from '../SwitchBtn'
import LucidIcon from '@/components/LucidIcon'
import usePropertyDispatch from '@/context/property/usePropertyDispatch'
import conventionToNormalText from '@/components/Utility/conventionToNormalText'
import { Square, CheckSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useAmenities from '@/hooks/useAmenities'
import useProperty from '@/context/property/useProperty'
import usePropertyAmenities from '@/hooks/usePropertyAmenities'
import useAddPropertySession from '@/context/addListing/useAddPropertySession'
import useAddPropertySessionDispatch from '@/context/addListing/useAddPropertySessionDispatch'
import useToken from '@/context/account/useToken'
import usePropertyListingSession from '@/context/addListing/usePropertyListingSessions'


export default function Amenities() {
  const [amenities, setAmenities] =useState({})
  const {isLoading: isTokenLoading,
          isSet,
          token} = useToken()
  const data = usePropertyListingSession()
//   const {isLoading:, amenities} = useAmenities()

  // const { isLoading, amenities:amenitiesData } = useAmenities()
  const { isLoading, amenities:amenitiesData } = usePropertyAmenities()

  const { activeSession: {id:propertyId, _amenities:selectedAmenities}} = useAddPropertySession()
  console.log(selectedAmenities)

  // const { selectedAmenities }  = useProperty()

  // const {amenities:amenitiesData} = data  
  const dispatch = useAddPropertySessionDispatch()
  const router = useRouter()

useEffect(()=>{
  let ignore = false;
  if(!isLoading && !ignore){
    setAmenities(()=>amenitiesData.reduce((result, item) => {
        const { category, ...rest } = item;
        result[category] = result[category] || [];
        result[category].push(rest);
        return result;
    }, {}))
  }  
}, [amenitiesData])
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



  function toggleAmenitiesSelection(id) {
    // addProperty/toggleAminitySelect
    dispatch({type:'addProperty/toggleAminitySelect', data: id})    
  }
  function moveToPreviousPage() {
    router.push('/add-listing/accommodation-details')
  }
  function moveToNextPage() {
      router.push('/add-listing/home-rules')
  }
  function onContinueBtnClickHandlar(e) {
    e.preventDefault()
    


    updateProperty({propertyId, 
        data:{
          _amenities: selectedAmenities,
          sessionStatus: 'home-rules'
        }})
    moveToNextPage()
    // router.push('/add-listing/accommodation-details')
}

  return (
    <div className='w-100 h-max-content absolute-h-center top-0 max-width-1280'>
        <div className='max-w-814px mr-l-auto mr-r-auto p-btm-80px'>
        <Heading txt='Amenities'/>
            <div className='w-100 grid grid-temp-col-2 gap-40px '>
              {

                isLoading
                  ? <div>Loading...</div>
                  : Object.keys(amenities).map( itemKey =>{
                      const catagory = conventionToNormalText(itemKey)
                      return (<div className=' w-fit-content '>
                      <h3 className='clr-neutral-600 fs-600 fw-regular-dark'>{catagory}</h3>
                      <div className='grid gap-16px mr-top-12px'>
                        {
                          amenities[itemKey].map(item => {
                              const isSelected  = selectedAmenities.includes(item['id'])
                                return (<button 
                                          onClick={()=>toggleAmenitiesSelection(item['id'])}
                                          className='no-border bg-transparent no-outline flex flex-align-center gap-8px cursor-pointer'>
                                          <div className='min-w-24px'>
                                            {
                                              isSelected
                                                ? <CheckSquare className='opacity-0_70 ' size={24}/>
                                                : <Square className='opacity-0_70 ' size={24}/>
                                            }
                                            {/* <LucidIcon className='opacity-0_70 ' name={isSelected ? 'check-square' : 'square'} size={24}/> */}
                                          </div>
                                          {item['title']}
                                        </button>)})
                        }                    
                      </div>
                    </div>)
                    } )
              }

            </div>            
            <SwitchBtn nextPage={onContinueBtnClickHandlar} previousPage={moveToPreviousPage}/>
        </div>
    </div>
  )
}
