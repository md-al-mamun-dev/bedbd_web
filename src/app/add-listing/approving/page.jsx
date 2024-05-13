'use client'
import SwitchBtn from "../SwitchBtn"
import { useState } from "react";
import LucidIcon from "@/components/LucidIcon";
import usePropertyDispatch from "@/context/property/usePropertyDispatch";
import { useRouter } from "next/navigation";
import { Circle, CircleCheckBig } from "lucide-react";
import usePropertyListingSession from "@/context/addListing/usePropertyListingSessions";
import useToken from "@/context/account/useToken";
import useAddPropertySessionDispatch from "@/context/addListing/useAddPropertySessionDispatch";
import useAddPropertySession from "@/context/addListing/useAddPropertySession";



export default function Approving() {
    const data = usePropertyListingSession()
    const {isLoading:isTokenLoading,
        isSet,
        token} = useToken()
    
        // const {activeSession: { id:propertyId, } } = useAddPropertySession()
    

    const dispatch = useAddPropertySessionDispatch()


    // const [approvingMethod, setApprovingMethod] = useState('');
    // const [genderPreference, setgenderPreference] = useState('');
    // const [isBookingExtend, setIsBookingExtend] = useState('');
    const [addPropertyFeatureModalOpen, setAddPropertyFeatureModalOpen] = useState(false)

    const {activeSession: { id:propertyId, approvingMethod,  genderPreference } } = useAddPropertySession()
    const router =  useRouter()

    function moveToPreviousPage() {
        router.push('/add-listing/property-availability')
    }
    function moveToNextPage() {
        router.push('/add-listing/congratulation')
    }
    const onApprovingMethodChangeHandlar = (e) => {
        // setApprovingMethod(e.target.value);
        dispatch({type:'addProperty/approvingMethod', data: e.target.value })
      };
    const onGenderPreferenceChnageHandlar = (e) => {
        // setgenderPreference(e.target.value);
        dispatch({type:'addProperty/genderPreference', data: e.target.value })

    };
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
    function onContinueBtnClick(e) {
        e.preventDefault()
        updateProperty({
            propertyId:propertyId, 
            data: { 
                approvingMethod, 
                genderPreference,
                sessionStatus:'complete'
            } })
        // dispatch({type:'property/approvingMethod', data:approvingMethod})
        // dispatch({type:'property/genderPreference', data:genderPreference})
        // nextPage()
        moveToNextPage()
    }

    // const handleIsBookingExtendChange = (e) => {
    // setIsBookingExtend(e.target.value);
    // };
  return (
    <div className='w-100 h-max-content absolute-center top-0 max-width-1280 '>
        <div className='max-w-600px mr-l-auto mr-r-auto p-btm-80px p-top-56px'>
            <h3 className='clr-primary-400 txt-align-center fw-regular-dark fs-875'>Approving</h3>
            <p className='txt-align-center fw-regular fs-200'>
                From your profile dashboard, you also will able to change all availability.
            </p>

            <div className='mr-top-24px fw-regular-dark'>
                <div className=" fs-400">
                    <h4 className='clr-neutral-600 fs-600 '>Approving method</h4>
                    <div className=' grid gap-16px mr-top-24px mr-btm-24px p-l-24px'>
                        <label className="flex flex-align-center gap-24px">
                            {
                                approvingMethod === 'instant'
                                    ? <CircleCheckBig size={24} className="opacity-0_70" />
                                    : <Circle size={24} className="opacity-0_70" />

                            }
                            <input type="radio" name="approving_method" value="instant" checked={approvingMethod === 'instant'} onChange={onApprovingMethodChangeHandlar}/>
                            Instant approve
                        </label>

                        <label className="flex flex-align-center gap-24px">
                            {
                                approvingMethod === 'manual'
                                    ? <CircleCheckBig size={24} className="opacity-0_70" />
                                    : <Circle size={24} className="opacity-0_70" />

                            }
                            <input type="radio" name="approving_method" value="manual" checked={approvingMethod === 'manual'} onChange={onApprovingMethodChangeHandlar}/>
                            Approve manually
                        </label>
                    </div>
                    
                </div>
                <div>
                    <h4 className='clr-neutral-600 fs-600 mr-btm-16px'>Gender Preference</h4>

                    <div className=' grid gap-16px mr-top-24px mr-btm-24px p-l-24px'>
                        <label className="flex flex-align-center gap-24px">
                            {
                                genderPreference === 'male'
                                    ? <CircleCheckBig size={24} className="opacity-0_70" />
                                    : <Circle size={24} className="opacity-0_70" />
                            }
                            <input type="radio" name="gender_preference" value="male" checked={genderPreference === 'male'} onChange={onGenderPreferenceChnageHandlar}/>
                            Male Only
                        </label>

                        <label className="flex flex-align-center gap-24px">
                            {
                                genderPreference === 'female'
                                    ? <CircleCheckBig size={24} className="opacity-0_70" />
                                    : <Circle size={24} className="opacity-0_70" />
                            }
                            <input type="radio" name="gender_preference" value="female" checked={genderPreference === 'female'} onChange={onGenderPreferenceChnageHandlar}/>
                            Female only
                        </label>

                        <label className="flex flex-align-center gap-24px">
                            {
                                genderPreference === 'any'
                                    ? <CircleCheckBig size={24} className="opacity-0_70" />
                                    : <Circle size={24} className="opacity-0_70" />
                            }
                            <input type="radio" name="gender_preference" value="any" checked={genderPreference === 'any'} onChange={onGenderPreferenceChnageHandlar}/>
                            Anyone
                        </label>
                    </div>

                    {/* <div className="relative ">
                        <select className='border-neutral-300 no-outline no-active-outline radius-8 w-100 p-16px-24px' 
                            value={genderPreference}
                            onChange={onGenderPreferenceChnageHandlar}>
                            <option className="p-16px-24px" value=''>Anyone/No issues</option>
                            <option className="p-16px-24px" value='male'>Male</option>
                            <option className="p-16px-24px" value='female'>Female</option>
                        </select>
                        <LucidIcon className='position-absolute top-50 translateY-50 right-24px' name='chevron-down' size={24}/>
                    </div> */}
                </div>
            </div>
            




            
            {/* nextPage={onContinueBtnClick} previousPage={previousPage}   */}
            <SwitchBtn nextPage={onContinueBtnClick} previousPage={moveToPreviousPage} />
        </div>
    </div>
  )
}
