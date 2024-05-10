'use client'
import { useState } from 'react'
import styles from './index.module.css'
import { X, CheckSquare, Plus, ChevronLeft } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import SwitchBtn from '../SwitchBtn'
import Image from 'next/image'
import LucidIcon from '@/components/LucidIcon'
import usePropertyDispatch from '@/context/property/usePropertyDispatch'
import { useRouter } from 'next/navigation'
import useToken from '@/context/account/useToken'
import usePropertyListingSession from '@/context/addListing/usePropertyListingSessions'
import useAddPropertySession from '@/context/addListing/useAddPropertySession'

export default function Images() {
    

    const [uploadedImageFiles, setUploadImageFiles] = useState([])
    const [rejectedFiles, setRejectedFiles]= useState([])

    const [propertySessionId, setPropertySessionId] = useState('')
    const data =  usePropertyListingSession() 
    const { activeSession: { id: sessionId }} =  useAddPropertySession()


    // const {isLoading, addPropertySessions:{ activeSession: { id } }} =  usePropertyListingSession() 
    const dispatch = usePropertyDispatch()
    const router = useRouter()

    const {
        isLoading: isTokenLoading,
            isSet: isTokenSet,
                   token,
                   expireTime
            } = useToken()
           
    // const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {

    //     const imageArray = []
    //     if(acceptedFiles.length > 0 ){
            
    //         acceptedFiles.map(file => {
    //             const imageObject  = Object.assign(file, {preview: URL.createObjectURL(file)})
    //             formData.append('property-image', imageObject)
    //         })

    //         console.log(formData.values())
    //         const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/property-image-upload", {
    //             method: "POST",
    //             headers: {                        
    //               // Authorization: `Bearer ${token}`,
    //             },
    //             body: formData,
    //           })
    //     }
    //     if(rejectedFiles.length){
    //         setRejectedFiles(previousFiles => [...previousFiles, ...rejectedFiles])
    //     }
    // }, [])


    const onDrop = async (acceptedFiles, rejectedFiles) => {
        const formData = new FormData();
        formData.append('propertySessionId', sessionId);
        const imageArray = [];
        if (acceptedFiles.length > 0) {
            acceptedFiles.forEach(file => {
                const imageObject = Object.assign(file, { preview: URL.createObjectURL(file) });
                formData.append('property-image', imageObject);
            });
    
            console.log(formData.values());
    
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/property-image-upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
        }
        if (rejectedFiles.length) {
            setRejectedFiles(previousFiles => [...previousFiles, ...rejectedFiles]);
        }
    };
    function moveToPreviousPage() {
        router.push('/add-listing/home-rules')
      }
    function moveToNextPage() {
        router.push('/add-listing/price')
    }

    const { acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({   onDrop, 
                                                                                        accept:{    'image/svg': ['.svg'],
                                                                                                    'image/jpg': ['.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp'],
                                                                                                    'image/png': ['.png'] },
                                                                                        maxSize: (5 * 1024 * 1024),
                                                                                        maxFiles:10,
                                                                                    })
    function onContinueBtnClick() {
        dispatch({type:'property/images', data: uploadedImageFiles})
        moveToNextPage()
        // console.log(uploadedImageFiles)
        // uploadedImageFiles.map(file => {
        //     console.log(file.preview)
        // })
    }

    function removeImage(idx) {
        // const otherImages = uploadedImageFiles.filter((item, index) => index !== idx)
        setUploadImageFiles(previousfiles => (previousfiles.filter((item, index) => index !== idx)))
    }


  return (
    <div  className='mr-l-auto position-absolute left-50 translateX-50  mr-r-auto w-100 max-w-814px p-top-56px p-btm-80'>
        
        <h3 className={`${styles.heading} mr-top-56px`}>Upload Images</h3>

        
        <div {...getRootProps({className:`text-select-none ${styles.upload_photo}`})}>
            <input {...getInputProps()}/>
            <p className={`${styles.proposition_txt}`}>Drag and drop or</p> 
            <button className={`${styles.upload_btn}`}>
                <Plus className={`${styles.upload_btn} `} size={24} />
                {/* <LucidIcon name={'plus'} className={`${styles.upload_btn} `} size={24} /> */}
                Upload photos
            </button>

            <p className={`${styles.suggestion_txt}`}>jpg/jpeg or png, maximum 5MB each</p>
        </div> 

        <div className={`${styles.uploaded_images} `}>
            <p className={`${styles.info}`}>upload at least <span className='fw-regular-dark'>five</span> photos maximum limite is <span className='fw-regular-dark'>fifteen</span> </p>


            {
                uploadedImageFiles.length > 0 && <>
                    {/* <p className={`${styles.info}`}>Arrange the photos in the desired order by clicking and dragging them for guests to view.</p> */}

                {
                    uploadedImageFiles.map((image, idx) =>(
                        <div className={`${styles.image_wrapper}`}>
                            <Image src={image['preview']} fill/>
                            <button className={`${styles.drop_img_btn}`} onClick={()=>removeImage(idx)}>
                                {/* <X size={24} className={`${styles.close_icon}`}/> */}
                                <LucidIcon name={'x'} className={`${styles.close_icon} `} size={24} />
                            </button>
                        </div>
                    ) )
                }                
                </>
                    
            }
            
                    
        </div>

        <SwitchBtn previousPage={moveToPreviousPage}  nextPage={onContinueBtnClick}/>

    </div>
  )
}
