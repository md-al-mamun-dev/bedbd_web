export default function userProfileReducers(initialData, {type, data}) {
    switch (type) {
        case "userProfile/selectPropertyType": {
            return {...initialData, selectedPropertyType: data}
          }
        case 'userProfile/selectedDateRange':{
            return {...initialData, selectedDateRange: data}
        }
        case "logout": {
            return {}
        }

        default: {
            throw Error(`No action matched with ${type}`);
        }
    }
}