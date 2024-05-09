import { ID, Storage, Permission, Role, Databases, Query } from "appwrite";
import conf from "@/conf/config";
import appwriteClient from "./config";


export class PaymentService{
    databases;
    bedbdDbId;
    paymentOptions;
    // termsConditionCollectionId
    constructor(){
        this.databases                  = new Databases(appwriteClient)
        this.bedbdDbId                  = conf.appwriteBedbdDatabaseId
        this.paymentOptions             = conf.paymentOptionCollectionId

        // this.termsConditionCollectionId = conf.appwriteTermsConditionCollectionId
    }
    async getPaymentOptions(){

        try {
            const data =  await this.databases
                                    .listDocuments(
                                        this.bedbdDbId,
                                        this.paymentOptions)

            if(data){

                return data['documents']
                        .map(i=> ({
                                             id: i['$id'],
                                          title: i['title'],
                                          value: i['value'],
                                           icon: {
                                                    name:i['iconName'],
                                                    type:i['iconType'],
                                                }
                                    
                                    }))
            }
                
        } catch (err) {
            return false
        }
    }
}

const paymentService = new PaymentService()
export default paymentService