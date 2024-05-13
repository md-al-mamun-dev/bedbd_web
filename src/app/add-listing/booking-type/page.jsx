'use client'
import { useState } from 'react'
import styles from './index.module.css'
import LucidIcon from '@/components/LucidIcon'
import SwitchBtn from '../SwitchBtn'
import BookingTypeItem from './BookingTypeItem'
// import BookingType from './BookingTypeItem'
// import AddBookingType from './AddBookingType'
import usePropertyDispatch from '@/context/property/usePropertyDispatch'
import Heading from '../Heading'
// import usePropertyBookingType from '@/hooks/usePropertyBookingTypes____'
import useProperty from '@/context/property/useProperty'
import { useRouter } from 'next/navigation'
import AddPropertyParameterModal from '../AddPropertyParameterModal'
import usePropertyBookingTypes from '@/hooks/usePropertyBookingTypes'
import useAddPropertySessionDispatch from '@/context/addListing/useAddPropertySessionDispatch'
import useAddPropertySession from '@/context/addListing/useAddPropertySession'
import useToken from '@/context/account/useToken'
import usePropertyListingSession from '@/context/addListing/usePropertyListingSessions'

export default function BookingType() {
    const [addBookingTypModalOpen, setAddBookingTypModalOpen] = useState(false)
    // const {isLoading, propertyBookingTypes } = usePropertyBookingType()
    // const { selectedBookingTypes, customBookingTypes } = useProperty()
    const propertyListingData =  usePropertyListingSession()
    const {isLoading:isTokenLoading,
        isSet,
        token} = useToken()


    const { activeSession:{id:propertyId, _propertyBookingTypes:selectedPropertyBookingTypes, customPropertyBookingTypes },}  = useAddPropertySession()


    const {isLoading:isPropertyBookingTypeLoading, propertyBookingTypes} = usePropertyBookingTypes()
    const dispatch = useAddPropertySessionDispatch()
    const router = useRouter()
    function toggleSelectedBookingType(id) {
        selectedPropertyBookingTypes.includes(id)
            ? dispatch({type:'addProperty/declinePropertyBookingType', data: id})
            : dispatch({type:'addProperty/selectPropertyBookingType', data: id})
    }
    function toggleSelectedCustomPropertyBookingType(id) {
        dispatch({type:'addProperty/toggleCustomPropertyBookingType', data: id})
    }
    function moveToPreviousPage() {
        router.push('/add-listing/property-state')
      }
    function moveToNextPage() {
        router.push('/add-listing/property-details')
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
        const selectedCustomPropertyBookingTypes = customPropertyBookingTypes.filter(i=> i['isSelected'])

        if(selectedCustomPropertyBookingTypes.length>0)
            updateProperty({propertyId, 
                data:{  
                         _propertyBookingTypes: selectedPropertyBookingTypes,
                    customPropertyBookingTypes: selectedCustomPropertyBookingTypes,
                                 sessionStatus: 'property-details' 
                }})
        else{
            updateProperty({propertyId, 
                data:{
                         _propertyBookingTypes: selectedPropertyBookingTypes,
                    customPropertyBookingTypes: [],
                                 sessionStatus: 'property-details' 
                        }
                    })
        }
        
        // console.log(e)

        // updateProperty({propertyId, data:{propertyType: activeSession['propertyType'], sessionStatus: 'view-property-type' }})
        router.push('/add-listing/property-details')
    }
    return (
        <>
            <div className='w-100 absolute-center max-width-1280 '>
                <Heading txt='Booking Type'/>
                
                {/* <h3 className={`${styles.heading}`}>Booking Type</h3> */}
    
                <div className={`${styles.scope_input} mr-l-auto mr-r-auto`}>
                    <h3 className={`${styles.scope_info_question}`}>What can guests book?</h3>
    
                    <div className={`${styles.socps}`}>
                        {
                            propertyBookingTypes.map(item=><BookingTypeItem data={item} isChecked={selectedPropertyBookingTypes.includes(item['id'])} toggleSelection={()=>toggleSelectedBookingType(item['id'])}/>)
                        }{
                            customPropertyBookingTypes.length > 0 
                                && customPropertyBookingTypes.map(i=><BookingTypeItem data={i} isChecked={i['isSelected']} toggleSelection={()=>toggleSelectedCustomPropertyBookingType(i['id'])}/>)
                        }
                    </div>
    
                    <button className={`clr-neutral-500 flex flex-align-center border-btm-500 bg-transparent cursor-pointer gap-8px fs-400 fw-regular mr-top-14px mr-btm-40px position-relative`} onClick={()=>setAddBookingTypModalOpen(true)}> 
                        <LucidIcon name={'plus'} className={` opacity-0_70 `} size={24} />
                        {/* left-16px position-absolute top-50 translateY-50 */}
                        Add more option
                    </button>
    
                    <SwitchBtn previousPage={moveToPreviousPage} nextPage={onContinueBtnClickHandlar}/>
                </div>
            </div>
            { 
                    addBookingTypModalOpen 
                &&  <AddPropertyParameterModal 
                        title='Add a new Booking Type'
                        closeModal={()=>setAddBookingTypModalOpen(false)} 
                        addType= 'addProperty/addCustomPropertyBookingType'
                        selectType= 'property/selectBookingType'
                        />}
            {/* { addBookingTypModalOpen && <AddBookingType data={propertyBookingTypes} closeModal={()=>setAddBookingTypModalOpen(false)} />} */}
        </>    
      )
}

// function SelectBookingType({data, previousPage, nextPage}) {
//     const [addBookingTypModalOpen, setAddBookingTypModalOpen] = useState(false)
//     const dispatch = usePropertyDispatch()
//     const { isLoading, propertyBookingTypes } = usePropertyBookingType()
//     const { selectedBookingType } = data

//     function toggleSelectedBookingType(id) {
//         selectedBookingType.includes(id)
//             ? dispatch({type:'property/removeSelectedBookingType', data: id})
//             : dispatch({type:'property/addSelectedBookingType', data: id})
//     }

//     function moveToPreviousPage() {
//         router.push('/add-listing/view-property-type')
//       }
//     function moveToNextPage() {
//         router.push('/add-listing/property-condition')
//     }
//     // const [bookingTypes, setBookingTypes] = useState([{ id:0,
//     //                                                     title:'Entire place',
//     //                                                     description:'Guests have access to the entire place and don’t have to share it with the host or other guests.'
//     //                                                 },{ id:1,
//     //                                                     title:'A private room',
//     //                                                     description:'Guests can book a room within the property. There are common areas that are shared with either the host or other guests.' }])
                                                        
//     // const [selectedTypes, setSelectedTypes] = useState([])                                                        

//     // function addBookingType(title, description) {
//     //     const maxId = Math.max(...bookingTypes.map(item => item.id));
//     //     setSelectedTypes([...selectedTypes, title])
//     //     setBookingTypes([...bookingTypes, {id:(maxId+1), title, description}])
//     // }
    
//     function toggleSelectedBookingType(id) {
//         selectedBookingType.includes(id)
//             ? dispatch({type:'property/removeSelectedBookingType', data: id})
//             : dispatch({type:'property/addSelectedBookingType', data: id})
//     }

//     function onContinueBtnClick() {
//         nextPage()
//     }


  
// }

