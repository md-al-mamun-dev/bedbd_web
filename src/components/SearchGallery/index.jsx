import styles from './index.module.css'
import Image from 'next/image'
import SearchItem from './SearchItem'




export default function SearchGallery({data}){
  const galleryTitle = 'Search Result'

  
  return (
    // full-width-container
    <div className={` max-w-1280px w-100 position-relative bg-neutral-000  mr-btm-48px left-50 translateX-50`}>
      
      <div className='horizontal-center w-fit-content'>
      {
            galleryTitle 
        &&  <h2 className='clr-primary-400 margin-left-24 fs-700 fw-semi-bold'> {galleryTitle}</h2>}


        {/* {galleryTitle &&  <div className={`${styles.title_container}`}>
                          <h2>{galleryTitle}</h2>
                        </div>} */}

        <div className={`${styles.listing_gallery} `}>
          {
            data.map(item => {
            return (<>
                  
                  <SearchItem data={item}/><SearchItem data={item}/>
                  <SearchItem data={item}/><SearchItem data={item}/>
                  <SearchItem data={item}/><SearchItem data={item}/>
                  <SearchItem data={item}/><SearchItem data={item}/>
                  <SearchItem data={item}/><SearchItem data={item}/>
            </>)})
          }
        </div>
      </div>      
    </div>
  )
}
// export default ImageGallery