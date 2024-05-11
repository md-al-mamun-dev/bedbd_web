export const store = {
    account:{
       user:{

       },
       token:{
        jwt:'',
        expireTime:0,
        isSet: false
       },
       isLoaggedIn:false,
       isAuthChecked:false,
    },
    userTermsAndConditions:[],
    registration:{},
    addPropertySessions:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            activeSession:{
                id:'',
                title:'',
                description:'',

                propertyType:'',
                propertyStates:[],
                customPropertyStates:[],

                propertyBookingTypes:[],
                customPropertyBookingTypes:[],

                propertyFeatures:[],
                customPropertyFeatures:[],

                amenities:[],

                homeRules:[],
                customHomeRules:[],

                checkInTime:'11:30 AM',
                checkOutTime:'12:30 PM',

                location:[],
                country:{name: '', code: ''},
                city:'',
                district:'',
                thana:'',
                timezone:'',
                zipCode:'',
                roomCount:[],
                bedCount:[],
                guestCount:[],

                images:[],
            },
            location:{
                name:'',
                coordinates:{
                    mapCenter:{
                        latitude:23.794716682329422,
                        longitude:90.41353033484006,
                        zoom:13
                    },
                    markerPosition:{
                        latitude:23.794716682329422,
                        longitude:90.41353033484006
                    }
                }
            },
            setterConditions: {
                isMapLocationSet: false,
                isCountrySet: false,
                isCitySet: false,
                isDistrictSet: false,
                isThanaSet:false,
                isTimezoneSet:false,
                isZipCodeSet:false
                
            },
            err:[]
            
    },
    property:{  
        propertyTypes:[],
        propertyCircumferences:[],
        bookingTypes:[],
        propertyFeatures:[],
        countryList:[],
        amenities:[],
        homeRules:[],

        selectedBookingTypes:[],
        customBookingTypes:[],

        selectedConditions:[],
        customConditions:[],
        
        customPropertyFeatures:[],
        selectedPropertyFeatures:[],
        title:'',
        propertyDescription:'',

        
        location:{
            name:'',
            coordinates:{
                mapCenter:{
                    latitude:23.794716682329422,
                    longitude:90.41353033484006,
                    zoom:13
                },
                markerPosition:{
                    latitude:23.794716682329422,
                    longitude:90.41353033484006
                }
            }
        },

        
        selectedPropertyType:'',
        
        address:{   aptFloor: '', 
                    streetAddress: '', 
                    addressOne: '', 
                    addressTwo: ''},
        // country:'',
        // countryCode:'',

        country:{name: '', code: ''},
        city:{ name:'', lat:'', lng:'' },
        district:{ name:'', lat:'', lng:'' },
        thana:{},
        timeZone:'',
        zipCode:'',
        // location:{},
        
        roomCount:[],
        bedCount:[],
        guestCount:[],

        
        selectedHomeRules:[],
        customHomeRules:[],


        checkInTime:[],
        checkOutTime:[],
        
        
        images:[],
        rentInfo:{},
        
        selectedAmenities:[],
        availability:{
            checkIn:'',
            monthExtendStay:'',
            rebookAfterTimeFrame:''
        },
        approvingMethod:'',
        genderPref:'',
        termsConditions:{
            legitimateDeclaration:false,
            readTermsCondition:false
        }
    },
    
    search:{
        txt:'',
        location:{
            name:'', 
            coordinates:{
                latitude:23.82439436458189,
                longitude:90.36203892315308
            }
            
        },
        dateRange:[],
        guestCount: {
            totalGuestCount: 0,
            adult: 0,
            child: 0,
            pet: 0,
            bellow12:0,
        },
        propertyType:'',
        propertyFeatures:[],
        areaRange:'',
        priceRange: '',
        rating: 0.00,
        amenities: [],
        badges:[],
        genderPreference:'',
    },
    userProfile:{
        selectedPropertyType:'',
        selectedDateRange:604800,
        balance:1500,
    },
    reservation:{
        propertyId:'',
        hosts:[],
        // hostRegistrationId:'',
        clientRegistrationId:'',
        date: ['',''],
        guestCount:{
            adult:0,
            children:0,
            infants:0,
            pets:0,
        },
        isCanceled:false,
        clientPaymentMethod:'',
        paymentAmount:0.00,
        transactionId:'test-transaction',
        isPaymentConfirmed:false,
    },
    data:{
        // paymentOptions:[],
        showModal:'',
        roomCount:[
            {
                id:0,
                name:'Bedroom',
                count:0,
            },
            {
                id:1,
                name:'Dining Room',
                count:0,
            },
            {
                id:2,
                name:'Washroom',
                count:0,
            },
            {
                id:3,
                name:'Others',
                count:0,
            },
        ],
        bedCount:[
            {
                id: 0,
                name:'Single bed',
                count:0,
            },
            {
                id: 1,
                name:'Double bed',
                count:0,
            },
            {
                id: 2,
                name:'Extra bed (Request)',
                count:0,
            },
        ],
        guestCount:[
            {
                id: 0,
                type:'Adult',
                count:0,
            },
            {
                id: 1,
                type:'under 14',
                count:0,
            },
        ],

        localInfo:{
            isValid: false,
            fetchTime: 0,
            documents: {
                continent:'',
                continentCode:'',
                country:'',
                countryCode:'',
                currency:'',
                eu:false,
                ip:''
            },
            err:[]
        },
        ipLocation:{
            isValid: false,
            fetchTime: 0,
            documents: {
                as:'',
                asn:'',
                city_name:'',
                country_code:'',
                country_name:'',
                ip:'',
                is_proxy:'',
                latitude:'',
                longitude:'',
                region_name:'',
                time_zone:'',
                zip_code:'',
            },
            err:[]
        },

        locations:[
            {
                propertyId:'65f69d72beddda76a3e3',
                lat:'1',
                lng:'2',
                isValid:false,
                marker: 'pin',
            }
        ],
        amenities:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            err:[]
        },
        homeRules:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            err:[]
        },
        paymentOptions:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            err:[]
        },
        propertyBookingTypes:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            err:[]
        },
        propertyFeatures:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            err:[]
        },
        popertyCircumferences:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            err:[]
        },
        propertyStates:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            err:[]
        },
        popertyConditions:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            err:[]
        },
        countryList:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            err:[]
        },
        propertyTypes:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            err:[]
        },
        verificationDocumentTypes:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            err:[]
        },
        hostTermsAndConditions:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            err:[]
        },
        clientTermsAndConditions:{
            isValid: false,
            fetchTime: 0,
            documents: [],
            err:[]
        },
    },
    payment:{
        selectedOption:'',
    },
    control:{
        showHero:true,
        showMap:false,
        showSearchSidebar:false,
        isSearching:false,
    }
};