'use client'
import styles from './index.module.css'
import { Square, CheckSquare, Plus, ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import SwitchBtn from '../SwitchBtn'
import useProperty from '@/context/property/useProperty'
import useData from '@/context/data/useData'
import usePropertyTypes from '@/hooks/usePropertyTypes'
import Heading from '../Heading'
import { useRouter } from 'next/navigation'
import useAddPropertySession from '@/context/addListing/useAddPropertySession'
import usePropertyListingSession from '@/context/addListing/usePropertyListingSessions'



export default function ViewPropertyType() {

  // const dispatch = useAddPropertySessionDispatch()

  const { activeSession:{id:propertyId, propertyType},}  = useAddPropertySession()
  const propertyListingData = usePropertyListingSession()

  const router = useRouter()
  // const { selectedPropertyType } = useProperty()

  function moveToPreviousPage() {
    router.push('/add-listing/property-type')
  }
  function moveToNextPage() {
    router.push('/add-listing/property-state')
  }


  if(propertyType === '' || propertyType.length < 1){
    moveToPreviousPage()
  }
    const { isLoading, propertyTypes} = usePropertyTypes()
    const selectedProperty = propertyTypes.find(i=>i['id']===propertyType)
    return (

      propertyType === '' 
      ? <div>wait ...</div>
      : <div className=' w-100 absolute-center max-width-1280'>
          <Heading txt={`You're Listing`} />
          {/* <h3 className={`${styles.heading}`}>You're Listing</h3> */}
          

          <div className={`${styles.icon_wrapper}`}>          
              <Image src={`/icons/${selectedProperty['icon']}`} fill/>
          </div>


          <p className={`fs-regular fw-regular-dark clr-neutral-400 line-height-24px max-w-540 mr-l-auto mr-r-auto mr-t-b-32px txt-align-center`}>
              {
                selectedProperty['typeDescription']
                    ? selectedProperty['typeDescription']
                    : selectedProperty['typeName']
              }
          </p>
          <h4 className='fs-600 fw-semi-bold clr-neutral-600 w-fit-content mr-l-auto mr-r-auto mr-btm-24px mr-t-24px' >Sounds good?</h4>
          <SwitchBtn previousPage={moveToPreviousPage} nextPage={moveToNextPage}/>
      </div>
)
  

  
}