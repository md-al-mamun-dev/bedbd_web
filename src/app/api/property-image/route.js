import { NextResponse } from "next/server";
import { Readable } from "stream";
// import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import generateFileName from "@/components/Utility/generateFileName";
import { Client, Account, Databases, Query } from "node-appwrite";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";


const db_connection_uri = process.env.MONGODB_CONNECTION
const client = new MongoClient(db_connection_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});





// function createReadableStream(file) {
//     return new Promise((resolve, reject) => {
//         const result = {
//             stream: new Readable(),
//             fileName: null,
//             size: null,
//             base64: null
//         };

//         if (file instanceof File) {
//             result.fileName = file.name;
//             result.size = file.size;
//             const reader = file.stream().getReader();
//             const chunks = [];

//             // Read file chunks into an array
//             const read = async () => {
//                 try {
//                     const { done, value: chunk } = await reader.read();
//                     if (done) {
//                         result.base64 = Buffer.concat(chunks).toString('base64'); // Convert chunks to base64
//                         resolve(result);
//                     } else {
//                         chunks.push(chunk);
//                         result.stream.push(chunk);
//                         read();
//                     }
//                 } catch (error) {
//                     reject(error);
//                 }
//             };
//             read();
//         } else {
//             result.stream.push(null);
//             resolve(result);
//         }
//     });
// }
async function saveFileToDirectory(fileStream, fileName) {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(path.join(process.cwd(), 'public', 'images', 'property', fileName));

        fileStream.pipe(writeStream);

        writeStream.on('finish', () => {
            resolve();
        });

        writeStream.on('error', (error) => {
            reject(error);
        });
    });
}
function createReadableStream(file) {
    return new Promise((resolve, reject) => {
        const result = {
            stream: new Readable(),
            fileName: null,
            size: null,
            // base64: null
        };

        if (file instanceof File) {
            result.fileName = file.name;
            result.size = file.size;
            const reader = file.stream().getReader();
            const chunks = [];

            // Read file chunks into an array
            const read = async () => {
                try {
                    const { done, value: chunk } = await reader.read();
                    if (done) {
                        result.stream.push(null); // Signal end of stream
                        resolve(result);
                    } else {
                        chunks.push(chunk);
                        result.stream.push(chunk);
                        read();
                    }
                } catch (error) {
                    reject(error);
                }
            };
            read();
        } else {
            result.stream.push(null); // Signal end of stream
            resolve(result);
        }
    });
}
export async function POST(request, response) {
    const token = request.headers.get('Authorization').split(' ')[1];
    // async function updateProperty({propertyId, data}){
    //     let query = process.env.NEXT_PUBLIC_API_URL + `/api/listing?id=${propertyId}`
    //     const response = await fetch(query , {
    //       method: 'PATCH',
    //       headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${token}`,
    //           },
    //       body: JSON.stringify(data)
    //       });
    
    //       if(response){
    //         console.log(response.json)
    //       }
    //   }
    const userClient = new Client()
                            .setEndpoint(process.env.APPWRITE_URL)
                            .setProject(process.env.APPWRITE_PROJECT_ID)
                            .setJWT(token);
  
    const userAccount = new Account(userClient);
    const databases = new Databases(userClient);

    const formData = await request.formData();
    const propertyId = formData.get('propertyId');
    const imagesData = [];
    try {
        const userInformation = await userAccount.get();
        if(userInformation){
            for (const [key, value] of formData.entries()) {
                if (key === 'property-image') {
                    const { stream: propertyImageReadableStream, fileName: propertyImageFileName, size } = await createReadableStream(value); // Assuming value is an object with buffer and fileName properties
                    const fileName = generateFileName(propertyImageFileName);
                    await saveFileToDirectory(propertyImageReadableStream, fileName);
        
                    imagesData.push({
                        _id: new ObjectId(),

                        fileName,
                        // size,
                        // propertyId,
                        pathName:'/images/property/',
                        // isDeleted: false
                    });
                }
            }

            try {
                await client.connect();
                const database = client.db('bedbd');
                const listingPropertyCollection = database.collection("listingProperty");
                const imageCollection = database.collection('images');
                
                console.log(propertyId)
                
                const result = await listingPropertyCollection.findOne({ _id: new ObjectId(propertyId) });

                console.log(result)

                // const allImages = imagesData.map(img => ({ imageUrl: `${img['fileName']}`,  isDeleted: img['isDeleted'] }) );
                const images = ()=> typeof result === 'object' && result.hasOwnProperty('images')
                                        ? [ ...result['images'], ...imagesData ]
                                        : imagesData

                const newPropertyResult = await listingPropertyCollection
                                        .updateOne({ _id: new ObjectId(propertyId) },
                                                        { $set: { 
                                                                images: images(),
                                                                _updateAt: new Date()
                                                                } })
                if(newPropertyResult['acknowledged']){
                    console.log(newPropertyResult)
                    return NextResponse.json({ isSuccess: true, images: imagesData });
                }

                // if(result['images'].length > 0){
                //     console.log([...result['images'], ...allImages])

                //     const newPropertyResult = await listingPropertyCollection
                //                                         .updateOne({ _id: new ObjectId(propertyId) },
                //                                                         { $set: { images: [...result['images'], ...imagesData] } })

                //     if(newPropertyResult){
                //         console.log(newPropertyResult)
                //     }
                // }else{
                //     const newPropertyResult = await listingPropertyCollection
                //     .updateOne({ _id: new ObjectId(propertyId) },
                //                     { $set: { images: allImages } })

                //     if(newPropertyResult){
                //     console.log(newPropertyResult)
                //     }
                // }
                // if(result['images'].length > 0 ){
                //     const images = [...result['images'], ...imagesData ]
                //     const newPropertyResult = await listingPropertyCollection
                //                                             .updateOne({ _id: new ObjectId(propertyId) },
                //                                                             { $set: { images: images} })

                //     if(newPropertyResult){
                //         console.log(newPropertyResult)
                //     }
                // }
                // console.log('findOne result:', result);

                //   try { 
                //         const newPropertyResult = await listingPropertyCollection
                //                                         .updateOne({ _id: new ObjectId(propertyId) },
                //                                                         { $set: { images: imagesData} })
                //         if(newPropertyResult){
                //         console.log(newPropertyResult)
                
                //         if(newPropertyResult['modifiedCount'] == 1){
                
                //         console.log(newPropertyResult)
                //         // const response = NextResponse;
                //         return NextResponse.json({ documents: newPropertyResult });
                //          }
                //         }
                //         // return [newPropertyResult]
                //     } catch (error) {
                //         console.log(error)
                //         // const response = NextResponse();
                //         return response.status(400).json({ error: 'Document update failed' })
                //     }
            
              } finally {
                // Ensures that the client will close when you finish/error
                await client.close();
              }
            
        }
      } catch (error) {
        console.log(error)
      }









    










    // const token = request.headers.get('Authorization').split(' ')[1];
    // const userClient = new Client()
    //                         .setEndpoint(process.env.APPWRITE_URL)
    //                         .setProject(process.env.APPWRITE_PROJECT_ID)
    //                         .setJWT(token);
  
    // const userAccount = new Account(userClient);
  
  
    // const body = await request.json()
    // const params  = request.nextUrl.searchParams
    // const id  = params.get('id')

    if(imagesData.length > 0){
        return NextResponse.json({ 'image-results' :  imagesData });
    }





    // store image into mongodb 
    // const uri = 'mongodb://localhost:27017';
    // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // try {
    //     await client.connect();
    //     const database = client.db('bedbd');
    //     const imageCollection = database.collection('images');

    //     // Insert document with base64 data
    //     const imageInsertResult = await collection.insertMany(imagesData);
    //     if(imageInsertResult){
    //         if(imageInsertResult['acknowledged']){
    //             console.log(imageInsertResult['insertedIds']['0'])
    //             console.log(imageInsertResult['insertedIds']['1'])
    //             console.log(imageInsertResult['insertedIds']['2'])

    //         }

    //     }

    //     console.log('Files inserted successfully.');
    // } finally {
    //     await client.close();
    // }



}

export async function DELETE(request, response) {
    const token = request.headers.get('Authorization').split(' ')[1];
    const userClient = new Client()
                            .setEndpoint(process.env.APPWRITE_URL)
                            .setProject(process.env.APPWRITE_PROJECT_ID)
                            .setJWT(token);
  
    const userAccount = new Account(userClient);
    const databases = new Databases(userClient);

    //                            // const formData = await request.formData();
    //                            // const propertyId = formData.get('propertyId');
    //                            // const imageId = formData.get('imageId');
    const params  = request.nextUrl.searchParams
    const propertyId  = params.get('property')
    const id  = params.get('id')

    // console.log(propertyId)
    // console.log(id)

    try {
        const userInformation = await userAccount.get();
        if(userInformation){
            console.log(userInformation)
            await client.connect();
            const database = client.db('bedbd');
            const listingPropertyCollection = database.collection("listingProperty");
            const imageCollection = database.collection('images');
            const deletedPropertyImage =  database.collection('deletedPropertyImage')
            const property = await listingPropertyCollection.findOne({ _id: new ObjectId(propertyId) });
            if(property){
                // console.log(property)
                if(property['ownerId'] === userInformation['$id']){
                    console.log(property['ownerId'])
                    console.log(userInformation['$id'])
                    
                    const updateImages = property['images'].filter(img => (img['_id'] != id   ))
                    const deletedImages = property['images'].find(img => (img['_id'] == id   ))

                    console.log(updateImages)

                                                            // { $set: { images: property['images']} })
                    

                    // delete on storage
                    const imagePath = path.join(process.cwd(), 'public', 'images', 'property', deletedImages['fileName']);

                        try {
                            // Check if file exists
                            if (fs.existsSync(imagePath)) {
                            // Delete the file
                                fs.unlinkSync(imagePath);
                                console.log('deleted successfully')

                                // const deleteImageData = await deletedPropertyImage.insertOne({
                                //     imageId: deletedImages['_id'],
                                //     fileName: deletedImages['fileName'],
                                //     pathName: deletedImages['pathName'],
                                //     propertyId: propertyId,
                                //     _createAt: new Date()
                                // })

                            const newPropertyResult = await listingPropertyCollection
                                            .updateOne({ _id: new ObjectId(propertyId) },
                                                            { $set: { images: updateImages, _updateAt: new Date()} })

                            console.log(newPropertyResult)
                            if(newPropertyResult){
                                return NextResponse.json({ isSuccess: true, message: 'Item successfully deleted' });
                            }
                            // res.status(200).json({ message: 'Image deleted successfully' });
                            } else {
                            // res.status(404).json({ message: 'Image not found' });
                            }
                        } catch (error) {
                            console.error('Error deleting image:', error);
                            // res.status(500).json({ message: 'Internal server error' });
                        }




                    
                }
            }
            // console.log(property['ownerId'])
            // console.log(userInformation['$id'])
            await client.close();
        }
    } catch (error) {
        
    }


    

    
}