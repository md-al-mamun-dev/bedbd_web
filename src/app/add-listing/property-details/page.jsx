'use client'
import usePropertyFeatures from '@/hooks/usePropertyFeatures'
import {  useState } from 'react'
import PropertyFeature from './PropertyFeature'
import SwitchBtn from '../SwitchBtn'
import usePropertyDispatch from '@/context/property/usePropertyDispatch'
import Heading from '../Heading'
import useProperty from '@/context/property/useProperty'
import LucidIcon from '@/components/LucidIcon'
import AddPropertyParameterModal from '../AddPropertyParameterModal'
import { useRouter } from 'next/navigation'
import useAddPropertySession from '@/context/addListing/useAddPropertySession'
import useToken from '@/context/account/useToken'
import useAddPropertySessionDispatch from '@/context/addListing/useAddPropertySessionDispatch'
import usePropertyListingSession from '@/context/addListing/usePropertyListingSessions'

export default function PropertyDetails({data, nextPage, previousPage}) {
    const [addPropertyFeatureModalOpen, setAddPropertyFeatureModalOpen] = useState(false)
    const propertyListingData =  usePropertyListingSession()
    const {isLoading:isTokenLoading,
        isSet,
        token} = useToken()
    const { isLoading, propertyFeatures } = usePropertyFeatures()
    // const { selectedPropertyFeatures, customPropertyFeatures } = useProperty()   

    const { activeSession:{id:propertyId, title, description, propertyFeatures:selectedPropertyFeatures, customPropertyFeatures }}  = useAddPropertySession()

    const [propertyTitle, setPropertyTitle]=useState(title)
    const [propertyDescription, setPropertyDescription] = useState(description)

    const router = useRouter()
    const dispatch = useAddPropertySessionDispatch()

    // useEffect(()=>{
    //     let ignore = false 
    //     if(!ignore && !isLoading  )
    //         console.log(property)
    //     return ()=> ignore = true
    // }, [])


    function togglePropertyFeatures(id) {        
        selectedPropertyFeatures.includes(id)
            ? dispatch({ type:'addProperty/declinePropertyFeature', data: id })
            : dispatch({ type:'addProperty/selectPropertyFeature',    data: id })
    }
    function toggleCustomPropertyFeatures(id) {
        dispatch({type:'addProperty/toggleCustomPropertyFeatures', data: id})
    }

    
    function moveToPreviousPage() {
        router.push('/add-listing/booking-type')
    }
    function moveToNextPage() {
        router.push('/add-listing/location')
    }
    // function addPropertyFeature(title, description) {
        
    // }
    function onContinueBtnClick() {
        dispatch({ type:'property/title',            data: propertyTitle       })
        dispatch({ type:'property/description',      data: propertyDescription })
        moveToNextPage()
        // console.log(data)
    }
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
        dispatch({ type:'addProperty/title',            data: propertyTitle       })
        dispatch({ type:'addProperty/description',      data: propertyDescription })

        const selectedCustomPropertyFeatures = customPropertyFeatures.filter(i=> i['isSelected'])

        if(selectedCustomPropertyFeatures.length>0)
            updateProperty({propertyId, 
                data:{      
                            title: propertyTitle,
                      description: propertyDescription,
                 propertyFeatures: selectedPropertyFeatures,
           customPropertyFeatures: selectedCustomPropertyFeatures,
                    sessionStatus: 'property-location' 
                }})
        else{
            updateProperty({propertyId, 
                data:{
                          title: propertyTitle,
                    description: propertyDescription,
               propertyFeatures: selectedPropertyFeatures,
         customPropertyFeatures: [],
                  sessionStatus: 'property-location' 
                        }
                    })
        }
        
        // console.log(e)

        // updateProperty({propertyId, data:{propertyType: activeSession['propertyType'], sessionStatus: 'view-property-type' }})
        router.push('/add-listing/property-location')
    }

    // if(!isLoading)
    //     console.log(propertyFeatures)


    // const [propertyFeatures, setPropertyFeatures] = useState([{ id:0,
    //                                                             title:'Shared Bathroom',
    //                                                             description:'Guests have access to the entire place and don’t have to share it with the host or other guests.'
    //                                                         },{ id:1,
    //                                                             title:'Beach View',
    //                                                             description:'Guests can book a room within the property. There are common areas that are shared with either the host or other guests.' }])


  return (

    <>
        <div className='w-100 h-max-content absolute-h-center top-0 max-width-1280'>
            <Heading txt='Property Details'/>
            <div className='max-w-600px mr-l-auto mr-r-auto p-btm-80px '>
                <div className=' mr-btm-36px'>
                    <div className='w-100'>
                        <label className='w-100 fs-600 fw-regular-dark'>Property Title</label>
                        <input 
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            type='text' placeholder="pls give a title"
                            value={propertyTitle}
                            onChange={e=>setPropertyTitle(e.target.value)}/>
                        <div className='fs-200 p-l-24 mr-t-6px'>Choose a catchy title in 40 characters</div>
                    </div>
                </div>
                

                <div className='mr-btm-40px'>
                    <div className='w-100 fs-600 fw-regular-dark '>Property Features</div>
                    <p className='fw-regular fs-200 clr-neutral-500'>Lorem ipsum dolor sit amet consectetur. Gravida faucibus massa dignissim malesuada felis.</p>
                    {
                        isLoading
                            ? <div>Loading...</div>
                            : propertyFeatures.map( item => <PropertyFeature
                                                            data={item}
                                                            isChecked={selectedPropertyFeatures.includes(item['id'])} 
                                                            toggleSelection={()=>togglePropertyFeatures(item['id'])} />)
                    }
                    {
                        customPropertyFeatures.length > 0 
                        &&  customPropertyFeatures.map( item => <PropertyFeature
                                                            data={item}
                                                            isChecked={item['isSelected']} 
                                                            toggleSelection={()=>toggleCustomPropertyFeatures(item['id'])} />)
                    }

                    {/* <button className=' w-100 clr-primary-400 mr-top-24px txt-align-center no-border no-background cursor-pointer'>Show All </button> */}
                    {/* <div className=''>
                        <input className='w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8' type='text' placeholder="pls give a title "/>
                        <div className='fs-200 p-l-24 mr-t-6px'>Choose a catchy title in 40 characters</div>
                    </div> */}
                </div>

                <button className={`clr-neutral-500 flex flex-align-center border-btm-500 bg-transparent cursor-pointer gap-8px fs-400 fw-regular mr-top-14px mr-btm-40px position-relative`} onClick={()=>setAddPropertyFeatureModalOpen(true)}> 
                    <LucidIcon name={'plus'} className={` opacity-0_70 `} size={24} />
                    {/* left-16px position-absolute top-50 translateY-50 */}
                    Add more option
                </button>
                <div className='mr-btm-40px'>
                    <h3 className='fw-regular-dark fs-600 clr-neutral-600'>Property Description</h3>
                    <textarea 
                        className='w-100 min-h-120px p-16px-24px radius-8 border-neutral-300' 
                        placeholder='description is optional '
                        value={propertyDescription}
                        onChange={e=>setPropertyDescription(e.target.value)}/>
                </div>
                <SwitchBtn nextPage={onContinueBtnClickHandlar} previousPage={moveToPreviousPage}/>
            </div>        
        </div>
        { 
                addPropertyFeatureModalOpen 
                &&  <AddPropertyParameterModal 
                        title='Add a new Property Features'
                        closeModal={()=>setAddPropertyFeatureModalOpen(false)} 
                        addType= 'addProperty/addCustomPropertyFeatures'
                        // selectType= 'property/selectPropertyFeature'
                    />
            }
        {/* { addPropertyFeatureModalOpen 
            && <AddPropertyFeature 
                    closeModal={()=>setAddPropertyFeatureModalOpen(false)}/>} */}
        
    </>
   
  )
}
