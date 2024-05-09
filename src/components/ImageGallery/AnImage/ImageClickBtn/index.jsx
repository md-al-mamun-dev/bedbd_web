"use client"
import { useEffect } from 'react'
import styles from './index.module.css'
import openImgContainer from '@/components/ImageDetails/lib/openImgContainer'
import scrollToImg from '@/components/ImageDetails/lib/scrollToImg'

const ImageClickBtn =({imageId})=> {

  const imgClickHandlar = ()=>{

    openImgContainer()
    scrollToImg(imageId)
  }
  
  return (
    <button className={`${styles.image_btn_click}`} onClick={imgClickHandlar}/>
  )
}

export default ImageClickBtn