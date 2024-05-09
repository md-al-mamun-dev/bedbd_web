'use client'
import Image from 'next/image'
import useData from "@/context/data/useData"
import congrats_decoration_image from '@/../public/images/congrats_decoration_image.svg'

export default function CongratsMessage() {
  const { showModal } = useData()

  return (<div id="congrats-message" className={` ${showModal !== 'congratsModal' && 'display-none'} blur-3 bg-neutral-000 p-top-80px position-fixed bg-neutral-000 z-index-11 top-0 w-100 min-h-100 overflow-scroll z-index-999`} >
            <div className="horizontal-center max-w-500px">
              <div className='position-relative h-400px w-400px horizontal-center'  >
                <Image src={congrats_decoration_image} fill/>
              </div>  
              <h3 className='clr-secondary-400 fs-975 fw-semi-bold txt-align-center'>Successful</h3>
              <p className='clr-neutral-500 fs-500 fw-regular txt-align-center' >Your reservation process is completed succefully. An email has been sent</p>
            </div>
          </div>)
}
