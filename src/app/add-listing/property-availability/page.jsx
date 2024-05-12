'use client'
import SwitchBtn from "../SwitchBtn"
import { useState } from "react";
import usePropertyDispatch from "@/context/property/usePropertyDispatch";
import { useRouter } from "next/navigation";
import LucidIcon from "@/components/LucidIcon";
import { Circle, CircleCheckBig } from "lucide-react";
import Calender from "./Calender";
import usePropertyListingSession from "@/context/addListing/usePropertyListingSessions";
import useToken from "@/context/account/useToken";
import useAddPropertySessionDispatch from "@/context/addListing/useAddPropertySessionDispatch";
import useAddPropertySession from "@/context/addListing/useAddPropertySession";

export default function Availability() {


    const data = usePropertyListingSession()
    const {isLoading:isTokenLoading,
        isSet,
        token} = useToken()
    
        const {activeSession: { id:propertyId, checkInPossibility, allowMoreThenMonth, maxNightStayLimit, isBookingExtend} } = useAddPropertySession()
    
    // const [checkInPossibility, setCheckInPossibility] = useState('');
    // const [allowMoreThanMonth, setAllowMoreThanMonth] = useState('');
    // const [isBookingExtend, setIsBookingExtend] = useState('');

    // const [maxNightStayLimit, setMaxNightStayLimit] = useState(31);


    const dispatch = useAddPropertySessionDispatch()
    const router = useRouter()

    function moveToPreviousPage() {
        router.push('/add-listing/price')
    }
    function moveToNextPage() {
        router.push('/add-listing/approving')
    }

    const handleCheckInPossibilityChange = (e) => {
        // setCheckInPossibility(e.target.value);
        dispatch({type:'addProperty/checkInPossibility', data:e.target.value});

      };
    const handleAllowMoreThanMonthChange = (e) => {
    // setAllowMoreThanMonth(e.target.value);
    dispatch({type:'addProperty/allowMoreThenMonth', data: e.target.value === 'yes' });
    };

    const handleIsBookingExtendChange = (e) => {

        console.log(e.target.value)
    // setIsBookingExtend(e.target.value);
    dispatch({type:'addProperty/isBookingExtend', data: !(e.target.value === 'yes') });
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

        const updateData = { checkInPossibility, allowMoreThenMonth, isBookingExtend }

        if(allowMoreThenMonth && maxNightStayLimit>30){
            updateData['maxNightStayLimit'] = maxNightStayLimit
        }
        updateProperty({propertyId: propertyId, data: updateData })
        // const newValue = {
        //                     checkIn:checkInPossibility,
        //                     monthExtendStay:allowMoreThanMonth,
        //                     rebookAfterTimeFrame:isBookingExtend
        //                 }
        // dispatch({type:'property/availability', data: { checkIn:checkInPossibility,
        //                                                 monthExtendStay:allowMoreThenMonth,
        //                                                 rebookAfterTimeFrame:isBookingExtend  }})
        moveToNextPage()
        
    }
  return (
    <div className='w-100 h-max-content absolute-h-center top-0 max-width-1280 '>
        <div className='max-w-600px mr-l-auto mr-r-auto p-btm-80px p-top-56px'>
            <h3 className='clr-primary-400 txt-align-center fw-regular-dark fs-875'>Availability</h3>
            <p className='txt-align-center fw-regular fs-200'>
                From your profile dashboard, you also will able to change all availability.
            </p>

            <div className='mr-top-24px fw-regular-dark'>
                <div className=" fs-400">
                    <h4 className='clr-neutral-600 fs-600 '>From when guests can start check in?</h4>
                    <div className=' grid gap-16px mr-top-24px mr-btm-24px'>
                        <label className="flex flex-align-center gap-24px">
                        {
                            checkInPossibility === 'asap'
                                ? <CircleCheckBig size={24} className='opacity-0_70' />
                                :   <Circle size={24} className='opacity-0_70' />
                        }
                            <input type="radio" name="check_in_possibility" value="asap" checked={checkInPossibility === 'asap'} onChange={handleCheckInPossibilityChange}/>
                                As soon as possible 
                        </label>

                        <label className="flex flex-align-center gap-24px">
                        {
                            checkInPossibility !== 'asap' && checkInPossibility !== ''
                                ? <CircleCheckBig size={24} className='opacity-0_70' />
                                : <Circle size={24} className='opacity-0_70' />
                        }
                            <input type="radio" name="check_in_possibility" value="fixed" checked={checkInPossibility === 'fixed'} onChange={handleCheckInPossibilityChange}/>
                                On a specific date
                        </label>

                        {/* <input
                            placeholder='Set Date'
                            disabled={ !(checkInPossibility !== 'asap' && checkInPossibility !== '')} className="w-100 h-56px radius-8px p-16px-24px  border-neutral-300" type="text" />
                         */}
                        {/* <Calender /> */}
                    
                    </div>
                    
                </div>
                <div>
                    <h4 className='clr-neutral-600 fs-600'>Want to allow 30+ night stays?</h4>
                    <div className=' grid gap-16px mr-top-24px mr-btm-24px'>
                        <label className="flex flex-align-center gap-24px">
                        {
                            allowMoreThenMonth 
                                ? <CircleCheckBig size={24} className='opacity-0_70' />
                                :   <Circle size={24} className='opacity-0_70' />
                        }
                            <input type="radio" name="allow_more_then_month" value="yes"  checked={ allowMoreThenMonth } onChange={handleAllowMoreThanMonthChange}/>
                                Yes
                        </label>

                        <label className="flex flex-align-center gap-24px">
                        {
                            !allowMoreThenMonth 
                                ? <CircleCheckBig size={24} className='opacity-0_70' />
                                :   <Circle size={24} className='opacity-0_70' />
                        }
                            <input type="radio" name="allow_more_then_month" value="no" checked={!allowMoreThenMonth} onChange={handleAllowMoreThanMonthChange}/>
                                No
                        </label>

                        { allowMoreThenMonth && <input 
                            placeholder='Set Maximum night'
                            value={maxNightStayLimit}
                            onChange={e =>   dispatch({type:'addProperty/maxNightStayLimit', data:parseInt(e.target.value)})}
                            className="w-100 h-56px radius-8px p-16px-24px  border-neutral-300" type="number" />}

                    </div>
                </div>
                <div>
                    <h4 className='clr-neutral-600 fs-600'>Want to stop getting booked after a time frame?</h4>
                    <div className=' grid gap-16px mr-top-24px mr-btm-24px'>
                        <label className="flex flex-align-center gap-24px" 
                            // onClick={handleIsBookingExtendChange}
                        >
                        {
                            !isBookingExtend
                                ? <CircleCheckBig size={24} className='opacity-0_70' />
                                :   <Circle size={24} className='opacity-0_70' />
                        }
                            <input type="radio" name="is_booking_extend" value="yes" checked={isBookingExtend} 
                            onClick={handleIsBookingExtendChange}
                            />
                                Yes 
                        </label>

                        <label className="flex flex-align-center gap-24px" 
                            // onClick={handleIsBookingExtendChange}
                        >
                        {
                            isBookingExtend
                                ? <CircleCheckBig size={24} className='opacity-0_70' />
                                :   <Circle size={24} className='opacity-0_70' />
                        }
                            <input type="radio" name="is_booking_extend" value="no" checked={!isBookingExtend} 
                            onClick={handleIsBookingExtendChange}
                            />
                                No
                        </label>
                    </div>                
                </div>
            </div>
            




            
            {/* nextPage={onContinueBtnClick} previousPage={previousPage}   */}
            <SwitchBtn nextPage={onContinueBtnClick} previousPage={moveToPreviousPage} />
        </div>
    </div>
  )
}
