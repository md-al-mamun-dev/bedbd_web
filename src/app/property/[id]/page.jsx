
import styles from './page.module.css'
import ImageGallery from '@/components/ImageGallery'
import ShareSaveBtn from '@/components/ShareSaveBtn'
import Facilities from './Facilities'
import About from './About'
import Amenities from './Amenities'
import HomeRules from './HomeRules'
import CancellationPolicy from './CancellationPolicy'
import Host from './Host'
import Rating from './Rating'
import Review from './Review'
import NearbyServices from './NearbyServices'
import BookingBox from '@/components/BookingBox'
import { ImageDetails } from './ImageDetails'
import PostReview from './PostReview'
import PaymentProvider from '@/context/payment/paymentContext'

import propertyService from '@/service/PropertyService'
import storageService from '@/service/StorageService'
import PropertyImageDetails from '@/components/ImageDetails'
import ReservationProvider from '@/context/reservation/reservationContext'

// import { Client, Databases, Account, Query} from 'appwrite'
import { Client, Databases, Account, Query, Storage, Users } from 'node-appwrite'
import PropertyReservationConfirmation from './PropertyReservationConfirmation'
import CongratsMessage from './CongratsMessage'

import SearchMap from '@/components/SearchMap'

// import LocationMap from '@/components/LocationMap'
import LocationMap from './LocationMap'


async function getData(id) {  

    const        APPWRITE_URL = process.env.APPWRITE_URL
    const          PROJECT_ID = process.env.APPWRITE_PROJECT_ID
    const             API_KEY = process.env.APPWRITE_BACKEND_API_KEY
    const               DB_ID = process.env.APPWRITE_DB_BEDBD_ID
    const PROPERTY_COLLECTION = process.env.APPWRITE_DB_COLLECTION_PROPERTY_ID

    const RATING_REVIEW_COLLECTION = process.env.APPWRITE_DB_COLLECTION_RATING_REVIEW_ID

    const     PROPERTY_IMAGES = process.env.APPWRITE_PROPERTY_IMAGE_FILE_BUCKET_ID
    
    const client = new Client();
        client
            .setEndpoint(APPWRITE_URL)
            .setProject(PROJECT_ID)
            .setKey(API_KEY);
    const databases = new Databases(client);
    const   storage = new Storage(client);
    const   users = new Users(client);


    try {
        const data =  await databases.getDocument(
                                    DB_ID,
                                    PROPERTY_COLLECTION,
                                    id)

        const { 
            description, 
            propertyType, 
            title, 
            address,
            isPublished, 
            isAvailable, 
            rent, 
            currency, 
            serviceFee, 
            images,
            amenities,
            ownerId, 
            hosts,
            propertyBookingTypes,
            customBookingTypesTitle,
            customBookingTypesDescription,

            homeRules,
            customHomeRulesTitle,
            customHomeRulesDescription,
            propertyFeatures,
            customFeaturesTitle,
            customFeaturesDescription,
            roomCount,
            bedCount,
            guestCount,
    
            propertyRatingReview    } = data


            const ratingReviewResult =  await databases
                                            .listDocuments(
                                                DB_ID,
                                                RATING_REVIEW_COLLECTION,
                                                [Query.equal("propertyId", [data['$id']])])

                                    
                                                
            const ratingReviews = ratingReviewResult.documents.map(item =>
                                    (Object.entries(item)
                                            .reduce((acc, [key, value]) => {
                                                if (key.endsWith('Rating')) {
                                                    const ratingKey = key.replace('Rating', ''); // Remove 'Rating' from the key
                                                    acc.ratings = acc.ratings || {}; // Create ratings object if it doesn't exist
                                                    acc.ratings[ratingKey] = value; // Assign the rating value to the ratings object
                                                }else if(key=== 'author'){
                                                    acc[key] = {
                                                                            name: value['name'], 
                                                                     description: value['description'],
                                                                    profilePhoto: value['profilePhoto']
                                                                                    .reduce((latest, current) => {
                                                                                            const latestTime = new Date(latest['$updatedAt']).getTime();
                                                                                            const currentTime = new Date(current['$updatedAt']).getTime();
                                                                                            return currentTime > latestTime ? current : latest;
                                                                                        })['profilePhotoID'],
                                                                          badges: value['badges']
                                                                                    .map(i=>({ badgeName: i['badgeName'],
                                                                                                    icon: {
                                                                                                            type: i['iconType'],
                                                                                                            name: i['iconName'],
                                                                                                            url:  i['iconUrl']
                                                                                                        }
                                                                                                }))
                                                                }
                                                }else if(key=== 'reviewText' || key === '$updatedAt'){
                                                    acc[key] = value;
                                                }
                                                
                                                // else {
                                                //     acc[key] = value; // Assign non-rating keys directly
                                                // }
                                                return acc;
                                            }, {}))).sort((a, b) => {
                                                const dateA = new Date(a['$updatedAt']);
                                                const dateB = new Date(b['$updatedAt']);
                                                return dateB - dateA; // Sort in descending order
                                              });
            
            // console.log('rating review')
            // console.log(ratingReviews[0])
            // console.log(ratingReviews[0]['author']['profilePhoto'])
            // console.log(ratingReviews[0]['author']['badges'])


            const _hosts = hosts.map(item=> {

                    const profilePhoto = item['profilePhoto'].reduce((latest, current) => {
                                                                    const latestTime = new Date(latest.$updatedAt).getTime();
                                                                    const currentTime = new Date(current.$updatedAt).getTime();
                                                                    return currentTime > latestTime ? current : latest;
                                                                }); 
                    const badges = item['badges'].map(i=>({ badgeName: i['badgeName'],
                                                            icon:{
                                                                type: i['iconType'],
                                                                name: i['iconName'],
                                                                url: i['iconUrl']
                                                                } 
                                                            })) 

                                    return  ({    id: item['$id'],
                                                name: item['name'], 
                                         description: item['description'], 
                                        profilePhoto: profilePhoto['profilePhotoID'], 
                                // userVerificationInfo: item['userVerificationInfo'],
                                              badges: badges })})

            const _amenities = amenities.map(item=> ({
                                           title: item['title'], 
                                     description: item['description'], 
                                            icon: item['icon'], 
                                        category: item['category']
                                    }))

            const _homeRules = homeRules.map(item=>({title: item['title'], description: item['description']}))
            if(customHomeRulesTitle.length>0){
                customHomeRulesTitle.forEach(item => {
                    const textArray = item.split('_')
                    const index = textArray[0]
                    const title = textArray.slice(1).join('_')
                    let description = '';
                    customHomeRulesDescription.forEach(i=>{
                        const txtArr = i.split('_')
                        if(index === textArray[0] )
                            description = textArray.slice(1).join('_')
                    })
                    _homeRules.push({ title, description })
                })
            }

            const bookingTypes = propertyBookingTypes.map(item=>({title: item['title'], description: item['description']}))
            if(customBookingTypesTitle.length>0){
                customBookingTypesTitle.forEach( item =>{
                    const textArr = item.split('_')
                    const idx = textArr[0]
                    const title = textArr.slice(1).join('_')
                    let description =''; 
                    customBookingTypesDescription.forEach(i=>{ 
                        const txtArr = i.split('_')
                        if(idx === txtArr[0])
                          description = txtArr.slice(1).join('_')
                    })
                    bookingTypes.push({ title, description })
                })
            }


            const features = propertyFeatures.map(featureItem=>({title: featureItem['title'], description: featureItem['description']}))
            if(customFeaturesTitle.length>0){
                customFeaturesTitle.forEach(i=>{
                    const textArr = i.split('_')
                    const idx = textArr[0]
                    const title = textArr.slice(1).join('_')
                    let description =''; 
                    customFeaturesDescription.forEach(item=>{ 
                        const txtArr = item.split('_')
                        if(idx == txtArr[0])
                          description = txtArr.slice(1).join('_')
                    })
                    features.push({ title, description })
                })                              
            }


        if(data['$id'])
            return { 
                id: data['$id'],
                description, 
                propertyType, 
                title, 
                address,
                isPublished, 
                isAvailable, 
                rent, 
                currency, 
                serviceFee, 
                images,    
                amenities:_amenities,    
                ownerId, 
                hosts:_hosts,
                roomCount,
                bedCount,
                guestCount,

                features:[...bookingTypes, ...features ],
                homeRules: _homeRules,    
                propertyRatingReview:ratingReviews   } 


    } catch (err) {
        return false
    }


  }



export default async function Property({ params}) {
    const id = params['id']
    const property = await getData(id)
    // console.log(property)


    const {     id: propertyId,
                description,
                propertyType,
                title,
                address,
                isPublished,
                isAvailable,
                rent,
                currency,
                serviceFee,
                images,
                amenities,
                ownerId,
                hosts,
                features,
                homeRules,
                propertyRatingReview,
                roomCount,
                guestCount,
                bedCount
            } = property



// console.log(propertyRatingReview[0]['ratings'])
// console.log(propertyRatingReview[0]['author'])

const ratings = propertyRatingReview?.map(item => item['ratings'])
const review = propertyRatingReview?.map(item => ({
                                            reviewText: item['reviewText'], 
                                                author: item['author'], 
                                          '$updatedAt': item['$updatedAt']}))

    
    

    const pricingData =  {
        'price': rent,
        'unit' : 'night',
        'currency': currency,
        'servicesFee': serviceFee,
        'bedbdFee':2,
    }
    
    
    

    
    return <>
            <div className={`container  ${styles.property_details}`} >
                <div className='w-100 h-100'>
                {/* <SearchMap/> */}
                    <ImageGallery data={images.slice(0, 4)} totalImageCount={images.length}/>
                    <div className={`${styles.geographical_map}`}>
                        <LocationMap propertyId={propertyId}/>
                    </div> 
                </div>
                <div className={`${styles.property_descriptions } `} >
                    <div className={`${styles.attributes_details}`}>
                        <div className='flex flex-row space-between mr-top-700 mr-btm-700'>
                            <div className={`${styles.property_type }`}>
                                {propertyType['typeName']}  
                            </div>
                            <ShareSaveBtn/>
                        </div>
                        <div className={`${styles.property_name}`}>
                            <div className={`${styles.property_title}`}>
                                {title}
                            </div>
                            <div className={`${styles.property_subtitle}`}>
                                {address}
                            </div>
                        </div>

                        { roomCount.length > 0 && <Facilities data={{roomCount, guestCount }}/> }
                        { features.length > 0 &&  <About data={features} /> }
                        { amenities.length > 0 && <Amenities data={amenities}/> }

                        { <HomeRules data={homeRules} /> }
                        { <CancellationPolicy/> }                        
                        {  Object.keys(hosts).length > 0 && <Host data={hosts} reviewCount={review.length}/>}
                        
                            <Rating data={ratings}/>
                            <PostReview/>
                            <Review data={review}/>
                            <NearbyServices/>
                    </div>
                    <div className={`${styles.reservation_section}`}>
                
                        <BookingBox 
                            propertyId={propertyId}
                            hosts={hosts.map(item => item['id'])} 
                            data={pricingData} 
                            isAvailable = {isAvailable} />
                       
                    </div>
                </div>
            </div>
            <PaymentProvider>
                <PropertyReservationConfirmation 
                    propertyId={propertyId}
                    hosts={hosts}
                    data={pricingData}
                    isAvailable = {isAvailable}/>
                <CongratsMessage/>
            </PaymentProvider>
            <ImageDetails data={images}/>   
    </>
}

