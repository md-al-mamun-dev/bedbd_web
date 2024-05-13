'use client'
import styles from './index.module.css'
import Image from 'next/image'
import usePropertyTypes from '@/hooks/usePropertyTypes'
import { useRouter } from 'next/navigation'
import useToken from '@/context/account/useToken'
import usePropertyListingSession from '@/context/addListing/usePropertyListingSessions'


import useAddPropertySessionDispatch from '@/context/addListing/useAddPropertySessionDispatch'


import useAddPropertySession from '@/context/addListing/useAddPropertySession'
import useProperty from '@/context/property/useProperty'


import Heading from '../Heading'


export default function PropertyType() {
    const data = usePropertyListingSession()

    const { isLoading, propertyTypes } = usePropertyTypes()
    
    const {isLoading:isTokenLoading,
            isSet,
            token,} = useToken()


    // const propertyData  = useProperty()
    const dispatch = useAddPropertySessionDispatch()

    const { activeSession:{id:propertyId, _propertyType:propertyType},}  = useAddPropertySession()


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

          if(response){
            console.log(response.json)
          }
      }

 
    function onPropertyTypeClickHandlar(propertyTypeId) {
        dispatch({type:'addProperty/selectPropetyType', data: propertyTypeId})
        
    }

    function onContinueBtnClickHandlar(e) {
        e.preventDefault()
        console.log(e)

        updateProperty({
            propertyId, 
            data:{ 
                _propertyType: propertyType, 
                sessionStatus: 'view-property-type' 
            }})
        router.push('/add-listing/view-property-type')
    }

  return (
    <div className=' w-100 position-absolute top-0 left-50 translateX-50 p-btm-80px max-width-1280 p-l-r-127px'>
        <Heading txt='Basic Information'/>
        {/* <h3 className=' clr-primary-400 txt-align-center fw-regular-dark fs-875'>Basic Information</h3> */}
        <p className={`${styles.sub_heading} mr-btm-64px clr-neutral-500`}>List your property on bedbd.com and welcoming guests in a matter of moments!</p>

        <div className={`${styles.listing_type} clr-neutral-600`}>
            <p className={`${styles.instruction_info} `}>To begin, choose the type of property you'd like to list on bedbd.com</p>
            <div className={`${styles.listing_type_items}`}>
                {
                    isLoading 
                        ? <div>Loading...</div>
                        :  propertyTypes.map(type=>{
                                        console.log(propertyType==type['id'])
                                        console.log(propertyType )
                                        console.log(type['id'])

                                        return    <div key={type['id']} className={`${styles.listing_type_item}  ${propertyType==type['id'] ? 'outline-secondary-400 border-transparent-1px scale-0003': 'outline-transparent-2px border-neutral-100'  } `} onClick={()=> onPropertyTypeClickHandlar(type['id'])}>                                                    
                                                <div className={`${styles.item_icon_wrapper}`}>
                                                    <Image src={`/icons/${type.icon}`} fill />
                                                </div>
                                                <h4 className={`${styles.listing_type_name}`}>{type['typeName']}</h4>
                                            </div>})
                }
            </div>
            <button 
                onClick={onContinueBtnClickHandlar} 
                className={` ${ propertyType.length === 0 
                                    ? 'btn-disable'
                                    : 'btn-primary'}  w-100 max-w-386 relative-horizontal-center`}>
                Continue
            </button>                
        </div>

        </div>
  )
}

