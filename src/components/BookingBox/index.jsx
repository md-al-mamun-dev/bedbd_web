'use client'
import { useEffect, useState, useRef } from 'react'
import styles from './index.module.css'
// import Calender from '../UIElements/Calender'
import ReservationBtn from './ReservationBtn'
import Calender from './Calender'
import useReservation from '@/context/reservation/useReservation'
import useReservationDispatch from '@/context/reservation/useReservationDispatch'
import GuestCount from './GuestCount'
import calculateDayNightDifference from '../Utility/calculateDayNightDifference'

function formateDate(dateInt) {

  if(dateInt === '' || typeof dateInt === undefined)
    return
  const date = new Date(dateInt * 1000)
  const year = String(date.getFullYear());
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = String(date.getDate()).padStart(2, '0');
  return `${day} ${month}, ${year}`
}


const BookingBox = ({data, isAvailable, propertyId, hosts }) => {

  

  const reservationData = useReservation();


  const dispatch = useReservationDispatch();

  const [showCalender, setShowCalender] =  useState(false)
  const [showGuestCounter, setShowGuestCounter] =  useState(false)
  const { days, nights } = calculateDayNightDifference(reservationData['date'][0], reservationData['date'][1]);
  const calenderRef = useRef(null);
  const checkInInputRef = useRef(null)
  const checkOutInputRef = useRef(null)
  const guestCounterRef = useRef(null)
  const guestInputRef = useRef(null)


  function onInputClickHandlar() {
      setShowCalender(!showCalender)
  }
  function onGuestInputClickHandlar() {
    setShowGuestCounter(!showGuestCounter)
  }
  function onGuestCountChange(key, value){
    const reducerType = 'reservation/guestCount'+(key.charAt(0).toUpperCase() + key.slice(1))
    dispatch({type: reducerType, data: value})
  }

  useEffect(()=>{
    if(typeof propertyId !== undefined){
      dispatch({type:'reservation/propertyId', data: propertyId})
    }
  }, [propertyId])

  useEffect(()=>{
    if(hosts.length > 0 ){
      dispatch({type:'reservation/hosts', data: hosts})
    }
  }, [hosts])

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (    (calenderRef.current && !calenderRef.current.contains(event.target)) 
          &&  (checkInInputRef.current && !checkInInputRef.current.contains(event.target))
          &&  (checkOutInputRef.current && !checkOutInputRef.current.contains(event.target))
        ) {
        setShowCalender(false);
      }

      if (    (guestCounterRef.current && !guestCounterRef.current.contains(event.target)) 
          &&  (guestInputRef.current && !guestInputRef.current.contains(event.target))
          // &&  (checkOutInputRef.current && !checkOutInputRef.current.contains(event.target))
        ) {
        setShowGuestCounter(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' ) {
        if(showCalender)
          setShowCalender(false);
        if(showGuestCounter)
          setShowGuestCounter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showCalender, showGuestCounter]);



  return (
  <div className={`${styles.booking_box}`}>
    <div className={`${styles.booking_title} `}>
      <div className={`${styles.price}`}>{data['currency']  + data['price']}</div>  
      <div  className={`capitalize ${styles.unit}`}> &nbsp;  {' /' + data['unit']  + ' '} &nbsp; </div>
      {
        isAvailable
          ? <div className={`txt-success ${styles.availability_txt}`}>{' (Available)'}</div>
          : <div className={`txt-error ${styles.availability_txt}`}>{' (Not Available)'}</div>
      }
      {/* <div>{' ' + availability['isAvaliable'] ? '(Available)' : '(Not Available)' }</div> */}
    </div>
  <div className={`${styles.container} position-relative`}>
    <div className={`${styles.input_box} `}>
      <div className={`${styles.check_in}`} >
        <label>Check In</label>
        <input
          ref={checkInInputRef} 
          onClick={onInputClickHandlar}
          value={!(reservationData['date'][0] === undefined) 
                    ?  formateDate(reservationData['date'][0])
                    : ''} 
          readOnly={true} type="text" className={`date_input ${styles._date_input}`} placeholder='Add Dates'/>
      </div>

      <div className={`${styles.check_out}`} >
        <label>Check Out</label>
        <input 
          value={!(reservationData['date'][1] === undefined) 
                    ?  formateDate(reservationData['date'][1])
                    : ''} 
          onClick={onInputClickHandlar}
          ref={checkOutInputRef}  readOnly={true} type="text"  className={` date_input ${styles._date_input}`}  placeholder='Add Dates'/>
      </div>

      <div className={`${styles.guest_count} position-relative`}>
        <label>Guest</label>
        <input 
          readOnly={true} 
          onClick={onGuestInputClickHandlar}
          value={
            reservationData['guestCount']['adult'] < 1 
              ? ''
              : reservationData['guestCount']['adult']+' Person(s)'
                + 
                (
                  reservationData['guestCount']['children'] > 0 
                  ? ', ' + reservationData['guestCount']['children'] + 'Child '
                  : ''
                )
                +
                (
                  (
                    reservationData['guestCount']['infants'] > 0 
                    ? ', ' + reservationData['guestCount']['infants'] + 'Infant(s) '
                    : ''
                  )
                )
                +
                (
                  (
                    reservationData['guestCount']['pets'] > 0 
                    ? 'and ' + reservationData['guestCount']['pets'] + 'Pet(s) '
                    : ''
                  )
                )
          }
          ref= {guestInputRef}
          placeholder='select guest'/>

      </div>
    </div>
    <Calender
        data = {reservationData['date']}
        reducerType='reservation/date'
        dispatch={dispatch}
        showCalender={showCalender}  
        calenderRef={calenderRef} />
    <GuestCount 
        show={showGuestCounter}
        guestCounterRef={guestCounterRef}
        changeGuestCount={onGuestCountChange}
        guestCount = {reservationData['guestCount']}/>
        


    <div className={`${styles.price_calculation_details}`}>
      <div className={`${styles.row}`}>
        <div> 
          { 
            (days > 0)
              ? data['currency'] + data['price'] + ' ' + 'x' + ' ' + days + ' ' + 'nights'
              : data['currency'] + data['price'] + '/night'
          }
        </div>
        <div >
          {
            (days > 0)
              ? data['currency'] + (data['price'] * days)
              : data['currency'] + data['price']
          }
        </div>    
      </div>

      <div className={`${styles.row}`}>
        <div>Service Fee</div> <div > { data['currency'] + data['servicesFee']}  </div>    
      </div>

      <div className={`${styles.row}`}>
        <div>Bedbd Fee</div> <div > { data['currency'] + data['bedbdFee']}  </div>    
      </div>

      <div className={`${styles.row}`}>
        <div>Total</div> 
        <div > { 
          data['currency'] + 
            ((data['price'] * (days>0 ? days : 1 ) ) + data['servicesFee'] +  data['bedbdFee'] ) }  </div>    
      </div>
    </div>

    <ReservationBtn/>
  </div>

</div>)
}

export default BookingBox