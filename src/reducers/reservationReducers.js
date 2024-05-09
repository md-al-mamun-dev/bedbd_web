export default function reservationReducers(initialData, {type, data}) {
    switch (type) {
        case "reservation/date": {
            return {...initialData, date:data}
          }
        //   case "reservation/guestCount": {
        //     return {...initialData, guestCount:data}
        //   }

          case "reservation/guestCountAdult": {
            return {...initialData, guestCount:{
                                    ...initialData['guestCount'],
                                    adult: data
                                }}
          }
          case "reservation/guestCountChildren": {
            return {...initialData, guestCount:{
                                    ...initialData['guestCount'],
                                    children: data
                                }}
          }
          case "reservation/guestCountInfants": {
            return {...initialData, guestCount:{
                                    ...initialData['guestCount'],
                                    infants: data
                                }}
          }
          case "reservation/guestCountPets": {
            return {...initialData, guestCount:{
                                    ...initialData['guestCount'],
                                    pets: data
                                }}
          }
          case "reservation/propertyId": {
            return {...initialData, propertyId: data}
          }
          case "reservation/hosts": {
            return {...initialData, hosts: data}
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

        // case 'update-preferences':{
        //     return {
        //         ...initialData,
        //         prefs:{  
        //             ...initialData['prefs'],
        //             ...data
        //             }, 
        //         }
        // }
        
        // case 'update-user-pref':{
        //     return { 
        //             ...initialData, 
        //                    ...data,
        //             prefs: {
        //                 ...initialData['prefs'],
        //                 ...data['prefs']
        //             }                        
        //         }
        // }
        // case "update": {
        //     return tasks.map(t => {
        //       if (t.id === action.task.id) {
        //         return action.task;
        //       } else {
        //         return t;
        //       }
        //     });
        //   }
        case "logout": {
            return {}
        }

        default: {
            throw Error(`No action matched with ${type}`);
        }
    }
}