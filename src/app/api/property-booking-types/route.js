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
        const propertyStateCollection = database.collection("propertyBookingTypes");
        const result = await propertyStateCollection.find().toArray();
        if(result.length > 0){
          console.log(result)
          return NextResponse.json({ propertyBookingTypes: result });
        }else{
          return response.json({ error: 'No data found' });
        }
      } catch (error) {
        return response.json({ error: 'No data found' });
      }finally {
        await client.close();
      }
    }
    
  } catch (error) {
    console.log(error)
  }
  return NextResponse.json({ data: 'data' });
}

