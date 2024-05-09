import { NextResponse } from "next/server";
// import { Client, Account  } from "node-appwrite";
import { MongoClient, ServerApiVersion } from "mongodb";
import { Client, Account, Databases, Query } from "node-appwrite";

const db_connection_uri = process.env.MONGODB_CONNECTION
const client = new MongoClient(db_connection_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function readDataFromCollection(collection) {
    const database = client.db('bedbd');
    const dataCollection = database.collection(collection);
    // const propertyTypeCollection = database.collection("propertyTypes");
    await client.connect();
    try {
      const result = await dataCollection.find().toArray();
    } catch (error) {
      if(result.length > 0 ){
        console.log(result)
        return NextResponse.json({ propertyTypes: result });
      }else{
        const response = NextResponse.init();
        return response.status(404).json({ error: 'No data found' });
      }
    }finally{
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


  try {
    const userInformation = await userAccount.get();
    if(userInformation){
      try {
        await client.connect();
        const database = client.db('bedbd');
        const propertyTypeCollection = database.collection("propertyTypes");
        try {
          const result = await propertyTypeCollection.find().toArray();
          if(result.length > 0 ){
            console.log(result)
            return NextResponse.json({ propertyTypes: result });
          }else{
            return response.status(404).json({ error: 'No data found' });
          }
        } catch (err) {
          console.error(`Something went wrong : ${err}\n`);
          return response.status(500).json({ error: err.message });
        }
      } finally {
        await client.close();
      }
    }
  } catch (error) {
    
  }






    

}
