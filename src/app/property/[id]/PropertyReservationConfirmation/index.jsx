'use client'
import LucidIcon from "@/components/LucidIcon"
import starIcon from '@/../public/icons/star_primary_color_fill.svg'
import Image from 'next/image'
import usePaymentOptions from "@/hooks/usePaymentOptions"
import usePayment from "@/context/payment/usePayment"
import usePaymentDispatch from "@/context/payment/usePaymentDispatch"
import { CircleCheckBig, Circle } from 'lucide-react';
import BookingBox from "@/components/BookingBox"
import useData from "@/context/data/useData"

export default function PropertyReservationConfirmation({data, isAvailable, propertyId, hosts   }) {

  const { showModal } = useData()
  const  {isLoading, paymentOptions} =  usePaymentOptions()

  const dispatch = usePaymentDispatch()
  const {selectedOption} = usePayment()


  return (<div id='property-reservation-confirmations-modal' 
            className={`${showModal !=='reservationConfirmation' && 'display-none'  }   blur-3 bg-neutral-1000-a_25 p-top-80px position-fixed bg-neutral-000 z-index-11 top-0 w-100 min-h-100 overflow-scroll z-index-999`}>
            <div className='position-absolute top-0 left-50 translateX-50  p-72px-24px radius-8px w-100  max-w-1280px bg-neutral-000 h-max-content p-btm-72px'>
              
              <button className="no-border no-background flex">
                <LucidIcon name='chevron-left' size={24} /> 
                back
              </button>

              <div className='grid grid-temp-col-2-lg justify-items-center gap-40px mr-top-32px'>
                <div className='w-100'>
                  <div className='flex space-between'>
                    <div className='flex'>
                      <h3 className='clr-neutral-500 fs-650 fw-semi-bold'>Apartment</h3>
                      <div className='mr-left-24px flex flex-align-center gap-8px '>
                        <div className=''>
                          <Image src={starIcon} width={20} height={20}/>
                        </div> 
                        <div className='clr-primary-400 fs-500 fw-semi-bold '>
                        4.3 <span className='mr-left-4px clr-neutral-600 fs-regular fw-regular-dark'>(20)</span>
                        </div> 
                      </div>
                    </div>
                    <div className='flex gap-32px clr-neutral-500 fs-500'>
                      <button className='no-border no-background flex flex-align-center gap-16px'>
                        <LucidIcon className='opacity-0_70' name='share-2' size={24} />
                        Share
                      </button>
                      <button className='no-border no-background flex flex-align-center gap-16px'>
                      <LucidIcon className='opacity-0_70' name='heart' size={24} />
                        Save
                      </button>
                      
                    </div>
                  </div>

                  <div className='mr-top-48px mr-btm-100px'>
                    <h3 className='clr-neutral-600 fw-semi-bold fs-700'>Ocean Blue, Labonno point, Cox bazar</h3>
                    <h5 className='clr-neutral-400 fs-500 fw-regular'>Copy Lane, Altoona, PA 16602</h5>
                  </div>

                  <div>
                    <h4 className='fs-650 fw-semi-bold clr-neutral-500 mr-btm-40px'>
                      Select Payment Option
                    </h4>

                    <form>
                      <div className='grid grid-temp-col-2 w-max-content col-gap-32px row-gap-40px'>
                        {
                          paymentOptions.map(i=>(
                            <label className='flex flex-align-center gap-16px' onClick={()=>dispatch({type:'payment/selectOption', data: i['value']})}>
                              {/* <LucidIcon className='opacity-0_70' name={selectedOption === i['value'] ? 'circle-dot':'circle'  } size={24} /> */}
                              {
                                selectedOption === i['value'] 
                                  ? <CircleCheckBig className='opacity-0_70' size={24}  />
                                  : <Circle className='opacity-50' size={24}/>

                              }

                              <div className='flex gap-8px'>
                                <div className='w-48px h-24px position-relative '>
                                  <Image className='position-relative' src={`/icons/${i['icon']['name']}`} fill objectFit="cover"/>
                                </div>
                                <input type='radio' name='payment-option' value={i['value']}/> {i['title']}
                              </div>
                            </label>
                          ))
                        }
                      </div>
                    </form>
                    
                  </div>
                </div>

                <BookingBox 
                  data={data} 
                  isAvailable={isAvailable} 
                  propertyId={propertyId} 
                  hosts={ hosts}/>
              </div>

              

            </div>
          </div>)
}
