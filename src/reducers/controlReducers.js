export default function controlReducers(initialData, {type, data}) {
    switch (type) {
        case "control/showHero": {
            return {...initialData, showHero: true}
          }
        case "control/hideHero": {
            return {...initialData, showHero: false}
          }

        case "control/showMap": {
            return {...initialData, showMap: true}
          }
        case "control/hideMap": {
            return {...initialData, showMap: false}
          }

          case "control/showSearchSidebar": {
            return {...initialData, showSearchSidebar: true}
          }
        case "control/hideSearchSidebar": {
            return {...initialData, showSearchSidebar: false}
          }
        case "control/searching": {
        return {...initialData, showMap: true, showHero: false, showSearchSidebar: true}
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