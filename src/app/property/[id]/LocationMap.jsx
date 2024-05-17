'use client'
import usePropertyLocation from "@/hooks/usePropertyLocation"
import Map, { Marker,  GeolocateControl } from "react-map-gl"
import { useEffect, useState, useRef, useCallback } from "react";
import useData from "@/context/data/useData";
import getZoomLevelsResolution from "@/components/Utility/getZoomLevelsResolution";
import 'mapbox-gl/dist/mapbox-gl.css'

export default function LocationMap({location}) {
  console.log(location)
  
  const [markerPoint, setMarkerPoint] = useState({
    longitude:location['longitude'],
    latitude:location['latitude']
  })


  // const {isLoading, propertyLocation }= usePropertyLocation(propertyId)
  const [circleSize, setCircleSize] = useState(167)
  
  const [viewport, setViewport] = useState({
    longitude:location['longitude'],
    latitude:location['latitude'],
    zoom:15
  })
const propertyMapRef = useRef();
const handleViewportChange = useCallback(
  (newViewport) => setViewport(newViewport),
  []
);
// useEffect(()=>{
//   let ignore = false 
//   if(!isLoading && !ignore){
//     setViewport({            ...viewport,
//                   longitude: propertyLocation['lng'],
//                    latitude: propertyLocation['lat'],
//                 })
//     setMarkerPoint({
//         longitude: propertyLocation['lng'],
//         latitude: propertyLocation['lat'],
//     })
//   }
//   return ()=> ignore = true
// }, [isLoading])

useEffect(()=>{
  
  // console.log(circleSize)
  // console.log(viewport)

console.log(getZoomLevelsResolution(viewport['zoom']))
setCircleSize(1200/getZoomLevelsResolution(viewport['zoom']))
}, [ viewport['zoom'] ])

// useEffect(() => {
//   const metersPerPixel = (lat, zoom) => {
//     const earthCircumference = 40075017;
//     const latitudeRadians = lat * Math.PI / 180;
//     return earthCircumference * Math.cos(latitudeRadians) / Math.pow(2, zoom + 8);
//   };

//   const updateCircleSize = () => {
//     const metersPerPixelAtLatitude = metersPerPixel(viewport.latitude, viewport.zoom);
//     const circleSizeInPixels = (circleSize / metersPerPixelAtLatitude) * 2;
//     // console.log(circleSize)
//     // console.log(metersPerPixelAtLatitude)
//     // console.log(circleSizeInPixels)
//     if(typeof circleSizeInPixels  === 'number' ){
//       setCircleSize(parseInt(circleSizeInPixels));
//     }else{
//       console.log(circleSize)
//     }
//   };

//   updateCircleSize();
// }, [viewport, circleSize]);


    
    
  return (
    <div className="w-100 h-100 round-8px">
      {
        <Map 
            ref={propertyMapRef}
            style={{borderRadius:'8px'}}
            {...viewport}
            onViewportChange={handleViewportChange}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onMove={evt => setViewport(evt.viewState)}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}>
              
              <Marker 
                // className='position-relative marker-class' 

                longitude={markerPoint['longitude']}
                latitude={markerPoint['latitude']}
                anchor="center"
                offsetTop={-15} offsetLeft={-15}
                >
                <div 
                  style={{ width: circleSize, height: circleSize, borderRadius: '50%', backgroundColor: 'rgba(0, 123, 191, 0.3)' }} 
                  >
                  <div className='position-relative top-50 left-0'>bedbd listed property situated within this area</div>
                </div>

                </Marker>
              
              
              
          </Map>
      }
    </div>
  )
}
