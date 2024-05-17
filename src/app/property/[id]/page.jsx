
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
import mongoose from "mongoose";
import generateRandomCoordinates from '@/components/Utility/generateRandomCoordinates'
// import { ObjectId } from 'mongodb'
const objectId = require('mongodb').ObjectId; 


import propertyService from '@/service/PropertyService'
import storageService from '@/service/StorageService'
import PropertyImageDetails from '@/components/ImageDetails'
import ReservationProvider from '@/context/reservation/reservationContext'

// import { Client, Databases, Account, Query} from 'appwrite'
import { Client, Databases, Account, Query, Storage, Users } from 'node-appwrite'
import PropertyReservationConfirmation from './PropertyReservationConfirmation'
import CongratsMessage from './CongratsMessage'
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

import SearchMap from '@/components/SearchMap'

// import LocationMap from '@/components/LocationMap'
import LocationMap from './LocationMap'

const db_connection_uri = process.env.MONGODB_CONNECTION
const client = new MongoClient(db_connection_uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function getData(id) {


    await client.connect();
    const database = client.db('bedbd');
    const propertyListingCollection = database.collection("listingProperty");

    // const findQuery = {     ownerId: ownersUserId,
    //                   sessionStatus: {  $ne: 'complete'  } };

    // const resultArray = await propertyListingCollection.findOne({ _id: new ObjectId(id) });
    const result = await propertyListingCollection.aggregate([
                                                                        {
                                                                            $match: {
                                                                                _id: new ObjectId(id) // Convert id string to ObjectId
                                                                            }
                                                                        },
                                                                        {
                                                                            $lookup: {
                                                                                from: 'registeredUserInfo',
                                                                                localField: '_hosts',
                                                                                foreignField: '_id', 
                                                                                as: 'hosts'
                                                                            }
                                                                        },
                                                                        {
                                                                            $lookup: {
                                                                                from: 'homeRules',
                                                                                localField: '_homeRules',
                                                                                foreignField: '_id', 
                                                                                as: 'homeRules'
                                                                            }
                                                                        },
                                                                        {
                                                                            $lookup: {
                                                                            from: "propertyAmenities",
                                                                            localField: "_amenities",
                                                                            foreignField: "_id",
                                                                            as: "amenities"
                                                                            }
                                                                        },
                                                                        {
                                                                            $lookup: {
                                                                            from: "propertyFeatures",
                                                                            localField: "_propertyFeatures",
                                                                            foreignField: "_id",
                                                                            as: "propertyFeatures"
                                                                            }
                                                                        },
                                                                        {
                                                                            $lookup: {
                                                                            from: "propertyTypes",
                                                                            localField: "_propertyType",
                                                                            foreignField: "_id",
                                                                            as: "propertyType"
                                                                            }
                                                                        },
                                                                        {
                                                                            $lookup: {
                                                                            from: "propertyBookingTypes",
                                                                            localField: "_propertyBookingTypes",
                                                                            foreignField: "_id",
                                                                            as: "propertyBookingTypes"
                                                                            }
                                                                        },
                                                                        {
                                                                            $lookup: {
                                                                            from: "propertyState",
                                                                            localField: "_propertyStates",
                                                                            foreignField: "_id",
                                                                            as: "propertyStates"
                                                                            }
                                                                        },
                                                                        {
                                                                            $lookup: {
                                                                            from: "propertyRatingReviews",
                                                                            localField: "_ratingReviews",
                                                                            foreignField: "_id",
                                                                            as: "ratingReviews"
                                                                            }
                                                                        }
                                                                    ]).toArray();

    // console.log(result[0]);
    await client.close();
    // const {latitude, longitude } = generateRandomCoordinates(location[0], location[1])
    const composefullAddress = (address)=>  {
        let result = ''
        Object.entries(address)
            .map(([key, value], index)=>{
                if(value.trim().length === 0)
                    return
                else if(value.trim().length > 0 && result.length > 0 )
                    result = result + `, ${value}`
                else (index === 0)
                    result = result + value
                })
        return result
    }

    return {
            ...result[0],
            address:composefullAddress(result[0]['address']),
            location: generateRandomCoordinates(result[0]['location'][0], result[0]['location'][1]),
        }



    // const        APPWRITE_URL = process.env.APPWRITE_URL
    // const          PROJECT_ID = process.env.APPWRITE_PROJECT_ID
    // const             API_KEY = process.env.APPWRITE_BACKEND_API_KEY
    // const               DB_ID = process.env.APPWRITE_DB_BEDBD_ID
    // const PROPERTY_COLLECTION = process.env.APPWRITE_DB_COLLECTION_PROPERTY_ID

    // const RATING_REVIEW_COLLECTION = process.env.APPWRITE_DB_COLLECTION_RATING_REVIEW_ID

    // const     PROPERTY_IMAGES = process.env.APPWRITE_PROPERTY_IMAGE_FILE_BUCKET_ID
    
    // const client = new Client();
    //     client
    //         .setEndpoint(APPWRITE_URL)
    //         .setProject(PROJECT_ID)
    //         .setKey(API_KEY);

    // const databases = new Databases(client);
    // const   storage = new Storage(client);
    // const   users = new Users(client);


    try {
        // const data =  await databases.getDocument(
        //                             DB_ID,
        //                             PROPERTY_COLLECTION,
        //                             id)

        // console.log(result[0])
//         const { 
//             _id,
//             ownerId,
//             isPublished,

//             propertyType, 


//             propertyFeatures,
//             propertyBookingTypes,
//             propertyStates,

//             customPropertyStates,
//             customPropertyBookingTypes,
//             customPropertyFeatures,

//             title, 
//             description,

//             address,
//             location,
//             city,
//             country,
//             district,
//             thana,
//             timezone,
//             zipCode,


//             homeRules,
//             amenities,

//             bedCount,
//             guestCount,
//             roomCount,

//             checkInTime,
//             checkOutTime,
//             images,





//             isAvailable, 
//             rent, 
//             currency, 
//             serviceFee, 

            
//             hosts,

//             ratingReviews

//    } = result[0]



//    return { 
//     propertyId:_id,
//     ownerId,
//     isPublished,
//     propertyType, 
//     propertyFeatures,
//     propertyBookingTypes,
//     propertyStates,
//     customPropertyStates,
//     customPropertyBookingTypes,
//     customPropertyFeatures,
//     title, 
//     description,
//     address:composefullAddress(address),
//     location: { latitude, longitude },
//     city,
//     country,
//     district,
//     thana,
//     timezone,
//     zipCode,
//     homeRules,
//     amenities,
//     bedCount,
//     guestCount,
//     roomCount,
//     checkInTime,
//     checkOutTime,
//     images,
//     isAvailable, 
//     rent, 
//     currency, 
//     serviceFee, 
//     hosts,
//     ratingReviews
// }
        // const { 
        //     description,
        //     propertyType, 
        //     title, 
        //     address,
        //     isPublished, 
        //     isAvailable, 
        //     rent, 
        //     currency, 
        //     serviceFee, 
        //     images,
        //     amenities,
        //     ownerId, 
        //     hosts,
        //     propertyBookingTypes,
        //     customBookingTypesTitle,
        //     customBookingTypesDescription,

        //     homeRules,
        //     customHomeRulesTitle,
        //     customHomeRulesDescription,
        //     propertyFeatures,
        //     customFeaturesTitle,
        //     customFeaturesDescription,
        //     roomCount,
        //     bedCount,
        //     guestCount,
    
        //     propertyRatingReview    } = data


            // const ratingReviewResult =  await databases
            //                                 .listDocuments(
            //                                     DB_ID,
            //                                     RATING_REVIEW_COLLECTION,
            //                                     [Query.equal("propertyId", [data['$id']])])

                                    
                                                
            // const ratingReviews = ratingReviewResult.documents.map(item =>
            //                         (Object.entries(item)
            //                                 .reduce((acc, [key, value]) => {
            //                                     if (key.endsWith('Rating')) {
            //                                         const ratingKey = key.replace('Rating', ''); // Remove 'Rating' from the key
            //                                         acc.ratings = acc.ratings || {}; // Create ratings object if it doesn't exist
            //                                         acc.ratings[ratingKey] = value; // Assign the rating value to the ratings object
            //                                     }else if(key=== 'author'){
            //                                         acc[key] = {
            //                                                                 name: value['name'], 
            //                                                          description: value['description'],
            //                                                         profilePhoto: value['profilePhoto']
            //                                                                         .reduce((latest, current) => {
            //                                                                                 const latestTime = new Date(latest['$updatedAt']).getTime();
            //                                                                                 const currentTime = new Date(current['$updatedAt']).getTime();
            //                                                                                 return currentTime > latestTime ? current : latest;
            //                                                                             })['profilePhotoID'],
            //                                                               badges: value['badges']
            //                                                                         .map(i=>({ badgeName: i['badgeName'],
            //                                                                                         icon: {
            //                                                                                                 type: i['iconType'],
            //                                                                                                 name: i['iconName'],
            //                                                                                                 url:  i['iconUrl']
            //                                                                                             }
            //                                                                                     }))
            //                                                     }
            //                                     }else if(key=== 'reviewText' || key === '$updatedAt'){
            //                                         acc[key] = value;
            //                                     }
                                                
            //                                     // else {
            //                                     //     acc[key] = value; // Assign non-rating keys directly
            //                                     // }
            //                                     return acc;
            //                                 }, {}))).sort((a, b) => {
            //                                     const dateA = new Date(a['$updatedAt']);
            //                                     const dateB = new Date(b['$updatedAt']);
            //                                     return dateB - dateA; // Sort in descending order
            //                                   });
            
            // console.log('rating review')
            // console.log(ratingReviews[0])
            // console.log(ratingReviews[0]['author']['profilePhoto'])
            // console.log(ratingReviews[0]['author']['badges'])


            // const _hosts = hosts.map(item=> {

            //         const profilePhoto = item['profilePhoto'].reduce((latest, current) => {
            //                                                         const latestTime = new Date(latest.$updatedAt).getTime();
            //                                                         const currentTime = new Date(current.$updatedAt).getTime();
            //                                                         return currentTime > latestTime ? current : latest;
            //                                                     }); 
            //         const badges = item['badges'].map(i=>({ badgeName: i['badgeName'],
            //                                                 icon:{
            //                                                     type: i['iconType'],
            //                                                     name: i['iconName'],
            //                                                     url: i['iconUrl']
            //                                                     } 
            //                                                 })) 

            //                         return  ({    id: item['$id'],
            //                                     name: item['name'], 
            //                              description: item['description'], 
            //                             profilePhoto: profilePhoto['profilePhotoID'], 
            //                     // userVerificationInfo: item['userVerificationInfo'],
            //                                   badges: badges })})

            // const _amenities = amenities.map(item=> ({
            //                                title: item['title'], 
            //                          description: item['description'], 
            //                                 icon: item['icon'], 
            //                             category: item['category']
            //                         }))

            // const _homeRules = homeRules.map(item=>({title: item['title'], description: item['description']}))
            // if(customHomeRulesTitle.length>0){
            //     customHomeRulesTitle.forEach(item => {
            //         const textArray = item.split('_')
            //         const index = textArray[0]
            //         const title = textArray.slice(1).join('_')
            //         let description = '';
            //         customHomeRulesDescription.forEach(i=>{
            //             const txtArr = i.split('_')
            //             if(index === textArray[0] )
            //                 description = textArray.slice(1).join('_')
            //         })
            //         _homeRules.push({ title, description })
            //     })
            // }

            // const bookingTypes = propertyBookingTypes.map(item=>({title: item['title'], description: item['description']}))
            // if(customBookingTypesTitle.length>0){
            //     customBookingTypesTitle.forEach( item =>{
            //         const textArr = item.split('_')
            //         const idx = textArr[0]
            //         const title = textArr.slice(1).join('_')
            //         let description =''; 
            //         customBookingTypesDescription.forEach(i=>{ 
            //             const txtArr = i.split('_')
            //             if(idx === txtArr[0])
            //               description = txtArr.slice(1).join('_')
            //         })
            //         bookingTypes.push({ title, description })
            //     })
            // }


            // const features = propertyFeatures.map(featureItem=>({title: featureItem['title'], description: featureItem['description']}))
            // if(customFeaturesTitle.length>0){
            //     customFeaturesTitle.forEach(i=>{
            //         const textArr = i.split('_')
            //         const idx = textArr[0]
            //         const title = textArr.slice(1).join('_')
            //         let description =''; 
            //         customFeaturesDescription.forEach(item=>{ 
            //             const txtArr = item.split('_')
            //             if(idx == txtArr[0])
            //               description = txtArr.slice(1).join('_')
            //         })
            //         features.push({ title, description })
            //     })                              
            // }


        // if(data['$id'])
        //     return { 
        //         id: data['$id'],
        //         description, 
        //         propertyType, 
        //         title, 
        //         address,
        //         isPublished, 
        //         isAvailable, 
        //         rent, 
        //         currency, 
        //         serviceFee, 
        //         images,    
        //         amenities:_amenities,    
        //         ownerId, 
        //         hosts:_hosts,
        //         roomCount,
        //         bedCount,
        //         guestCount,

        //         features:[...bookingTypes, ...features ],
        //         homeRules: _homeRules,    
        //         propertyRatingReview:ratingReviews   } 


    } catch (err) {
        return false
    }


  }



export default async function Property({ params}) {

        const { 
            propertyId,
            ownerId,
            isPublished,
            propertyType, 
            propertyFeatures,
            propertyBookingTypes,
            propertyStates,
            customPropertyStates,
            customPropertyBookingTypes,
            customPropertyFeatures,
            title, 
            description,
            address,
            location,
            city,
            country,
            district,
            thana,
            timezone,
            zipCode,
            homeRules,
            amenities,
            bedCount,
            guestCount,
            roomCount,
            checkInTime,
            checkOutTime,
            images,
            isAvailable, 
            rent, 
            currency, 
            serviceFee, 
            hosts,
            ratingReviews
        } = await getData(params['id'])

        // console.log(result)
    // return <div>Loading...</div>

    // const id = params['id']
    // const property = await getData(id)
    // // console.log(property)


    // const {     id: propertyId,
    //             description,
    //             propertyType,
    //             title,
    //             address,
    //             isPublished,
    //             isAvailable,
    //             rent,
    //             currency,
    //             serviceFee,
    //             images,
    //             amenities,
    //             ownerId,
    //             hosts,
    //             features,
    //             homeRules,
    //             propertyRatingReview,
    //             roomCount,
    //             guestCount,
    //             bedCount
    //         } = property



// console.log(propertyRatingReview[0]['ratings'])
// console.log(propertyRatingReview[0]['author'])

const ratings = ratingReviews?.map(item => item['ratings'])
const review = ratingReviews?.map(item => ({
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
    // console.log(roomCount)
    // console.log(guestCount)
    // console.log(address)
    // console.log()

    // const fullAddress = (address)=> Object.entries(address).map(([key, value], index)=>{
    //     if(value.trim().length === 0)
    //         return
    //     else if(index === 0)
    //         return value
    //     else(value.trim().length > 0 && index != 0)
    //         return `, ${value}`

    //   }  ).join('')
        
        
        
        // {
        
        // let result = ''
        // Object.entries(address).forEach(([key, value], index)=> {



        //     if(index === 0){
        //         result = value
        //     }else if(value.trim().length > 0){
        //         result = result + ', ' + value
        //     }
        //   });



        // if(toString(address['aptFloor'].trim()).length > 0){
        //     result = address['aptFloor'] 
        // }
        // if(toString(address['streetAddress'].trim()).length > 0){
        //     result = result + ', ' + address['streetAddress'] 
        // }
        // if(toString(address['addressOne'].trim()).length > 0){
        //     result = result + ', ' + address['addressOne'] 
        // }
        // if(toString(address['addressTwo'].trim()).length > 0){
        //     result = result + ', ' + address['addressTwo'] 
        // }
    //     return result
    //     // return address['aptFloor']
    // }
    
    
    return <>
            <div className={`container  ${styles.property_details}`} >
                <div className='w-100 h-100'>
                    <ImageGallery data={images.slice(0, 4)} totalImageCount={images.length}/>
                    <div className={`${styles.geographical_map}`}>
                        <LocationMap location={location}/>
                    </div> 
                </div>
                <div className={`${styles.property_descriptions } `} >
                    <div className={`${styles.attributes_details}`}>
                        <div className='flex flex-row w-100 space-between mr-top-700 mr-btm-700 '>
                            <div className={`${styles.property_type } `}>
                                {propertyType[0]['typeName']}  
                            </div>
                            <ShareSaveBtn/>
                        </div>
                        <div className={`${styles.property_name} `}>
                            <div className={`${styles.property_title}`}>
                                {title}
                            </div>
                            <div className={`${styles.property_subtitle}`}>
                                {address}
                            </div>
                        </div>

                        { roomCount.length > 0 && <Facilities data={{roomCount, guestCount }}/> }

                        { propertyFeatures.length > 0 &&  <About data={propertyFeatures} /> }
                        { amenities.length > 0 && <Amenities data={amenities}/> }

                        { <HomeRules data={homeRules} /> }
                        { <CancellationPolicy/> }                        
                        {  Object.keys(hosts).length > 0 && <Host data={hosts} reviewCount={review.length}/>}
                        
                            {/* <Rating data={ratings}/>
                            <PostReview/>
                            <Review data={review}/>
                            <NearbyServices/> */}
                    </div>
                    <div className={`${styles.reservation_section} max-width-490px marker-class`}>
                
                        {/* <BookingBox 
                            propertyId={propertyId}
                            hosts={hosts.map(item => item['id'])} 
                            data={pricingData} 
                            isAvailable = {isAvailable} /> */}
                       
                    </div>
                </div>
            </div>
            {/* <PaymentProvider>
                <PropertyReservationConfirmation 
                    propertyId={propertyId}
                    hosts={hosts}
                    data={pricingData}
                    isAvailable = {isAvailable}/>
                <CongratsMessage/>
            </PaymentProvider> */}
            <ImageDetails data={images}/>   
    </>
}

