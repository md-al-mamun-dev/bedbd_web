import { NextResponse } from "next/server";

import { Client, Account, Databases, Query } from "node-appwrite";
const client = new Client()
                   .setEndpoint(process.env.APPWRITE_URL)
                   .setProject(process.env.APPWRITE_PROJECT_ID)
                   .setKey(process.env.APPWRITE_BACKEND_API_KEY);

const admin_databases = new Databases(client);



export async function POST(request, response) {
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
      try {
        const ownersHostInfo = await  databases.listDocuments(
              process.env.APPWRITE_DB_BEDBD_ID,
              process.env.APPWRITE_HOST_COLLECTION_ID,
              [
                Query.equal('userId', [userInformation['$id']]),
              ]
            )

        if(ownersHostInfo){
          try {

            // In this place admin_databases is use,
            //  for not working appwrite as usal
            // It need to be fix with new database role assigned
            const result_property =  await admin_databases.listDocuments(
              process.env.APPWRITE_DB_BEDBD_ID,
              process.env.APPWRITE_DB_COLLECTION_PROPERTY_ID,
              [ Query.equal('userId', [userInformation['$id']]) ]
            )
  
            if(result_property){
              console.log(ownersHostInfo)
              console.log(result_property)
            }
          } catch (error) {
            const hasNoPropertyAtAll = error['type']==='general_query_invalid'
            console.log(error)
          }
          // console.log(process.env.APPWRITE_DB_COLLECTION_PROPERTY_ID)
          

          return NextResponse.json({data:'....'});
          // const propertyResult = await databases.listDocuments(
            // process.env.APPWRITE_DB_BEDBD_ID,
            // process.env.APPWRITE_DB_COLLECTION_PROPERTY_ID
            // [
              // Query.equal('userId', [userInformation['$id']]),
              // Query.equal('hosts', [ownersHostInfo['documents'][0]['$id']]),
            // ]
          // )

          // if(propertyResult){

          //   console.log('Property Result')
          //   console.log(propertyResult)
          // }
          
          





          // create a empty property Listing
          // const data =  {
          //   hostId: ownersHostInfo.documents[0]['$id'],
          //   hosts: [userInformation['$id']]
          // }
          // const propertyCreateResult = await databases.createDocument(
          //                   process.env.APPWRITE_DB_BEDBD_ID, 
          //                   process.env.APPWRITE_DB_COLLECTION_PROPERTY_ID, 
          //                   ID.unique(),
          //                   data)


        }

      } catch (error) {
        
      }
    }
  } catch (error) {
    
  }


  return NextResponse.json({data:'....'});
  
}
