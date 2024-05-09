import { NextResponse } from "next/server";
import { Readable } from "stream";
// import formidable from 'formidable';
import fs from 'fs';
import { MongoClient } from "mongodb";
import generateFileName from "@/components/Utility/generateFileName";


function createReadableStream(file) {
    return new Promise((resolve, reject) => {
        const result = {
            stream: new Readable(),
            fileName: null,
            size: null,
            base64: null
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
                        result.base64 = Buffer.concat(chunks).toString('base64'); // Convert chunks to base64
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
            result.stream.push(null);
            resolve(result);
        }
    });
}

export async function POST(request, response) {

    const formData = await request.formData();

    const propertySessionId = formData.get('propertySessionId');

    const imagesData = [];

    // console.log('sessionId')
    // console.log(sessionId)


     for (const [key, value] of formData.entries()) {
        // if(key === 'propertySessionId'){
        //     console.log('propertySessionId')
        //     console.log(value)
        // }

        if(key==='property-image'){
            // const { stream: propertyImageStream, fileName: propertyImageFileName,  size: fileSize, base64: fileBase64  } = createReadableStream(value);
            // const imageFile = new InputFile(propertyImageStream, generateFileName(propertyImageFileName), fileSize);

            const { stream: propertyImageStream, fileName: propertyImageFileName, size: fileSize, base64: fileBase64 } = await createReadableStream(value);
            imagesData.push({
                // _id: undefined,
                fileName: generateFileName(propertyImageFileName),
                size: fileSize,
                data: fileBase64,
                propertySessionId,
                isDeleted: false
            });
            
            // console.log('Base64:', fileBase64);
            // console.log(propertyImageStream)
            // console.log(propertyImageFileName)

            // console.log(fileSize)

            // console.log(fileBase64)
        }
     }
    //  console.log(propertySessionId)

    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db('bedbd');
        const collection = database.collection('images');

        // Insert document with base64 data
        const imageInsertResult = await collection.insertMany(imagesData);
        if(imageInsertResult){
            if(imageInsertResult['acknowledged']){
                console.log(imageInsertResult['insertedIds']['0'])
                console.log(imageInsertResult['insertedIds']['1'])
                console.log(imageInsertResult['insertedIds']['2'])

            }

        }

        console.log('Files inserted successfully.');
    } finally {
        await client.close();
    }



}