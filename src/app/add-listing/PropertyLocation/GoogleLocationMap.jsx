"use client"
import { useLoadScript } from '@react-google-maps/api';
import { GoogleMap, Marker, Circle, MarkerClusterer } from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import useAreaLocation from '@/hooks/useAreaLocation';

const GoogleLocationMap = ({data, setCurrentLocation}) => {
  const [getDeviceLocation, setGetDeviceLocation] = useState(false)
  const [mapCenter, setMapCenter] = useState({lng:data['longitude'], lat:data['latitude'] })

    // const {localInfo, location} = useAreaLocation()
    
    const mapRef = useRef(null)
    const onLoad = useCallback(map => (mapRef.current = map), [])

    // const mapCenter = useMemo(()=>  ({lat: 23.811056, lng: 90.407608}), [])
    const fixedZoomLevel  = 15

    // useEffect(()=>{
    //   const result = fetch('https://api.ip2location.io/?key=C33B40BF80F27D43DA311E3DB515B531&ip=59.152.105.236&format=json')
    //   if(result)
    //     console.log(result)
    // }, [])

  // useEffect(()=>{
  //   let ignore = false    
  //   if(location && !ignore && !getDeviceLocation)
  //     console.log(location)
  //     setMapCenter({lat: parseFloat(location['latitude']), lng: parseFloat(location['longitude'])})
  //   return ()=> ignore =true
  // }, [location, getDeviceLocation])

useEffect(()=>{
    let ignore = false
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            position => {
               
                setGetDeviceLocation(()=>true)
                setMapCenter(()=>({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude 
                }));
                setCurrentLocation({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude 
                })
            }
        )
    }

    return ()=> ignore =true
}, [])


    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
        libraries:['places']
    })


    // const markerIcon = {
    //   url: 'https://example.com/custom-marker.png', // Replace with the URL of your custom marker icon
    //   scaledSize: new window.google.maps.Size(40, 40), // Adjust the size as needed
    // };
    const markerRef = useRef(null);
    const markerIcon = {
      url: 'fabicon.svg', // Replace with the URL of your custom marker icon
      scaledSize: { width: 48, height: 48 }, // Adjust the size as needed
    };




    
    const defaultOptions = {
        strokeOpacity: 0.5,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
      };

      const closeOptions = {
      ...defaultOptions,
      zIndex: 3,
      fillOpacity: 0.05,
      strokeColor: "#8BC34A",
      fillColor: "#8BC34A",
    };
    const middleOptions = {
      ...defaultOptions,
      zIndex: 2,
      fillOpacity: 0.05,
      strokeColor: "#FBC02D",
      fillColor: "#FBC02D",
    };

    const mapOptions = useMemo(()=>({
        // disableDefaultUI: true, 
        // zoomControl: false, 

        streetViewControl: false, 
        fullscreenControl: false, 
        scaleControl: false, 
        mapTypeControl: false, 


        rotateControl: false, 
        clickableIcons:false,

        // maxZoom:fixedZoomLevel,
        minZoom:7, 
        draggable: true,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_MAP_ID,
    }), [])  

    if(!isLoaded) return <div>Loading...</div>

    const dragEndingHandlar = (e)=>{
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      setCurrentLocation({lat:lat, lng:lng})
    }

    return (<GoogleMap  zoom={16} 
                        center={mapCenter} 
                        options={mapOptions}
                        onLoad={onLoad}
                        mapContainerClassName='map-container'>
                <div className={`marker-class`}>
                    <Marker position={mapCenter} draggable={true} 
                      ref={markerRef} onDragEnd={dragEndingHandlar}/>
                </div>

                
                {/* <Circle  center={mapCenter} radius={250} options={closeOptions}/>
                <Circle center={mapCenter} radius={500} options={middleOptions}/> */}

            </GoogleMap>)


}

export default GoogleLocationMap
































// 'use client'
// import { APIProvider, Map, AdvancedMarker,  Pin, InfoWindow, Marker } from "@vis.gl/react-google-maps";
// import { useEffect, useState } from "react";
// import { Locale } from "appwrite";
// import appwriteClient from "@/service/config";

// export const GoogleMap = () => {
//     const locale = new Locale(appwriteClient);
//     const [location, setLocation] = useState(null);

//     const [open, setOpen] = useState(false)

//     const position = {lat:23.8041, lng:90.4152}
//     const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
//     const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_MAP_ID

// useEffect(()=>{
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(
//             position => {
//                 console.log(position.coords.latitude)
//                 console.log(position.coords.longitude)

//                 setLocation({
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude,
//                   });
//             }
//         )
//     }
//     const promise = locale.get();

//     promise.then(function (response) {
//         console.log(response); // Success
//     }, function (error) {
//         console.log(error); // Failure
//     });
// }, [])


//   return (
//     <APIProvider apiKey={API_KEY}>
//         <div style={{height:'370px'}}>
//             <Map zoom={17} 
//                 // onDrag={}
//                 center={position} mapId={MAP_ID} gestureHandling="cooperative" >
//                 <AdvancedMarker position={position} onClick={()=>setOpen(true)} draggable={true}>
//                     <Pin background={'grey'}/>
//                 </AdvancedMarker>
//                 {/* <Marker position={position} /> */}
//                 {open && <InfoWindow position={position}><p>tooltip</p></InfoWindow>}
//             </Map>
//         </div>
//     </APIProvider>
//   )
// }
