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

  // user authentication check
  // =========================
  const token = request.headers.get('Authorization').split(' ')[1];

  console.log(token)
  const userClient = new Client()
                          .setEndpoint(process.env.APPWRITE_URL)
                          .setProject(process.env.APPWRITE_PROJECT_ID)
                          .setJWT(token);
  const userAccount = new Account(userClient);
  const databases = new Databases(userClient);

  try {
    const userInformation = await userAccount.get();
    if(userInformation){
        console.log('user information bellow')
        console.log(userInformation)
      try {
        await client.connect();
        const database = client.db('bedbd');
        const homeRulesCollection = database.collection("homeRules");
        try {
          const result = await homeRulesCollection.find().toArray();
          if(result.length > 0 ){
            console.log(result)
            return NextResponse.json({ documents: result });
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





  return NextResponse.json({ data:[] });

    

}
