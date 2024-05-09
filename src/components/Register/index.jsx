'use client'
import { useState } from "react"
import React from 'react'
import TermsCondition from "./TermsCondition"
import UploadPhoto from "./UploadPhoto"
import Review from "./Review"
import LastWords from "./LastWords"
// import LucidIcon from "../LucidIcon"
import BackBtn from "./BackBtn"
import GetStart from "./GetStart"
import useAccount from "@/context/account/useAccount"
import useAuthCheck from "@/hooks/useAuthCheck"
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter()
  // {isLoading, isLoggedIn, authCheck, user:userData['user']   }

  const {isLoading, isLoggedIn, authCheck, user   } = useAuthCheck()
  const account =  useAccount()
  const [formState, setFormState] = useState('start')

// const [name, setName] = useState('')
// const [phone, setPhone] = useState('')
// const [email, setEmail] = useState('')

  if(authCheck && 
    (!user || 
      (user && 
        (Object.keys(user).length < 1)))){
          router.push('/');
  }

  

  return (
    (authCheck && Object.keys(user).length > 0) 
    ? <div className='w-100v h-100v relative '>  
        <div className='bg-secondary-050 absolute-center radius-8 p-56-106 '>

        { formState === 'start' && 
            <GetStart data={user} 
                      nextStep={()=>setFormState('tarms-nd-condition')}/> }

        { formState === 'tarms-nd-condition' &&
            <TermsCondition data={user}
                            prevStep={()=>setFormState('start')}
                            nextStep={()=>setFormState('user-photo')}/>}

        { formState === 'user-photo' &&
            <UploadPhoto  data={user} formState={formState}
                          prevStep={()=>setFormState('tarms-nd-condition')} 
                          nextStep={()=>setFormState('verification-document-front-side')}/>}

        { formState === 'verification-document-front-side' &&
            <UploadPhoto data={user} formState={formState}
                         prevStep={()=>setFormState('user-photo')} 
                         nextStep={()=>setFormState('verification-document-back-side')}/>}

        { formState === 'verification-document-back-side' &&
            <UploadPhoto data={user} formState={formState}
                         prevStep={()=>setFormState('verification-document-front-side')} 
                         nextStep={()=>setFormState('info-review')}/>}

        { formState === 'info-review' && 
            <Review data={user}
                    prevStep={()=>setFormState('verification-document-back-side')} 
                    nextStep={()=>setFormState('end')}/>}

        { formState === 'end' && 
            <LastWords/>}


            {/* <GetStart/> */}
            {/* <TermsCondition/> */}
            {/* <UploadPhoto/> */}
            {/* <Review/> */}
            {/* <LastWords/> */}
        </div>
    </div>
    :<>Loading...</>
  )
}
