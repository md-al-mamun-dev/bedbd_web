'use client'
import { useState } from "react"
import WishListItem from "./WishListItem"
import sampleImage from '@/../public/images/4eabfbe482568e48247e3a0119a702ca.jpeg'




export default function Wishlist() {
const [wishlist, setWishlist] = useState([
    {
        title:'Kuakata, Barishal',
        availabilityDate: '',
        images:[
            '4eabfbe482568e48247e3a0119a702ca.jpeg',
            'dab98b8e77b48c65d7c3e2032f00af6c.jpeg',
            'edd4ba000bdfa85be11654df3de4ccf3.jpeg',
            'ff4537db926dfeb0067a37eecda96e8f.jpeg'

        ]
    }
])




  return (
    <div className='p-40px-24px'>
        <h3 className='clr-primary-400 fs-875 fw-regular-dark '>Wishlist</h3>
        <div className='w-100 grid grid-col-3 gap-24px'>
          <WishListItem/>

          <WishListItem/>

          <WishListItem/>

          <WishListItem/>

          <WishListItem/>

          <WishListItem/>

        </div>
    </div>
  )
}
