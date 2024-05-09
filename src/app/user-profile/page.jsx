'use client'
import { useState } from "react"
import Header from "@/components/Header"
import AccountProvider from "@/context/account/accountContext"
import LucidIcon from "@/components/LucidIcon"

import ImageAvater from './ImageAvater'

export default function UserProfile() {

    const [profileControlItems, setProfileControlItems]= useState([
        {
            title:'Personal Info',
            descriptions:'Provide personal details and how we can reach you',
            icon:{
                type:'lucidicon',
                name: 'shield-check',
                url:''
            }
        },
        {
            title:'Login & Security',
            descriptions:'Update your password and secure your account',
            icon:{
                type:'lucidicon',
                name: 'shield-check',
                url:''
            }
        },
        {
            title:'Notification',
            descriptions:'Choose notification preferences and how you want to be contacted',
            icon:{
                type:'lucidicon',
                name: 'shield-check',
                url:''
            }
        },
        {
            title:'Privacy & Sharing',
            descriptions:'Manage your personal data, connected service, and data sharing settings',
            icon:{
                type:'lucidicon',
                name: 'shield-check',
                url:''
            }
        },
        {
            title:'Payment & Payouts',
            descriptions:'Review payments, payouts, coupons and gift cards',
            icon:{
                type:'lucidicon',
                name: 'shield-check',
                url:''
            }
        },
        {
            title:'Referral credit & Coupon',
            descriptions:'You have &0 referral credits and coupon. Learn more.',
            icon:{
                type:'lucidicon',
                name: 'shield-check',
                url:''
            }
        },

    ])


  return (
    <div>
        <div className="max-width-1280px p-l-24px p-r-24px flex gap gap-70px horizontal-center">
            <div className="p-left-16px p-right-16px p-top-42px p-bottom-94px max-w-290px bg-secondary-050 clr-neutral-500 flex flex-col flex-align-center gap-40px radius-bottom-8px h-max-content{">
                <div className='flex flex-col align-center w-100'>
                    <ImageAvater/>
                    <h3 className='clr-neutral-800 fw-semi-bold fs-700 clr-neutral-800'>Ajmol Hossain</h3>
                </div>

                <div className='w-100'>
                    <div className="fw-semi-bold fs-600">Verified Information</div>
                    <div className='mr-top-24px'>
                        <div className="flex gap-16px">Phone Verified 
                            <span><LucidIcon name='badge-check' size={24}/></span>
                        </div>
                        <div className="flex gap-16px mr-top-16px">Email Address <span> verify now</span></div>
                    </div>
                </div>

                <div>
                    <h3 className="fw-semi-bold fs-600"> Verify Your Identity</h3>
                    <div className='fw-regular fs-200 mr-top-16px'>Before you book or Host on bedbd, you’ll need to complete this step.
                    </div>
                </div>

                <button className="w-100 border-primary-1 bg-transparent p-top-16px p-btm-16px txt-align-center clr-primary radius-40px fs-200 fw-semi-bold"> Get Verified </button>
            </div>

            <div className="w-100 flex flex-wrap gap-40px mr-top-80px">
            {
                profileControlItems.map(
                    item => (<div className="p-24px radius-8px h-175px grid gap-10px w-377px bg-secondary-050 ">
                                <LucidIcon name={item['icon']['name']} size={24}/>
                                <div className='fs-600 fw-semi-bold clr-neutral-600'>{ item['title']}</div>
                                <div className='fs-400 fw-regular-dark clr-neutral-500'>{ item['descriptions']}</div>
                            </div>))
            }
            </div>
        </div>

    </div>
  )
}
