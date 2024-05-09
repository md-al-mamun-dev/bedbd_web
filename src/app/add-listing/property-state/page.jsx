'use client'
import { useEffect, useState } from 'react'
import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'
import PropertyCondition from './PropertyCondition'
import AddPropertyParameterModal from '../AddPropertyParameterModal'
import usePropertyDispatch from '@/context/property/usePropertyDispatch'
import usePropertyConditions from '@/hooks/usePropertyConditions'
import useProperty from '@/context/property/useProperty'
import Heading from '../Heading'
import SwitchBtn from '../SwitchBtn'
import { useRouter } from 'next/navigation'
import usePropertyStates from '@/hooks/usePropertyState'
import useAddPropertySession from '@/context/addListing/useAddPropertySession'
// import usePropertyState from '@/hooks/usePropertyState'
import useAddPropertySessionDispatch from '@/context/addListing/useAddPropertySessionDispatch'
import usePropertyListingSession from '@/context/addListing/usePropertyListingSessions'
import useToken from '@/context/account/useToken'

export default function PropertyState() {
    const [addPropertyConditionModalOpen, setAddPropertyConditionModalOpen] = useState(false)

    // const {isLoading, popertyConditions } = usePropertyConditions()
    // const { selectedConditions, customConditions } = useProperty()

    const propertyListingData =  usePropertyListingSession()


    const {isLoading:isPropertyStateLoading, propertyStates} = usePropertyStates()

    const { activeSession:{id:propertyId, propertyStates:selectedPropertyStates, customPropertyStates },}  = useAddPropertySession()
    // const { activeSession:{id:propertyId, propertyStates:selectedPropertyStates, customPropertyStates},}  = useAddPropertySession()
    // const { activeSession:{id:propertyId, propertyStates:selectedPropertyStates, customPropertyStates},}  = useAddPropertySession()
    const {isLoading:isTokenLoading,
        isSet,
        token} = useToken()

    const dispatch = useAddPropertySessionDispatch()
    const router = useRouter()

    console.log(propertyId)

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
        const selectedCustomPropertyState = customPropertyStates.filter(i=> i['isSelected'])

        if(selectedCustomPropertyState.length>0)
            updateProperty({propertyId, 
                data:{  
                          propertyStates: selectedPropertyStates,
                    customPropertyStates: selectedCustomPropertyState,
                    sessionStatus: 'booking-type' 
                }})
        else{
            updateProperty({propertyId, 
                data:{
                          propertyStates: selectedPropertyStates,
                          customPropertyStates:[],
                           sessionStatus: 'booking-type' 
                        }
                    })
        }
        
        // console.log(e)

        // updateProperty({propertyId, data:{propertyType: activeSession['propertyType'], sessionStatus: 'view-property-type' }})
        router.push('/add-listing/booking-type')
    }


    function toggleSelectedPropertyCondition(id) {
        selectedPropertyStates.includes(id)
            ? dispatch({type:'addProperty/declinePropertyState', data: id})
            : dispatch({type:'addProperty/selectPropertyState', data: id})
    }

    function toggleSelectedCustomPropertyState(id) {
        dispatch({type:'addProperty/toggleCustomPropertyStateSelection', data: id})
    }

    function moveToPreviousPage() {
        router.push('/add-listing/view-property-type')
      }
    function moveToNextPage() {
        router.push('/add-listing/booking-type')

        
    }



    useEffect(()=>{
        console.log(selectedPropertyStates)
    }, [selectedPropertyStates])
    return (
        <>
            <div className='w-100 absolute-center max-width-1280 '>
                <Heading txt='Property State'/>
                
    
                <div className={`${styles.scope_input} mr-l-auto mr-r-auto`}>
                    <h3 className={`${styles.scope_info_question}`}>What is your property condition?</h3>
    
                    <div className={`${styles.socps}`}>
                        {
                            isPropertyStateLoading 
                            ? <div> Loading...</div>
                            : propertyStates.length > 0
                                && propertyStates.map(i=><PropertyCondition data={i} isChecked={selectedPropertyStates.includes(i['id'])} toggleSelection={()=>toggleSelectedPropertyCondition(i['id'])}/>)
                        }
                        {
                                customPropertyStates.length > 0 
                                && customPropertyStates.map(i=><PropertyCondition data={i} isChecked={i['isSelected']} toggleSelection={()=>toggleSelectedCustomPropertyState(i['id'])}/>)
                        }
                    </div>
    
                    <button className={`clr-neutral-500 flex flex-align-center border-btm-500 bg-transparent cursor-pointer gap-8px fs-400 fw-regular mr-top-14px mr-btm-40px position-relative`} onClick={()=>setAddPropertyConditionModalOpen(true)}> 
                        <LucidIcon name={'plus'} className={` opacity-0_70 `} size={24} />
                        {/* left-16px position-absolute top-50 translateY-50 */}
                        Add more option
                    </button>
                    {/* previousPage={previousPage} nextPage={onContinueBtnClick} */}
                    <SwitchBtn previousPage={moveToPreviousPage} nextPage={onContinueBtnClickHandlar} />
                </div>
            </div>
    
            { 
                addPropertyConditionModalOpen 
                &&  <AddPropertyParameterModal 
                        title='Add a new Property State'
                        closeModal={()=>setAddPropertyConditionModalOpen(false)} 
                        addType= 'addProperty/addCustomPropertyState'
                        selectType= 'property/selectPropertyCondition'
                        />
            }
        </>    
      )
}


