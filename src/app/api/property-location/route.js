import { NextResponse } from "next/server";
import { Readable } from "stream";
import { Client, Account,  Databases, Storage, Role, Permission, ID, InputFile, Query  } from "node-appwrite";
import generateFileName from "@/components/Utility/generateFileName";
// import { numberToWords } from "@/components/Utility/numberToWords";  



const client = new Client()
                   .setEndpoint(process.env.APPWRITE_URL)
                   .setProject(process.env.APPWRITE_PROJECT_ID)
                   .setKey(process.env.APPWRITE_BACKEND_API_KEY);

const databases = new Databases(client);
// const storage = new Storage(client);

function generateRandomCoordinates(lat, lon) {
    // Convert latitude and longitude from degrees to radians
    const minRadius = 200; 
    const maxRadius = 300;
    const latInRadians = lat * Math.PI / 180;
    const lonInRadians = lon * Math.PI / 180;

    // Generate random offset within the specified range (in meters)
    const randomRadius = Math.random() * (maxRadius - minRadius) + minRadius;

    // Generate random angle in radians
    const randomAngle = Math.random() * 2 * Math.PI;

    // Calculate new latitude and longitude
    const newLat = latInRadians + (randomRadius / 6371000) * Math.cos(randomAngle);
    const newLon = lonInRadians + (randomRadius / (6371000 * Math.cos(latInRadians))) * Math.sin(randomAngle);

    // Convert back from radians to degrees
    const newLatInDegrees = newLat * 180 / Math.PI;
    const newLonInDegrees = newLon * 180 / Math.PI;

    return { latitude: newLatInDegrees, longitude: newLonInDegrees };
}


export async function GET(request, response) {
    const userId = request.nextUrl.searchParams.get('userId')
    const propertyId = request.nextUrl.searchParams.get('propertyId')
    
    try {
        const locationData = await databases.listDocuments(
                        process.env.APPWRITE_DB_BEDBD_ID,
                        process.env.APPWRITE_DB_COLLECTION_LOCATION_ID,
                        [ Query.equal('propertyId', [propertyId]) ])
            const {lat, lng} = locationData['documents'][0]
            const {latitude, longitude } = generateRandomCoordinates(lat, lng)
            
        if(userId === null){    
            return NextResponse.json({ 'propertyId' : propertyId, 
                                              'lat' : latitude, 
                                              'lng' : longitude, 
                                           'marker' : 'circle', });
        }else{
            try {
                const authorizationData =  databases.listDocuments(
                    process.env.APPWRITE_DB_BEDBD_ID, 
                    process.env.APPWRITE_DB_COLLECTION_LOCATION_AUTHORIZATION_ID,
                    [ Query.equal('authTxt', [userId+'_'+propertyId+'_r', userId+'_'+propertyId+'_w']) ])
                
                const authInfo = authorizationData['documents'].filter( item => item['isValid'] === true )
                if(authInfo.length > 0 ){
                    return NextResponse.json({  'propertyId' : propertyId, 
                                                       'lat' : lat, 
                                                       'lng' : lng,
                                                    'marker' : 'pin', });
                }else{
                    return NextResponse.json({  'propertyId' : propertyId, 
                                                       'lat' : latitude, 
                                                       'lng' : longitude, 
                                                    'marker' : 'circle', });
                }
            } catch (error) {
                return NextResponse.json({ 'propertyId' : propertyId, 
                                                  'lat' : latitude, 
                                                  'lng' : longitude, 
                                               'marker' : 'circle', });
            }
        }
        
    } catch (error) {
        
    }
}