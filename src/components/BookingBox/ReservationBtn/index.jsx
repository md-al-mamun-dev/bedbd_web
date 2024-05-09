'use client'
import useData from "@/context/data/useData"
import useDataDispatch from "@/context/data/useDataDispatch"
// import { useEffect, useState } from 'react'
import useReservation from "@/context/reservation/useReservation"
const ReservationBtn = () => {

  const { showModal } = useData()
  const reservationData = useReservation()

  const _formData = new FormData()
  _formData.append('reservationData', JSON.stringify(reservationData))

  const dispatch = useDataDispatch()
  
  async function onReservationBtnClick() {

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/reservation", {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer sampleToken`,
                        },
                        body: _formData,
                      })

    // if(showModal === ''){
    //   dispatch({type:'data/showPropertyReservationConfirmationModal', data:true})
    // }else if(showModal === 'reservationConfirmation'){

    //   dispatch({type:'data/showCongratsModal', data:true})
    // }
  }

  return (
    <div className='horizontal-center w-100'>
      <button 
        onClick={onReservationBtnClick}
        className={`btn-primary w-100 max-w-370px position-relative left-50 translateX-50 radius-40px`} >
          {
            (showModal === 'reservationConfirmation')
              ? 'Confirm'
              : 'Reserve Now'
          }
          
      </button>
    </div>
)
}

export default ReservationBtn