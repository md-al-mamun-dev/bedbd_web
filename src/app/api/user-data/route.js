import { NextResponse } from "next/server";
import { Client, Account, Databases, Query } from "node-appwrite";


export async function GET(request, response) {
  const token = request.headers.get('Authorization').split(' ')[1];
  const userClient = new Client()
                          .setEndpoint(process.env.APPWRITE_URL)
                          .setProject(process.env.APPWRITE_PROJECT_ID)
                          .setJWT(token);
  const userAccount = new Account(userClient);
  const database = new Databases(userClient);
  try {
    const userInformation = await userAccount.get();
    if(userInformation){
      try {
        const registeredUserData = await  database.listDocuments(
          process.env.APPWRITE_DB_BEDBD_ID,
          process.env.APPWRITE_HOST_COLLECTION_ID,
          [
            Query.equal('userId', [userInformation['$id']]),
          ]
        )
        if(registeredUserData){
          const data = {  id: userInformation['$id'],
                          name: userInformation['name'],
                          email: userInformation['email'],
                          phone: userInformation['phone'],
                          pref: userInformation['prefs'],

                          registeredId: registeredUserData['documents'][0]['$id'],
                          presentAddress :registeredUserData['documents'][0]['presentAddress'],
                          permanentAddress :registeredUserData['documents'][0]['permanentAddress'],
                          description :registeredUserData['documents'][0]['description'],
                          showProfilePhoto :registeredUserData['documents'][0]['showProfilePhoto'],
                          profilePhoto :registeredUserData['documents'][0]['profilePhoto'],
                          badges :registeredUserData['documents'][0]['badges'],
                          dateOfBirth :registeredUserData['documents'][0]['dob'],
                        }
          return NextResponse.json({...data});
        }

      } catch (error) {
        
      }
    }
  } catch (error) {
    
  }

  
}
