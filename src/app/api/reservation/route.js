import { NextResponse } from "next/server";
import { Readable } from "stream";
import { Client, Account,  Databases, Storage, Role, Permission, ID, InputFile, Users  } from "node-appwrite";
import generateFileName from "@/components/Utility/generateFileName";



export async function POST(request, response) {

    // console.log(response)
 
    const data = await request.formData();
    console.log(JSON.stringify(JSON.parse(data)))

//  const userId = registrationData.get('userId')
//  const userInformation = await users.get(userId);

//  const userName = registrationData.get('name')
//  if(userName.length > 0 && userInformation['name'] !==  userName ){
//    const userNameUpdate = await users.updateName( userInformation['$id'], userName)
//  }

//  let prefsData={};
//  const userFathersName = registrationData.get('fathersName')
//  const userMothersName = registrationData.get('mothersName')
//  const userPresentAddress = registrationData.get('presentAddress')
//  const userPermanenetAddress = registrationData.get('permanenetAddress')


//  if(userFathersName.length > 0)
//    prefsData={ fathersName: userFathersName }
//  if(userMothersName.length > 0)
//    prefsData={...prefsData, mothersName: userMothersName }
//  if(userPresentAddress.length > 0)
//    prefsData={...prefsData, presentAddress: userPresentAddress }
//  if(userPermanenetAddress.length > 0)
//    prefsData={...prefsData, permanenetAddress: userPermanenetAddress }
//  const userPrefUpdate = await users.updatePrefs(userInformation['$id'], prefsData)

//  if (userInformation && registrationData) {
//    const { stream: userPhotoReadableStream, fileName: userProfilePhotoFileName,  size: userProfilePhotoFilesize  } = createReadableStream(registrationData, 'userPhoto');
//    const profileImgFile = new InputFile(userPhotoReadableStream, generateFileName(userProfilePhotoFileName), userPhotoReadableStream.readableLength);
//    const profileImgUpload = await storage.createFile(
//                                            process.env.APPWRITE_USER_PROFILE_IMAGE_BUCKET_ID,
//                                            ID.unique(),
//                                            profileImgFile,
//                                            [Permission.read(Role.user(userInformation['$id']+'/verified'))]);

//    const { stream: varificationPhotoReadableStream, fileName: varificationPhotoFrontFileName, size: varificationPhotoFrontFilesize } = createReadableStream(registrationData, 'verificationDocFront');
//    const verificationImgFileFront = new InputFile(varificationPhotoReadableStream, generateFileName(varificationPhotoFrontFileName), varificationPhotoReadableStream.readableLength);
//    const verificationImgFileFrontUpload = await storage.createFile(
//                                            process.env.APPWRITE_USER_VERFIFICATION_FILE_BUCKET_ID,
//                                            ID.unique(),
//                                            verificationImgFileFront,
//                                            [Permission.read(Role.user(userInformation['$id']+'/verified'))]);

//    const { stream: varificationPhotoBackReadableStream, fileName: varificationPhotoBackFileName, size: varificationPhotoBackFilesize } = createReadableStream(registrationData, 'verificationDocBack');
//    const verificationDocFileBack = new InputFile(varificationPhotoBackReadableStream, generateFileName(varificationPhotoBackFileName), varificationPhotoReadableStream.readableLength);
//    const verificationImgFileBackUpload = await storage.createFile(
//                                            process.env.APPWRITE_USER_VERFIFICATION_FILE_BUCKET_ID,
//                                            ID.unique(),
//                                            verificationDocFileBack,
//                                            [Permission.read(Role.user(userInformation['$id']+'/verified'))]);

//    if (profileImgUpload && verificationImgFileFrontUpload && verificationImgFileBackUpload){

//      const verificationDocInfo = {
//                userId: userInformation['$id'],
//                filesIdRefs: [verificationImgFileFrontUpload['$id'], verificationImgFileBackUpload['$id'],],
//                verificationDocumentType: registrationData.get('verificationDocType'),
//                verificationIdNumber: registrationData.get('idNumber')
//             }
//      const verificationInfoResult =  await databases.createDocument(
//                                        process.env.APPWRITE_DB_BEDBD_ID,
//                                        process.env.APPWRITE_USER_VERFIFICATION_INFO_COLLECTION_ID,
//                                        ID.unique(),
//                                        verificationDocInfo,
//                                        [Permission.read(Role.user(userInformation['$id']+'/verified'))]
//                                    )

//    const profilePhotoInfo = {  userId: userInformation['$id'],
//                                profilePhotoID: profileImgUpload['$id']}

//    const profilePhotoInfoResult =  await databases.createDocument(
//                                        process.env.APPWRITE_DB_BEDBD_ID,
//                                        process.env.APPWRITE_USER_PROFILE_INFO_COLLECTION_ID,
//                                        ID.unique(),
//                                        profilePhotoInfo,
//                                        [Permission.read(Role.user(userInformation['$id']+'/verified'))]
//                                    )
   
//    const hostInfo = {
//      userId: userInformation['$id'],
//      name: userName,
//      profilePhoto: [profilePhotoInfoResult['$id']],
//      userVerificationInfo: [verificationInfoResult['$id']],
//      presentAddress: userPresentAddress,
//      permanentAddress: userPermanenetAddress,
//      }
//    const hostInfoResult =  await databases.createDocument(
//                                    process.env.APPWRITE_DB_BEDBD_ID,
//                                    process.env.APPWRITE_HOST_COLLECTION_ID,
//                                    ID.unique(),
//                                    hostInfo,
//                                    [Permission.read(Role.user(userInformation['$id']+'/verified'))]
//                                )
//    console.log(hostInfoResult)

//    }
//  }

 return NextResponse.json({ id: 'uuid' });
}