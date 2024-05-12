'use client'
import Map, { Marker, GeolocateControl } from 'react-map-gl'
import { useEffect, useRef, useState } from "react"
import usePropertyDispatch from "@/context/property/usePropertyDispatch"
import useProperty from "@/context/property/useProperty"
import { SearchBox } from '@mapbox/search-js-react'
import SwitchBtn from '../SwitchBtn'
import { useRouter } from 'next/navigation'
import useAddPropertySessionDispatch from '@/context/addListing/useAddPropertySessionDispatch'
import usePropertyListingSession from '@/context/addListing/usePropertyListingSessions'
import useAddPropertySession from '@/context/addListing/useAddPropertySession'
import useToken from '@/context/account/useToken'

export default function Location() {

  const dispatch = useAddPropertySessionDispatch()
  const mapRef = useRef();
  const geoControlRef = useRef();
  const router = useRouter()


  const propertyListingData =  usePropertyListingSession()
  const {isLoading:isTokenLoading,
              isSet,
              token} = useToken()
  const { location:{
            name, 
            coordinates:{
                  mapCenter, 
                  markerPosition 
              }},  
          activeSession:{
            id:propertyId, 
            location:propertyLoacation 
          },
          setterConditions:{
            isMapLocationSet
          }
        }  = useAddPropertySession()

    // const {location:{
    //             name, 
    //             coordinates:{
    //                   mapCenter, 
    //                   markerPosition 
    //               }} } = useProperty()
  // useEffect(() => {
  //   let ignore  = false

  //     if(geoControlRef.current && !ignore){
  //       geoControlRef.current?.trigger();
  //     }
  //     return ()=> ignore = true
  // }, [geoControlRef.current]);

  useEffect(() => {
    let ignore = false
    const getLocation = () => {
      if (navigator.geolocation && !ignore && !isMapLocationSet) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            dispatch({
              type:'addProperty/setGeolocation',
              data:{
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                  }})
              dispatch({
                type:'addProperty/setSessionLocation',
                data:{
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                    }})

          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
      
      else {
        console.error('Geolocation is not supported by this browser.');
      }
    };
    getLocation(); 

    return () => ignore = true
  }, []); 





  function onMapMoveHandlar(e) {
    dispatch({
      type:'addProperty/setMapCenter',
      data:{
          latitude: e['viewState']['latitude'],
          longitude: e['viewState']['longitude'],
          zoom: e['viewState']['zoom']
          }})
  }

  function onGeolocateCtrlClickHandlar(e) {
    dispatch({
        type:'addProperty/setGeolocation', 
        data:{
            latitude: e['coords']['latitude'],
            longitude: e['coords']['longitude']
            }})
  }
  function onMarkerDragHandlar(e) {
    dispatch({
      type:'addProperty/setMarkerPosition',
      data:{
          latitude: e['lngLat']['lat'],
          longitude: e['lngLat']['lng']
          }})
  }
  function handleRetrieve(e) {
    if(e['features'][0]['properties']['coordinates']){
        dispatch({
            type: 'addProperty/searchGeolocation',
            data:{
                name: e['features'][0]['properties']['name'],
                latitude: e['features'][0]['properties']['coordinates']['latitude'],
                longitude: e['features'][0]['properties']['coordinates']['longitude']
            }} )
    }else{
        // console.log(e['features'][0]['properties']['coordinates'])
      }
  }
  function moveToPreviousPage() {
    router.push('/add-listing/property-details')
  }
  function moveToNextPage() {
      router.push('/add-listing/location-confirmation')
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
    console.log(propertyLoacation)
            updateProperty({propertyId, 
            data:{
                      location: propertyLoacation,
                 sessionStatus: 'location-confirmation'
            }})
    router.push('/add-listing/location-confirmation')
}


  return (<div className='w-100 h-max-content absolute-center max-width-1280 '>
  <div className='max-w-600px mr-l-auto mr-r-auto '>
      <h3 className=' clr-primary-400 txt-align-center fw-regular-dark fs-875 mr-btm-48px'>Property Location</h3>
      <div className='w-100'>
          <label className='w-100 fs-600 fw-regular-dark'>Find your place</label>
          <div id='search-input'>
          <SearchBox 
                className='bg-secondary-050 w-100 p-10px-8px radius-4px border-neutral-300 fs-regular clr-neutral-400'
                accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                onRetrieve={handleRetrieve}
                placeholder='enter your location'
                value={name}
                style={{
                    border: '3px solid #ccc',
                    borderRadius: '5px',
                    background:'transparent',
                    padding: '10px',
                    fontSize: '16px',
                }}
                />
          </div>
      </div>
      <div className='mr-top-24px mr-btm-40px'>
          <p className="fs-200 mr-btm-4px">Or Drag the pin where is your property located.</p>
          <div className="radius-4 w-600px h-370px radius-4px relative">
          <Map 
            ref={mapRef}
            zoom = {mapCenter['zoom']}
            longitude={mapCenter['longitude']}
            latitude={mapCenter['latitude']}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onMove={onMapMoveHandlar}
          //   onData={onMapDataHandlar}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}>
            <GeolocateControl 
              ref={geoControlRef} 
              onGeolocate={onGeolocateCtrlClickHandlar} 
              />

            <Marker onDrag={onMarkerDragHandlar} draggable longitude={markerPosition['longitude']} latitude={markerPosition['latitude']} color="red" anchor="center" />
          </Map> 
          </div>
      </div>
      <SwitchBtn previousPage={moveToPreviousPage} nextPage={onContinueBtnClickHandlar} />
  </div>        
</div>)
}