export default function accountReducers(initialData, {type, data}) {
    switch (type) {
        case "login": {
            return {...initialData, user:{...initialData['user'], ...data}}
          }
          case "account/login": {
            return {...initialData, ...data}
          }
          case "account/jwt": {
            return {...initialData, 
                        token:{
                            ...initialData['token'],
                                jwt: data['jwt'],
                         expireTime: data['expire'],
                              isSet: true
                            } 
                    }
          }
          case "account/user": {
            return {...initialData, 
                        user:{
                            ...initialData['user'],
                            ...data
                            }
                    }
          }
        case 'update':{
            if(data['prefs'])
                return { 
                            ...initialData, 
                            ...data,
                            prefs: {
                                ...initialData['prefs'],
                                ...data['prefs']
                            }
                        }
            return { ...initialData, ...data }
        }

        case "logout": {
            return {}
        }

        default: {
            throw Error(`No action matched with ${type}`);
        }
    }
}