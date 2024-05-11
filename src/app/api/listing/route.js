import { NextResponse } from "next/server";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import { Client, Account, Databases, Query } from "node-appwrite";


const db_connection_uri = process.env.MONGODB_CONNECTION
const client = new MongoClient(db_connection_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function findOwnersProperty(ownersUserId) {

  try {
    await client.connect();
    const database = client.db('bedbd');
    const propertyListingCollection = database.collection("listingProperty");

    const findQuery = {
                            ownerId: ownersUserId,
                      sessionStatus: { 
                                      $ne: 'complete' 
                                    }
                      };

    try {
      // const findResult = await propertyListingCollection.find(findQuery);
      const resultArray = await propertyListingCollection.find(findQuery).toArray();
      if(resultArray.length > 0){
        return resultArray
      }else{
        try {
          const newPropertyResult = await propertyListingCollection.insertOne({
            ownerId: ownersUserId , 
            // isCreateSessionActive: true,
            isPublished:false,
            hosts:[ownersUserId],
            sessionStatus:'property-type',
            _createAt: new Date()
          })

          return [newPropertyResult]
        } catch (error) {
          
        }
      }
      // if(resultArray.length < 1){
        
      // }


      
    } catch (err) {
      console.error(`Something went wrong trying to find one document: ${err}\n`);
    }

   
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function GET(request, response) {

  const token = request.headers.get('Authorization').split(' ')[1];
  const userClient = new Client()
                          .setEndpoint(process.env.APPWRITE_URL)
                          .setProject(process.env.APPWRITE_PROJECT_ID)
                          .setJWT(token);

  const userAccount = new Account(userClient);
  const databases = new Databases(userClient);

  try {
    const userInformation = await userAccount.get();
    if(userInformation){
      const result = await findOwnersProperty(userInformation['$id']).catch(console.dir);
      return NextResponse.json({documents: result});
    }
  } catch (error) {
    console.log(error)
  }

  // const result = await findOwnersProperty(userInformation['$id']).catch(console.dir);
  // return NextResponse.json({properties: result});

  // return NextResponse.json({data:'....'});
  
}

export async function PATCH(request, response) {
  const token = request.headers.get('Authorization').split(' ')[1];
  const userClient = new Client()
                          .setEndpoint(process.env.APPWRITE_URL)
                          .setProject(process.env.APPWRITE_PROJECT_ID)
                          .setJWT(token);

  const userAccount = new Account(userClient);


  const body = await request.json()
  const params  = request.nextUrl.searchParams
  const id  = params.get('id')

  try {
    const userInformation = await userAccount.get();
    if(userInformation){
      try {
        await client.connect();
        const database = client.db('bedbd');
        const listingPropertyCollection = database.collection("listingProperty");
    
        try { 
          const newPropertyResult = await listingPropertyCollection
                                            .updateOne({ _id: new ObjectId(id) },
                                                            { $set: { ...body, _updateAt: new Date()} })
          if(newPropertyResult){
            console.log(newPropertyResult)
    
           if(newPropertyResult['modifiedCount'] == 1){
    
            console.log(newPropertyResult)
            // const response = NextResponse;
            return NextResponse.json({ documents: newPropertyResult });
           }
          }
          // return [newPropertyResult]
        } catch (error) {
          console.log(error)
          // const response = NextResponse();
          return response.status(400).json({ error: 'Document update failed' })
        }
    
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
  } catch (error) {
    
  }
  


  


  return NextResponse.json({data:'....'});
  
}
