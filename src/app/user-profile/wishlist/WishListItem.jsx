import Image from 'next/image'
import starIcon from '@/../public/icons/star.svg'


// import sampleImage_1 from '../../../../public'
import sampleImage_2 from '@/../public/images/dab98b8e77b48c65d7c3e2032f00af6c.jpeg'
import sampleImage_3 from '@/../../public/images/edd4ba000bdfa85be11654df3de4ccf3.jpeg'
import sampleImage_4 from '@/../../public/images/ff4537db926dfeb0067a37eecda96e8f.jpeg'


export default function WishListItem() {

const images = [

]

  return (
    <div className='position-relative'>
      <div className='w-100 aspect-ratio-1_63 position-relative ' >
        <Image className='radius-8px' src='/images/4eabfbe482568e48247e3a0119a702ca.jpeg' fill objectFit='cover'/>
        {/* <Image src={sampleImage_2} layout='responsive'/> */}
      </div>
      <div className='flex flex-space-between'>
        <div>
          <div className='fs-600 fw-semi-bold clr-neutral-500'>Kuakata, Barishal</div>
          <div className='fs-400 fw-regular-dark clr-neutral-400'>Available on 3rd march</div>
        </div>
        <div className=''>
          <div className='clr-primary-400 fs-650 fw-semi-bold txt-right'>$25</div>
          <div className='flex flex-align-center '>
            <Image src={starIcon} height={24} width={24}/>
            <div className='clr-neutral-600 fs-400'>4.8<span className='clr-neutral-500'>{`(20)`}</span></div>
          </div>
        </div>
        

        

      </div>

    </div>
  )
}
