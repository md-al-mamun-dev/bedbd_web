import styles from './index.module.css'
import Image from 'next/image'
// import listingItem from '../UIElements/ListingItem'
import ListingItem from '../UIElements/ListingItem'



export default function ImageGallery({data}){
  const galleryTitle = 'Top Rated Properties'

  
  return (
    <div className={` full-width-container max-w-1280px position-relative bg-neutral-000  mr-btm-48px `}>

      
      <div className='horizontal-center w-fit-content'>
      {
            galleryTitle 
        &&  <h2 className='clr-primary-400 fs-700 fw-semi-bold'> {galleryTitle}</h2>}


        {/* {galleryTitle &&  <div className={`${styles.title_container}`}>
                          <h2>{galleryTitle}</h2>
                        </div>} */}

        <div className={`${styles.listing_gallery} `}>
          {
            data.map(item => {
            return (<>
                  
                  <ListingItem data={item}/><ListingItem data={item}/>
                  <ListingItem data={item}/><ListingItem data={item}/>
                  <ListingItem data={item}/><ListingItem data={item}/>
                  <ListingItem data={item}/><ListingItem data={item}/>
                  <ListingItem data={item}/><ListingItem data={item}/>
            </>)})
          }
        </div>
      </div>      
    </div>
  )
}
// export default ImageGallery