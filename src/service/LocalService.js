import { ID, Account, Teams, Locale } from "appwrite";
import appwriteClient from "./config";



export class LocalService{
    locale;
    constructor(){
        this.locale = new Locale(appwriteClient);
    }

    async getUsersLocalInformation(){
        try {
            return await this.locale.get()
        } catch (err) {

        }
    }

    async getCountries(){
        try {
            return await this.locale.listCountries()
        } catch (err) {

        }
    }

}

const localService = new LocalService()
export default localService