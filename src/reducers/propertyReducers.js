export default function propertyReducers(initialData, {type, data}) {


    
    switch (type) {
        // case "login": {
        //     return {...initialData, ...data}
        //   }
        case 'property/addCountryList':{
            return { ...initialData, countryList:data }
        }
        case 'property/select':{
            return { ...initialData, selectedPropertyType:data }
        }

        case 'property/addTypes':{
            return { ...initialData, propertyTypes:data }
        }

        case 'property/circumferences':{
            return { 
                            ...initialData, 
                    propertyCircumferences: data 
                    
                }
        }

        case 'property/searchGeolocation':{

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
                    
                }
        }
        case 'property/setGeolocation':{

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
                    
                }
        }
        case 'property/setMarkerPosition':{
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
                    
                }
        }
        case 'property/setMapCenter':{
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

        // Booking Type
        case 'property/bookingTypes':{
            return { ...initialData, bookingTypes:data }
        }

        case 'property/addBookingType':{
            return { ...initialData, bookingTypes:[...initialData['bookingTypes'], data] }
        }
        // case 'property/selectedBookingType':{
        //     return { ...initialData, selectedBookingType:data }
        // }
        case 'property/addSelectedBookingType':{

            return { ...initialData, selectedBookingTypes:[...initialData['selectedBookingTypes'], data] }
        }
        case 'property/removeSelectedBookingType':{
            return { ...initialData, selectedBookingTypes: initialData['selectedBookingTypes'].filter(i=>i!==data) }
        }


        
        case 'property/features':{
            return { ...initialData, propertyFeatures:data }
        }
        case 'property/addFeatures':{
            return { ...initialData, propertyFeatures:[...initialData['propertyFeatures'], data] }
        }
        case 'property/removeFeatures':{
            return { ...initialData, propertyFeatures: initialData['propertyFeatures'].filter(i=>i!==data) }
        }

        case 'property/addSelectedFeatures':{
            return { ...initialData, selectedPropertyFeatures:[...initialData['selectedPropertyFeatures'], data] }
        }
        case 'property/removeSelectedFeatures':{
            return { ...initialData, selectedPropertyFeatures: initialData['selectedPropertyFeatures'].filter(i=>i!==data) }
        }


        // case 'property/addSelectedFeatures':{
        //     return { ...initialData, selectedPropertyFeatures:data }
        // }
        case 'property/addTitle':{
            return { ...initialData, title:data }
        }
        case 'property/addDescription':{
            return { ...initialData, propertyDescription:data }
        }

        case 'property/address':{
            return { ...initialData, address:data }
        }
        case 'property/country':{
            return { ...initialData, country:data }
        }
        case 'property/countryCode':{
            return { ...initialData, countryCode:data }
        }
        case 'property/city':{
            return { ...initialData, city:data }
        }
        case 'property/district':{
            return { ...initialData, district:data }
        }
        case 'property/thana':{
            return { ...initialData, thana:data }
        }
        case 'property/timezone':{
            return { ...initialData, timeZone:data }
        }
        case 'property/zipCode':{
            return { ...initialData, zipCode:data }
        }
        case 'property/location':{
            return { ...initialData, location:data }
        }


        case 'property/homeRules':{
            return { ...initialData, homeRules:data }
        }
        case 'property/checkIn':{
            return { ...initialData, checkInTime:data }
        }
        case 'property/checkOut':{
            return { ...initialData, checkOutTime:data }
        }
        
        case 'property/roomCount':{
            return { ...initialData, roomCount:data }
        }
        case 'property/bedCount':{
            return { ...initialData, bedCount:data }
        }
        case 'property/guestCount':{
            return { ...initialData, guestCount:data }
        }
        case 'property/images':{
            return { ...initialData, images:data }
        }
        case 'property/rentInfo':{
            return { ...initialData, rentInfo:data }
        }


        case 'property/amenities':{
            return { ...initialData, amenities:data }
        }
        case 'property/addSelectedAmenities':{
            return { ...initialData, selectedAmenities:[ ...initialData['selectedAmenities'], data] }
        }
        case 'property/removeSelectedAmenities':{
            return { ...initialData, selectedAmenities:initialData['selectedAmenities'].filter(i=>i!==data) }
        }
        case 'property/homeRules':{
            return { ...initialData, homeRules:data }
        }
        case 'property/addHomeRules':{
            return { ...initialData, homeRules:[...initialData['homeRules'], data] }
        }
        // selectedHomeRules
        case 'property/addSelectedHomeRules':{
            return { ...initialData, selectedHomeRules:[ ...initialData['selectedHomeRules'], data] }
        }
        case 'property/removeSelectedHomeRules':{
            return { ...initialData, selectedHomeRules:initialData['selectedHomeRules'].filter(i=>i!==data) }
        }

        case 'property/removeSelectedHomeRules':{
            return { ...initialData, selectedHomeRules:initialData['selectedHomeRules'].filter(i=>i!==data) }
        }
        case 'property/availability':{
            return { ...initialData, availability:data }
        }

        case 'property/approvingMethod':{
            return { ...initialData, approvingMethod:data }
        }
        case 'property/genderPreference':{
            return { ...initialData, genderPref:data }
        }
        case 'property/termsCondition':{
            return { ...initialData, termsConditions:data }
        }



        
        case 'property/selectPropertyType':{
            return { ...initialData, selectedPropertyType:data }
        }
        // case 'property/selectPropertyState':{
        //     return { ...initialData, selectedPropertyType:data }
        // }

        // case 'property/bookingTypes':{
        //     return { ...initialData, bookingTypes:data }
        // }

        // case 'property/addPropertyState':{
        //     return { ...initialData, bookingTypes:[...initialData['bookingTypes'], data] }
        // }
        // case 'property/selectedBookingType':{
        //     return { ...initialData, selectedBookingType:data }
        // }

        // #--------------------------------------------------------#
        case 'property/addCustomPropertyCondition':{
            return { ...initialData, customConditions:[...initialData['customConditions'], data] }
        }
        case 'property/selectPropertyCondition':{
            return { ...initialData, selectedConditions:[...initialData['selectedConditions'], data] }
        }
        case 'property/declinePropertyState':{
            return { ...initialData, selectedConditions: initialData['selectedConditions'].filter(i=>i!==data) }
        }

        case 'property/addCustomBookingType':{
            return { ...initialData, customBookingTypes:[...initialData['customBookingTypes'], data] }
        }
        case 'property/selectBookingType':{
            return { ...initialData, selectedBookingTypes:[...initialData['selectedBookingTypes'], data] }
        }
        case 'property/declineBookingType':{
            return { ...initialData, selectedBookingTypes: initialData['selectedBookingTypes'].filter(i=>i!==data) }
        }

// -----------------------
        case 'property/addCustomPropertyFeature':{
            return { ...initialData, customPropertyFeatures:[...initialData['customPropertyFeatures'], data] }
        }
        case 'property/selectPropertyFeature':{
            return { ...initialData, selectedPropertyFeatures:[...initialData['selectedPropertyFeatures'], data] }
        }
        case 'property/declinePropertyFeature':{
            return { ...initialData, selectedPropertyFeatures: initialData['selectedPropertyFeatures'].filter(i=>i!==data) }
        }

        case 'property/addCustomHomeRules':{
            return { ...initialData, customHomeRules:[...initialData['customHomeRules'], data] }
        }
        case 'property/selectHomeRules':{
            return { ...initialData, selectedHomeRules:[...initialData['selectedHomeRules'], data] }
        }
        case 'property/declineHomeRules':{
            return { ...initialData, selectedHomeRules: initialData['selectedHomeRules'].filter(i=>i!==data) }
        }

        case 'property/title':{
            return { ...initialData, title:data }
        }
        case 'property/description':{
            return { ...initialData, propertyDescription:data }
        }



        default: {
            throw Error(`No action matched with ${type}`);
        }
    }
}