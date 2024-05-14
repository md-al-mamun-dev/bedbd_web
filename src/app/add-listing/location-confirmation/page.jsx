'use client'
import React, { useEffect, useState } from 'react'
import PropertyFeature from './PropertyFeature'
import SwitchBtn from '../SwitchBtn'
import usePropertyDispatch from '@/context/property/usePropertyDispatch'
import LucidIcon from '@/components/LucidIcon'
import copyToClipboard from '@/components/Utility/copyToClipboard'
import useCountriesList from '@/hooks/useCountriesList'
import { City } from 'country-state-city'
import { timezones } from './timzoneList'
import { useRouter } from 'next/navigation'
import useProperty from '@/context/property/useProperty'
import useAddPropertySession from '@/context/addListing/useAddPropertySession'
import usePropertyListingSession from '@/context/addListing/usePropertyListingSessions'
import useLocalInfo from '@/hooks/useLocalInfo'
import useIpLocation from '@/hooks/useIpLocation'
import useAddPropertySessionDispatch from '@/context/addListing/useAddPropertySessionDispatch'
import useToken from '@/context/account/useToken'

export default function LocationConfirmation(){

    const {isLoading:isCountriesLoading, countries:{countries}} = useCountriesList() || {}
    

    const router = useRouter()
    const propertyListingData =  usePropertyListingSession()
    const { location:{ coordinates:{ markerPosition }}, 
            activeSession:{ id:propertyId, address, location:propertyLoacation, country, city:selectedCity, district:selectedDistrict,  thana:selectedThana,  timezone:selectedTimezone, zipCode:selectedZipCode     }, 
            setterConditions:{isCountrySet, isCitySet, isDistrictSet, isThanaSet, isTimezoneSet, isZipCodeSet  } 
        } = useAddPropertySession()

    // const [country, setCountry] = useState(selectedCountry)
    // const [cities, setCities] = useState([])
    // const [mapLink, setMapLink] = useState('')

    const [city, setCity] = useState(selectedCity)
    const [timeZone, setTimeZone] = useState(selectedTimezone)
    const [postZipCode, setPostZipCode] = useState(selectedZipCode)
    const [thana, setThana] = useState(selectedThana)
    const [district, setDistrict] = useState(selectedDistrict)
    // const [address, setAddress] = useState({     aptFloor: '',
    //                                         streetAddress: '',
    //                                             addressOne: '',
    //                                             addressTwo: ''})

    const {isLoading: isLoacalInfoLoading, localInfo} = useLocalInfo()
    const {isLoading: isIpLocationLoading , ipLocation}= useIpLocation()
    const {isLoading: isTokenLoading,
        isSet,
        token} = useToken()

    useEffect(()=>{
        let ignore = false
            if(selectedCity.length > 0){
                setCity(selectedCity)
            }
        return ()=> ignore = true 

    }, [selectedCity])

    // useEffect(()=>{
    //     let ignore = false
    //     if(!ignore){
    //         if(selectedCity.length > 0){
    //             setCity(selectedCity)
    //         }
    //     }
    //     return ()=> ignore = true 

    // }, [selectedCity])


    useEffect(()=>{ 
        let ignore = false 
        if(!ignore  ){
            if(localInfo['country'].length > 0 && !isCountrySet){
                dispatch({type:'addProperty/country',            data:{name: localInfo['country'], code: localInfo['countryCode']} })
            }
        }
        return ()=> ignore = true

    }, [localInfo])

    useEffect(()=>{ 
        console.log(ipLocation)

        let ignore = false 
        // if(!ignore  ){
            if(ipLocation['country_name'].length > 0 && !isCountrySet){
                dispatch({type:'addProperty/country',   data: {
                                                            name: ipLocation['country_name'], 
                                                            code: ipLocation['country_code']
                                                        }
                        })
            }
            if(ipLocation['city_name'].length > 0 && !isCitySet){
                dispatch({type:'addProperty/city',            data: ipLocation['city_name']  })
                setCity(ipLocation['city_name'] )   
            }

            if(ipLocation['time_zone'].length > 0 && !isTimezoneSet){
                dispatch({type:'addProperty/timezone',            data:`(GMT${ipLocation['time_zone']})` })
                // console.log(`(${ipLocation['time_zone']})`+' '+ipLocation['city_name'])
                // setTimeZone(`(GMT${ipLocation['time_zone']})`+' '+ipLocation['city_name'])
            }
            if(ipLocation['zip_code'].length > 0 && !isZipCodeSet){
                dispatch({type:'addProperty/zipcode',            data: ipLocation['zip_code']  })
                setPostZipCode(ipLocation['zip_code'] )
            }
            // return ()=> ignore = true
        // }
    }, [ipLocation])


    const dispatch = useAddPropertySessionDispatch()
    

    function onCountryChangeHandlar(e) {
        // setCountry(countries.find(i=>i['code']===e.target.value))
        dispatch({type:'addProperty/country',            data: countries.find(i=>i['code']===e.target.value)  })
    }
    function moveToPreviousPage() {
        router.push('/add-listing/property-location')
      }
    function moveToNextPage() {
        router.push('/add-listing/accommodation-details')
    }

    async function updateProperty({propertyId, data}){
        
        let query = process.env.NEXT_PUBLIC_API_URL + `/api/listing?id=${propertyId}`
        const response = await fetch(query , {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              },
          body: JSON.stringify(data)
          });
    
          if(response){
            console.log(response.json)
          }
      }
    function onContinueBtnClickHandlar(e) {
        e.preventDefault()
        
        // Address 
        // let address_compose = ''
        // if(address['aptFloor'].length > 0){
        //     address_compose = address_compose + address['aptFloor']
        // }
        // if(address['streetAddress'].length > 0){
        //     if(address_compose.length > 0){
        //         address_compose = address_compose + ', '
        //     }
        //     address_compose = address_compose + address['streetAddress']
        // }
        // if(address['addressOne'].length > 0){
        //     if(address_compose.length > 0){
        //         address_compose = address_compose + ', '
        //     }
        //     address_compose = address_compose + address['addressOne']
        // }
        // if(address['addressTwo'].length > 0){
        //     if(address_compose.length > 0){
        //         address_compose = address_compose + ', '
        //     }
        //     address_compose = address_compose + address['addressTwo']
        // }
        console.log(address)
         dispatch({
            type: 'addProperty/city', 
            data: city })
         dispatch({
            type: 'addProperty/district', 
            data: district })
         dispatch({
            type: 'addProperty/thana', 
            data: thana })
         dispatch({
            type: 'addProperty/zipcode', 
            data: postZipCode })




        updateProperty({propertyId, 
            data:{
                address:address,
                timezone : selectedTimezone, 
                zipCode: postZipCode,
                country, city, district, thana,
                sessionStatus:'accommodation-details'
            }})
        moveToNextPage()
        // router.push('/add-listing/accommodation-details')
    }


  return (
    <div className='w-100 h-max-content absolute-h-center top-0 max-width-1280 '>
        <div className='max-w-600px mr-l-auto mr-r-auto p-btm-80px p-top-56px'>
            <div className=' mr-btm-36px'>
                <h3 className=' clr-primary-400 txt-align-center fw-regular-dark fs-875'>Location confirmation</h3>
                <div className='w-100 mr-top-48px'>
                    <label className='w-100 fs-600 clr-neutral-600 fw-regular-dark'>Add details about your location</label>
                    <div className='w-100 '>
                        <div className='position-relative mr-top-16px mr-btm-24px'>

                            {
                                isCountriesLoading
                                    ? <div className=' w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent'>Loading...</div>
                                    :   countries?.length > 0
                                        ?   <select 
                                                onChange={onCountryChangeHandlar}
                                                value={country['code']}
                                                className=' w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent'>                                
                                                <option value=''> select country </option>
                                                {
                                                    countries.map((i, idx) => <option key={idx} value={i['code']}>{i['name']}</option>)
                                                }                                            
                                            </select>
                                        : <div className=' w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent'>
                                            something wrong!! no data found 
                                            </div>
                            }
                            
                            <LucidIcon className='position-absolute top-50 translateY-50 right-24px opacity-0_70 z-index-minus-1' name='chevron-down' size={24}/>
                        </div>

            {/* const [addres, setAddres] = useState({aptFloor:'', streetAddress:'', addresss:'', addressTwo:''}) */}
                        <input 
                            value={address['aptFloor']}
                            // onChange={e=>setAddress({...address, 'aptFloor':e.target.value })}
                            onChange={e=>dispatch({type:'addProperty/address-aptFloor', data: e.target.value })}

                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="apt, floor(if applicable)" name='floor'/>

                        <input 
                            value={address['streetAddress']}
                            // onChange={e=>setAddress({...address, 'streetAddress':e.target.value })}
                            onChange={e=>dispatch({type:'addProperty/address-streetAddress', data:e.target.value })}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="street address" name='street-address'/>

                        <input 
                            value={address['addressOne']}
                            // onChange={e=>setAddress({...address, 'addressOne':e.target.value })}
                            onChange={e=>dispatch({type:'addProperty/address-addressOne', data:e.target.value })}

                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="Address" name='address-line-2'/>

                        <input 
                            value={address['addressTwo']}
                            // onChange={e=>setAddress({...address, 'addressTwo':e.target.value })}
                            onChange={e=>dispatch({type:'addProperty/address-addressTwo', data:e.target.value })}

                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="Address-2" name='address-two'/>

                        <input 
                            value={city}
                            onChange={e=>setCity(e.target.value)}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="City" name='city'/>
                        {/* <div className='position-relative mr-top-40px'>
                            <select 
                                value={city['name]}
                                onChange={e=>setCity(e.target.value)}
                                className='w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent' 
                                placeholder="pls give a title">                        
                                <option value=''> select city </option>
                                <option value='Dhaka'>Dhaka</option>
                            </select>
                            <LucidIcon className='position-absolute top-50 translateY-50 right-24px opacity-0_70 z-index-minus-1' name='chevron-down' size={24}/>
                        </div> */}
                    {/* district */}
                        <input 
                            value={district}
                            onChange={e=>setDistrict(e.target.value)}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="District" name='district'/>
                        {/* <div className='position-relative mr-top-14px'>
                            <select 
                                value={district}
                                onChange={e=>setDistrict(e.target.value)}
                                className='w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent' 
                                placeholder="pls give a title">                        
                                <option value=''> select district </option>
                                <option value='Dhaka'>Dhaka</option>
                            </select>
                            <LucidIcon className='position-absolute top-50 translateY-50 right-24px opacity-0_70 z-index-minus-1' name='chevron-down' size={24}/>
                        </div> */}

                    {/* thana */}

                        <input 
                            value={thana}
                            onChange={e=>setThana(e.target.value)}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="Thana" name='thana'/>

                        {/* <div className='position-relative mr-top-14px'>
                            <select 
                                value={thana['name']}
                                onChange={e=>setThana({...thana, 'name':e.target.value })}
                                className='w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent' 
                                placeholder="pls give a title">                        
                                <option value=''> select thana </option>
                                <option value='ramna-thana'>Ramna</option>
                            </select>
                            <LucidIcon className='position-absolute top-50 translateY-50 right-24px opacity-0_70 z-index-minus-1' name='chevron-down' size={24}/>
                        </div> */}

                        <div className='position-relative mr-top-16px mr-btm-24px'>
                            {   isCountriesLoading
                                ? <div className=' w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent'>Loading...</div>
                                :   timezones?.length > 0
                                    ?   <select 
                                            onChange={e=> dispatch({type:'addProperty/timezone', data:e.target.value })}
                                            value={selectedTimezone}
                                            className=' w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent'>                                
                                            <option value=''> select timezone  </option>
                                            {
                                                timezones.map((i, idx) => <option key={idx} value={i['title']}>{i['title']}</option>)
                                            }                                            
                                        </select>
                                    : <div className=' w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent'>
                                        something wrong!! no data found 
                                        </div>
                            }
                            <LucidIcon className='position-absolute top-50 translateY-50 right-24px opacity-0_70 z-index-minus-1' name='chevron-down' size={24}/>
                        </div>

                        {/* <input 
                            value={timeZone}
                            onChange={e=>setTimeZone(e.target.value )}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="Timezone" name='timezone'/> */}
                        {/* <div className='position-relative mr-top-14px'>
                            <select 
                                value={timeZone}
                                onChange={e=>setTimeZone(e.target.value)}
                                className='w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8 bg-transparent' 
                                placeholder="pls give a title">                        
                                <option value=''> select time zone </option>
                                <option value='GMT +6'>Dhaka GMT +6</option>
                            </select>
                            <LucidIcon className='position-absolute top-50 translateY-50 right-24px opacity-0_70 z-index-minus-1' name='chevron-down' size={24}/>
                        </div> */}

                        <input 
                            value={postZipCode}
                            onChange={e=>setPostZipCode(e.target.value)}
                            className='w-100 fs-regular mr-top-16px clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                            placeholder="post/zip Code" name='post-zip-code'/>
                    </div>
                    <div className='fs-200  mr-t-6px'>No worries! <br/> Your address is only shared with guests after they’ve made a reservation.</div>
                </div>
            </div>
            <div className=' mr-btm-36px'>
            <h3 className='w-100 fs-500 fw-regular-dark'>Add details about your location</h3>
                <div className='w-100 position-relative mr-top-14px '>
                    <input 
                        disabled
                        className='w-100 fs-regular clr-neutral-500 border-neutral-500 p-16px-24px radius-8' 
                        placeholder="heare is your map link" 
                        value={`https://maps.google.com/?q=${propertyLoacation[0]},${propertyLoacation[1]}`}
                        name='map-link'/>
                        <button onClick={()=>copyToClipboard(`https://maps.google.com/?q=${propertyLoacation[0]},${propertyLoacation[1]}`)} className='position-absolute top-50 translateY-50 right-24px opacity-0_70 cursor-pointer no-border  no-background no-outline'>
                            <LucidIcon  name='copy' size={24}/>
                        </button>                    
                </div>                
            </div>
            <SwitchBtn nextPage={onContinueBtnClickHandlar} previousPage={moveToPreviousPage}/>
        </div>        
    </div>
  )
}
