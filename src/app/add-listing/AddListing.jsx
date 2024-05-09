'use client'
import styles from './page.module.css'
import Image from 'next/image'
import ListingType from './ListingType'
import Scope from './SelectBookingType'
import SelectBookingType from './SelectBookingType'
import ViewBasicInfo from './ViewBasicInfo'
import DescriptionInput from './DescriptionInput'
import LocationConfirmation from './LocationConfirmation'
import ImageUpload from './ImageUpload'
import SetRent from './SetRent'
import { useEffect, useState } from 'react'
import PropertyDetails from './PropertyDetails'
import PropertyLocation from './PropertyLocation'
import AccommodationDetails from './AccommodationDetails'
import HomeRules from './HomeRules'
import TermsConditions from './TermsConditions'
import Congrats from './Congrats'
import useProperty from '@/context/property/useProperty'
import Amenities from './AmenitiesSelection'
import useAccount from '@/context/account/useAccount'

import useAuthCheck from '@/hooks/useAuthCheck'
import useToken from '@/context/account/useToken'
import useLocalInfo from '@/hooks/useLocalInfo'
import useIpLocation from '@/hooks/useIpLocation'
import useUser from '@/context/account/useUser'
import { useRouter } from 'next/navigation'
import usePropertyListingSession from '@/context/addListing/usePropertyListingSessions'
// import useToken from '@/context/account/useToken'

export default function AddListing() {
  const user = useUser()

  const router = useRouter()
  const {isLoading,
    addPropertySessions} = usePropertyListingSession()
  console.log(addPropertySessions)

// const [pageState, setPageState] = useState('select-property-type')


useEffect(()=>{
  let ignore = false 
  if(!ignore && !isLoading && addPropertySessions.length === 1){
      router.push(process.env.NEXT_PUBLIC_HOME_URL+'/add-listing/'+addPropertySessions[0]['sessionStatus'])
  }
  return ()=> ignore = true
},[isLoading])

// const [pageState, setPageState] = useState('property-location')


// { ip, country, continent}


// const {isLoading:localDataLoading, localInfo:{ ip, country, continent}}  = useLocalInfo()
// const ipLoacation = useIpLocation()
// const {isLoading:ipLocationLoading, ipLocation:{  as,
//                                                   asn,
//                                                   city_name,
//                                                   country_code,
//                                                   country_name,
//                                                   ip:ipOfLocation,
//                                                   is_proxy,
//                                                   latitude,
//                                                   longitude,
//                                                   region_name,
//                                                   time_zone,
//                                                   zip_code  } } = useIpLocation()







// const property = useProperty()
const userData = useAccount()

// import useAccount from '@/context/account/useAccount'
// const useAccount = useAccount()



  return (
    
    <>
      <div className={` w-100 min-h-100vh relative`}>
      <div className=' w-100 relative-center max-width-1280'>
        {
          isLoading && <div>Loading....</div>
        }

        {/* { pageState === 'select-property-type' 
                      &&  <ListingType 
                            nextPage={()=>setPageState('property-type-confirmation')} />}

        { pageState === 'property-type-confirmation'
                      && <ViewBasicInfo 
                            data = {property}
                            previousPage={()=>setPageState('select-property-type')}  
                            nextPage={()=>setPageState('select-booking-type')}/>}

        { pageState === 'select-booking-type' 
                      && <SelectBookingType 
                            data = {property}
                            previousPage={()=>setPageState('property-type-confirmation')} 
                            nextPage={()=>setPageState('property-details')} />}

        { pageState === 'property-details'
                      && <PropertyDetails
                            data = {property}
                            nextPage={()=>setPageState('property-location')} 
                            previousPage={()=>setPageState('select-booking-type')} />
        }


        { pageState === 'property-location'
                      && <PropertyLocation
                          data={property}
                          nextPage={()=>setPageState('location-confirmation')} 
                          previousPage={()=>setPageState('property-details')} />
        }
        { pageState === 'location-confirmation'
                      && <LocationConfirmation 
                          data={property}
                          nextPage={()=>setPageState('accommodation-details')} 
                          previousPage={()=>setPageState('property-location')}/>
        }
        { pageState === 'accommodation-details'
                      && <AccommodationDetails 
                          nextPage={()=>setPageState('amenities')} 
                          previousPage={()=>setPageState('location-confirmation')}/>
        }   
        { pageState === 'amenities'
                      && <Amenities 
                          data={property} 
                          nextPage={()=>setPageState('home-rules')} 
                          previousPage={()=>setPageState('accommodation-details')} />
        }     

        { pageState === 'home-rules'
                      &&  <HomeRules 
                            data={property} 
                            nextPage={()=>setPageState('upload-image')} 
                            previousPage={()=>setPageState('amenities')}/>
        }
        {
          pageState === 'upload-image'
                      && <ImageUpload 
                          data={property}
                          nextPage={()=>setPageState('set-rent')} 
                          previousPage={()=>setPageState('home-rules')}/>

        }
        {
          pageState === 'set-rent'
                      && <SetRent 
                          data={property}
                          nextPage={()=>setPageState('availability')} 
                          previousPage={()=>setPageState('upload-image')}/>

        } */}
        {/* {
          pageState === 'availability'
                      && <Availability 
                          data={property}
                          nextPage={()=>setPageState('approving')} 
                          previousPage={()=>setPageState('set-rent')}/>

        } */}
        {/* { pageState === 'approving' 
                      && <Approving 
                          data={property}
                          nextPage={()=>setPageState('terms-conditions')} 
                          previousPage={()=>setPageState('availability')}/>
        } */}
        {/* {
          pageState === 'terms-conditions'
                      && <TermsConditions 
                          data={property}
                          userId={userData['$id']}
                          nextPage={()=>setPageState('congrats')} 
                          previousPage={()=>setPageState('approving')}/>
        }
          {
            pageState === 'congrats'
                      && <Congrats data={property}/> 
          } */}

      </div>        
    </div>
    </>    
  )
}
