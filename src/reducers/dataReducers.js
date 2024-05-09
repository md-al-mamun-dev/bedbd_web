export default function dataReducers(initialData, {type, data}) {
    switch (type) {
        // case "data/paymentOptions": {
        //     return {...initialData, paymentOptions: data}
        //   }
        case 'data/showPropertyReservationConfirmationModal': {
            return {...initialData, showModal: 'reservationConfirmation'}
          }
        case 'data/showCongratsModal': {
            return {...initialData, showModal: 'congratsModal'}
          }
        case 'data/hideModal': {
            return {...initialData, showModal: ''}
          }

          
        case 'data/addLocation': {
          return {...initialData, locations: [...initialData['locations'], data]}
        }
        case 'data/updateLocation': {
          const otherLocations = initialData['locations'].filter(item => item.propertyId !== data['propertyId'])
          return {...initialData, locations: [...otherLocations, data]}
        } 
        case 'data/removeLocation': {
          return {...initialData, locations: initialData['locations'].filter(item => item.propertyId !== data)}
        }


        case 'data/amenities': {
          const currentTimeStamp =  Date.now()
          return {...initialData, 
                        amenities: {
                                    ...initialData['amenities'], 
                                    isValid: true,
                                  fetchTime: currentTimeStamp, 
                                  documents: data,  
                                  }
                }
        }
        case 'data/homeRules': {
          const currentTimeStamp =  Date.now()
          return {...initialData, 
                        homeRules: {
                                    ...initialData['homeRules'], 
                                    isValid: true,
                                  fetchTime: currentTimeStamp, 
                                  documents: data,  
                                  }
                }
        }
        case 'data/paymentOptions': {
          const currentTimeStamp =  Date.now()
          return {...initialData, 
                    paymentOptions: {
                                    ...initialData['paymentOptions'], 
                                    isValid: true,
                                  fetchTime: currentTimeStamp, 
                                  documents: data,  
                                  }
                }
        }
        case 'data/propertyBookingTypes': {
          const currentTimeStamp =  Date.now()
          return {...initialData, 
            propertyBookingTypes: {
                                    ...initialData['propertyBookingTypes'], 
                                    isValid: true,
                                  fetchTime: currentTimeStamp, 
                                  documents: data,  
                                  }
                }
        }
        case 'data/propertyCircumferences': {
          const currentTimeStamp =  Date.now()
          return {...initialData, 
                  popertyCircumferences: {
                                    ...initialData['popertyCircumferences'], 
                                    isValid: true,
                                  fetchTime: currentTimeStamp, 
                                  documents: data,  
                                  }
                }
        }
        case 'data/propertyConditions': {
          const currentTimeStamp =  Date.now()
          return {...initialData, 
            popertyConditions: {
                                    ...initialData['popertyConditions'], 
                                    isValid: true,
                                  fetchTime: currentTimeStamp, 
                                  documents: data,  
                                  }
                }
        }
        case 'data/propertyFeatures': {
          const currentTimeStamp =  Date.now()
          return {...initialData, 
                    propertyFeatures: {
                          ...initialData['propertyFeatures'], 
                          isValid: true,
                        fetchTime: currentTimeStamp, 
                        documents: data,
                        }
                  }
        }
        case 'data/countryList': {
          const currentTimeStamp =  Date.now()
          return {...initialData, 
                    countryList: {
                                  ...initialData['countryList'], 
                                      isValid: true,
                                    fetchTime: currentTimeStamp, 
                                    documents: data,
                                }
                  }
        }
        case 'data/propertyTypes': {
          const currentTimeStamp =  Date.now()
          return {...initialData, 
                    propertyTypes: {
                                  ...initialData['propertyTypes'], 
                                      isValid: true,
                                    fetchTime: currentTimeStamp, 
                                    documents: data,
                                }
                  }
        }
        case 'data/propertyStates': {
          const currentTimeStamp =  Date.now()
          return {...initialData, 
                    propertyStates: {
                                  ...initialData['propertyStates'], 
                                      isValid: true,
                                    fetchTime: currentTimeStamp, 
                                    documents: data,
                                }
                  }
        }
        case 'data/verificationDocumentTypes': {
          const currentTimeStamp =  Date.now()
          return {...initialData, 
                    verificationDocumentTypes: {
                                  ...initialData['verificationDocumentTypes'], 
                                      isValid: true,
                                    fetchTime: currentTimeStamp, 
                                    documents: data,
                                }
                  }
        }
        case 'data/hostTermsAndConditions': {
          const currentTimeStamp =  Date.now()
          return {...initialData,
                    hostTermsAndConditions: {
                                  ...initialData['hostTermsAndConditions'], 
                                      isValid: true,
                                    fetchTime: currentTimeStamp, 
                                    documents: data,
                                }
                  }
        }
        case 'data/clientTermsAndConditions': {
          const currentTimeStamp =  Date.now()
          return {...initialData,
                    clientTermsAndConditions: {
                                  ...initialData['clientTermsAndConditions'], 
                                      isValid: true,
                                    fetchTime: currentTimeStamp, 
                                    documents: data,
                                }
                  }
        }

        case 'data/local': {
          const currentTimeStamp =  Date.now()
          return {...initialData,
                  localInfo: {
                                  ...initialData['localInfo'], 
                                      isValid: true,
                                    fetchTime: currentTimeStamp, 
                                    documents: data,
                                }
                  }
        }
        case 'data/ipLocation': {
          const currentTimeStamp =  Date.now()
          return {...initialData,
                ipLocation: {
                                ...initialData['ipLocation'], 
                                    isValid: true,
                                  fetchTime: currentTimeStamp, 
                                  documents: data,
                              }
                  }
        }

        


        default: {
            throw Error(`No action matched with ${type}`);
        }
    }
}