const { v4: uuidv4 } = require('uuid');

export default function addPropertySessionReducers(initialData, {type, data}) {
    switch (type) {
        // case "login": {
        //     return {...initialData, ...data}
        //   }
        case 'addProperty/sessions':{

            return { 
                    ...initialData, 
                    isValid:true, 
                    fetchTime: Date.now(),
                    documents: data
                 }
        }


        case 'addProperty/activeSession':{
            let isCountrySet =  false
            let isCitySet =  false
            let isDistrictSet =  false
            let isThanaSet =  false
            let isTimezoneSet =  false
            let isZipCodeSet =  false
            let isMapLocationSet =  false



            if(data.hasOwnProperty('country')){
                if(data['country'].hasOwnProperty('name') && data['country']['name'].length > 0){
                    isCountrySet = true 
                }
            }
            if(data.hasOwnProperty('city')){
                if( data['city'].length > 0){
                    console.log('set city')
                    isCitySet = true 
                }
            }
            if(data.hasOwnProperty('district')){
                if( data['district'].length > 0){
                    isDistrictSet = true 
                }
            }
            if(data.hasOwnProperty('thana')){
                if( data['thana'].length > 0){
                    isThanaSet = true 
                }
            }

            if(data.hasOwnProperty('timezone')){
                if( data['timezone'].length > 0){
                    isTimezoneSet = true 
                }
            }

            if(data.hasOwnProperty('zipCode')){
                if( data['zipCode'].length > 0){
                    isZipCodeSet = true 
                }
            }
            if(data.hasOwnProperty('location')){
                if( data['location'].length === 2 ){
                    isMapLocationSet = true 
                }
            }
            // console.log(data)
            // let isLoacationSet = false
            // if(data['location'] && data['location'].length > 0){
            //     isLoacationSet = true
            // }

            if(isMapLocationSet){
                return { 
                    ...initialData,
                activeSession: {
                    ...initialData['activeSession'],
                    ...data},
                setterConditions: {
                    ...initialData['setterConditions'],
                    isMapLocationSet,
                    isCountrySet,
                    isCitySet,
                    isDistrictSet,
                    isThanaSet,
                    isTimezoneSet,
                    isZipCodeSet
                },
                location:{
                    name:'',
                    coordinates:{
                        mapCenter:{
                            latitude: data['location'][0],
                            longitude:data['location'][1],
                            zoom:13
                        },
                        markerPosition:{
                            latitude:data['location'][0],
                            longitude:data['location'][1]
                        }
                    }
                },
                }
            }

            return { 
                        ...initialData,
                    activeSession: {
                        ...initialData['activeSession'],
                        ...data},
                    setterConditions: {
                        ...initialData['setterConditions'],
                        isMapLocationSet,
                        isCountrySet,
                        isCitySet,
                        isDistrictSet,
                        isThanaSet,
                        isTimezoneSet,
                        isZipCodeSet
                    }
                    }
        }
        case 'addProperty/selectPropetyType':{
            return { 
                        ...initialData,
                    activeSession: {
                        ...initialData['activeSession'],
                        // propertyType: data
                        _propertyType: data
                    }
                    }
        }

        case 'addProperty/selectPropertyState':{
            console.log(data)
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        _propertyStates:[
                                ...initialData['activeSession']['_propertyStates'],
                                data
                            ]
                    }
                }
        }
        case 'addProperty/declinePropertyState':{
            return { 
                ...initialData, 
                activeSession:{
                    ...initialData['activeSession'], 
                    _propertyStates: initialData['activeSession']['_propertyStates'].filter(i=>i!==data)
                }
            }
            
            
            // { ...initialData, selectedConditions: initialData['selectedConditions'].filter(i=>i!==data) }
        }

        case 'addProperty/addCustomPropertyState':{
            console.log(data)

            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        customPropertyStates:[
                            ...initialData['activeSession']['customPropertyStates'],
                            data
                        ]
                    }
                }
        }
        case 'addProperty/toggleCustomPropertyStateSelection':{

            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        customPropertyStates:[
                            ...initialData['activeSession']['customPropertyStates'].map(
                                state => {
                                    if(state['id']===data){
                                        return {...state, isSelected: !state['isSelected'] }
                                    }
                                    else return state
                                }
                            ),
                            // initialData['activeSession']['customPropertyStates'].filter(i=>i!==data)
                        ]
                    }
                }
        }



        case 'addProperty/selectPropertyBookingType':{
            console.log(data)
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        _propertyBookingTypes:[
                                ...initialData['activeSession']['_propertyBookingTypes'],
                                data
                            ]
                    }
                }
        }
        case 'addProperty/declinePropertyBookingType':{
            return { 
                ...initialData, 
                activeSession:{
                    ...initialData['activeSession'], 
                    _propertyBookingTypes: initialData['activeSession']['_propertyBookingTypes'].filter(i=>i!==data)
                }
            }
            
            
            // { ...initialData, selectedConditions: initialData['selectedConditions'].filter(i=>i!==data) }
        }

        case 'addProperty/addCustomPropertyBookingType':{
            console.log(data)

            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        customPropertyBookingTypes:[
                            ...initialData['activeSession']['customPropertyBookingTypes'],
                            data
                        ]
                    }
                }
        }
        case 'addProperty/toggleCustomPropertyBookingType':{

            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        customPropertyBookingTypes:[
                            ...initialData['activeSession']['customPropertyBookingTypes'].map(
                                state => {
                                    if(state['id']===data){
                                        return {...state, isSelected: !state['isSelected'] }
                                    }
                                    else return state
                                }
                            ),
                            // initialData['activeSession']['customPropertyStates'].filter(i=>i!==data)
                        ]
                    }
                }
        }


        case 'addProperty/selectPropertyFeature':{
            console.log(data)
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        _propertyFeatures:[
                                ...initialData['activeSession']['_propertyFeatures'],
                                data
                            ]
                    }
                }
        }
        case 'addProperty/declinePropertyFeature':{
            return { 
                ...initialData, 
                activeSession:{
                    ...initialData['activeSession'], 
                    _propertyFeatures: initialData['activeSession']['_propertyFeatures'].filter(i=>i!==data)
                }
            }
            
            
            // { ...initialData, selectedConditions: initialData['selectedConditions'].filter(i=>i!==data) }
        }

        case 'addProperty/addCustomPropertyFeatures':{
            console.log(data)

            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        customPropertyFeatures:[
                            ...initialData['activeSession']['customPropertyFeatures'],
                            data
                        ]
                    }
                }
        }
        case 'addProperty/toggleCustomPropertyFeatures':{

            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        customPropertyFeatures:[
                            ...initialData['activeSession']['customPropertyFeatures'].map(
                                state => {
                                    if(state['id']===data){
                                        return {...state, isSelected: !state['isSelected'] }
                                    }
                                    else return state
                                }
                            ),
                            // initialData['activeSession']['customPropertyStates'].filter(i=>i!==data)
                        ]
                    }
                }
        }

        case 'addProperty/title':{
            return { ...initialData, title: data }
        }
        case 'addProperty/description':{
            return { ...initialData, description: data }
        }


        case 'addProperty/searchGeolocation':{

            return { 
                            ...initialData,
                            location:{
                                ...initialData['location'],
                                name: data['name'],
                                coordinates:{
                                    ...initialData['location']['coordinates'],
                                    mapCenter:{
                                        ...initialData['location']['coordinates']['mapCenter'],
                                        latitude:data['latitude'],
                                        longitude:data['longitude']
                                    },
                                    markerPosition:{
                                        ...initialData['location']['coordinates']['markerPosition'],
                                        latitude:data['latitude'],
                                        longitude:data['longitude']
                                    }
                                }
                            },
                            activeSession:{
                                ...initialData['activeSession'],
                                location:[data['latitude'], data['longitude']]
                            } 
                    
                }
        }
        case 'addProperty/setGeolocation':{

            return { 
                            ...initialData,
                            location:{
                                ...initialData['location'],
                                coordinates:{
                                    ...initialData['location']['coordinates'],
                                    mapCenter:{
                                        ...initialData['location']['coordinates']['mapCenter'],
                                        latitude:data['latitude'],
                                        longitude:data['longitude']
                                    },
                                    markerPosition:{
                                        ...initialData['location']['coordinates']['markerPosition'],
                                        latitude:data['latitude'],
                                        longitude:data['longitude']
                                    }
                                }
                            },
                            // activeSession:{
                            //     ...initialData['activeSession'],
                            //     location:[data['latitude'], data['longitude']]
                            // } 
                }
        }
        case 'addProperty/setSessionLocation':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                location:[data['latitude'], data['longitude']]
                            } 
                }
        }
        case 'addProperty/setMarkerPosition':{
            return { 
                            ...initialData,
                            location:{
                                ...initialData['location'],
                                coordinates:{
                                    ...initialData['location']['coordinates'],
                                    markerPosition:{
                                        latitude:data['latitude'],
                                        longitude:data['longitude']
                                    }
                                }
                            },
                            activeSession:{
                                ...initialData['activeSession'],
                                location:[data['latitude'], data['longitude']]
                            }
                            
                    
                }
        }
        case 'addProperty/setMapCenter':{
            return { 
                            ...initialData,
                            location:{
                                ...initialData['location'],
                                coordinates:{
                                    ...initialData['location']['coordinates'],
                                    mapCenter:{
                                        latitude:data['latitude'],
                                        longitude:data['longitude'],
                                        zoom:data['zoom']
                                    },
                                }
                            },
                }
        }


       
        // case 'addProperty/country':{
        //     return { 
        //                     ...initialData,
        //                     activeSession:{
        //                         ...initialData['activeSession'],
        //                         country: data,
        //                     },
        //                     setterConditions:{
        //                         ...initialData['setterConditions'],
        //                         isCountrySet:true
        //                     }
        //         }
        // }

        case 'addProperty/country':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                country: {name: data['name'], code: data['code']},
                            },
                            setterConditions:{
                                ...initialData['setterConditions'],
                                isCountrySet:true
                            }
                }
        }
        case 'addProperty/address-aptFloor':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                address: {
                                    ...initialData['activeSession']['address'],
                                    aptFloor: data
                                },
                            },
                            
                }
        }
        case 'addProperty/address-streetAddress':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                address: {
                                    ...initialData['activeSession']['address'],
                                    streetAddress: data
                                },
                            },
                            
                }
        }
        case 'addProperty/address-addressOne':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                address: {
                                    ...initialData['activeSession']['address'],
                                    addressOne: data
                                },
                            },
                            
                }
        }
        case 'addProperty/address-addressTwo':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                address: {
                                    ...initialData['activeSession']['address'],
                                    addressTwo: data
                                },
                            },
                            
                }
        }
        

        case 'addProperty/city':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                city:'',
                            },
                            setterConditions:{
                                ...initialData['setterConditions'],
                                isCitySet:true
                            }
                }
        }
        
        case 'addProperty/district':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                district: data,
                            },
                            setterConditions:{
                                ...initialData['setterConditions'],
                                isDistrictSet:true
                            }
                }
        }
        
        case 'addProperty/thana':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                thana: data,
                            },
                            setterConditions:{
                                ...initialData['setterConditions'],
                                isThanaSet:true
                            }
                }
        }

        
        case 'addProperty/timezone':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                timezone: data,
                            },
                            setterConditions:{
                                ...initialData['setterConditions'],
                                isTimezoneSet:true
                            }
                }
        }
        case 'addProperty/zipcode':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                zipCode: data,
                            },
                            setterConditions:{
                                ...initialData['setterConditions'],
                                isZipCodeSet:true
                            }
                }
        }
        case 'addProperty/setCountryTrue':{
            return { 
                    ...initialData,
                    setterConditions:{
                        ...initialData['setterConditions'],
                        isCountrySet:true
                    }
                }
        }
        case 'addProperty/setCityTrue':{
            return { 
                            ...initialData,
                            setterConditions:{
                                ...initialData['setterConditions'],
                                isCitySet:true
                            }
                }
        }
        case 'addProperty/setDistrictTrue':{
            return { 
                            ...initialData,
                            setterConditions:{
                                ...initialData['setterConditions'],
                                isDistrictSet:true
                            }
                }
        }
        case 'addProperty/seThanaTrue':{
            return { 
                            ...initialData,
                            setterConditions:{
                                ...initialData['setterConditions'],
                                isThanaSet:true
                            }
                }
        }
        case 'addProperty/setTimezoneTrue':{
            return { 
                            ...initialData,
                            setterConditions:{
                                ...initialData['setterConditions'],
                                isTimezoneSet:true
                            }
                }
        }
        case 'addProperty/setZipcodeTrue':{
            return { 
                            ...initialData,
                            setterConditions:{
                                ...initialData['setterConditions'],
                                isZipCodeSet:true
                            }
                }
        }


        case 'addProperty/roomCount':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                roomCount: data,
                            }
                }
        }

        case 'addProperty/bedCount':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                bedCount: data,
                            }
                }
        }
        case 'addProperty/guestCount':{
            return { 
                            ...initialData,
                            activeSession:{
                                ...initialData['activeSession'],
                                guestCount: data,
                            }
                }
        }

        case 'addProperty/toggleAminitySelect':{
            return { 
                ...initialData, 
                activeSession:{
                    ...initialData['activeSession'], 
                    _amenities: initialData['activeSession']['_amenities'].includes(data) 
                                    ? initialData['activeSession']['_amenities'].filter(i=>i!==data)
                                    : [...initialData['activeSession']['_amenities'], data]
                }
            } 
        }



        case 'addProperty/toggleHomeRulesSelect':{
            return { 
                ...initialData, 
                activeSession:{
                    ...initialData['activeSession'], 
                    _homeRules: initialData['activeSession']['_homeRules'].includes(data) 
                                    ? initialData['activeSession']['_homeRules'].filter(i=>i !== data)
                                    : [...initialData['activeSession']['_homeRules'], data]
                }
            } 
        }
        case 'addProperty/addCustomHomeRules':{
            console.log(data)

            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        customHomeRules:[
                            ...initialData['activeSession']['customHomeRules'],
                            data
                        ]
                    }
                }
        }
        case 'addProperty/toggleCustomHomeRules':{

            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        customHomeRules:[
                            ...initialData['activeSession']['customHomeRules'].map(
                                state => {
                                    if(state['id']===data){
                                        return {...state, isSelected: !state['isSelected'] }
                                    }
                                    else return state
                                }
                            ),
                            // initialData['activeSession']['customPropertyStates'].filter(i=>i!==data)
                        ]
                    }
                }
        }

        case 'addProperty/checkInTime':{
            console.log(data)

            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        checkInTime: data
                    }
                }
        }

        case 'addProperty/checkOutTime':{
            console.log(data)
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        checkOutTime:data
                    }
                }
        }
        case 'addProperty/checkOutTime':{
            console.log(data)
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        checkOutTime:data
                    }
                }
        }

        case 'addProperty/addImages':{
            console.log(data)
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        images:[...initialData['activeSession']['images'], ...data]
                    }
                }
        }
        case 'addProperty/removeImage':{
            console.log(data)
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'], 
                        images:initialData['activeSession']['images'].filter(item => item['_id'] != data)
                    }
                }
        }
        case 'addProperty/reverseRemoveImage':{

            const images = ()=> 
                    data['index'] === 0 
                        ? [data['image'], ...initialData['activeSession']['images']]
                        : initialData['activeSession']['images'].length <= data['index']
                            ? [ ...initialData['activeSession']['images'], data['image']]
                            : [ ...initialData['activeSession']['images'].slice(0, data['index']),
                                                        data['image'],
                                ...initialData['activeSession']['images'].slice(data['index']) ]
            
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'],
                        images:images()
                    }
                }
        }

        case 'addProperty/rent':{   
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'],
                        rent:data
                    }
                }
        }
        case 'addProperty/serviceFee':{   
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'],
                        serviceFee:data
                    }
                }
        }
        case 'addProperty/tax':{   
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'],
                        tax:data
                    }
                }
        }
        case 'addProperty/currency':{   
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'],
                        currency:data
                    }
                }
        }

        case 'addProperty/checkInPossibility':{   
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'],
                        checkInPossibility:data
                    }
                }
        }

        case 'addProperty/allowMoreThenMonth':{   
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'],
                        allowMoreThenMonth:data
                    }
                }
        }
        case 'addProperty/isBookingExtend':{   
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'],
                        isBookingExtend:data
                    }
                }
        }
        case 'addProperty/maxNightStayLimit':{   
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'],
                        maxNightStayLimit:data
                    }
                }
        }

        case 'addProperty/approvingMethod':{   
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'],
                        approvingMethod:data
                    }
                }
        }

        case 'addProperty/genderPreference':{   
            return { 
                    ...initialData, 
                    activeSession:{
                        ...initialData['activeSession'],
                        genderPreference:data
                    }
                }
        }





    // case 'addProperty/declinePropertyState':{
    //     return { 
    //         ...initialData, 
    //         activeSession:{
    //             ...initialData['activeSession'], 
    //             propertyStates: initialData['activeSession']['propertyStates'].filter(i=>i!==data)
    //         }
    //     }
    // }


        default: {
            throw Error(`No action matched with ${type}`);
        }
    }
}