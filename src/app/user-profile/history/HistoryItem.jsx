import React from 'react'

export default function HistoryItem() {
  return (
    <div className='radius-8px'>
        <div className='p-12px-24px clr-neutral-600 property-name-title'>Property B</div>
        <div className='  w-100 max-width-1230px  profile-history-grid col-gap-0 row-gap-8px clr-neutral-400 fs-regular mr-l-auto mr-r-auto'>
            <div className='p-16px-24px clr-neutral-600 txt-right property-properties-title'>Property ID</div>
            <div className='p-12px-24px clr-secondary-400'>45336</div>
            <div className='p-12px-24px property-name'>Property B</div>
            <div className='p-16px-24px clr-neutral-600 txt-right property-properties-title'>Booking Details</div>
            <div className='p-12px-24px'>5/6 Guests, 2 bedroom, $21/per night</div>
            <div className='p-16px-24px clr-neutral-600 txt-right property-properties-title'>Booking Date</div>
            <div className='p-12px-24px'>23 Feb, 24 - 25 Feb, 24</div>
            <div className='p-16px-24px clr-neutral-600 txt-right property-properties-title'>Total Cost</div>
            <div className='p-12px-24px '>$108</div>
        </div>
    </div>
  )
}
