"use client"
import { useState , useRef, useCallback, useEffect} from 'react'
import Map, { Marker, GeolocateControl } from 'react-map-gl'
import useSearch from '@/context/search/useSearch'
import useControl from '@/context/control/useControl'



export default function SearchMap({data}) {


  const search = useSearch()
  const {showHero, showMap, showSearchSidebar} = useControl()

  const [viewport, setViewport] = useState({
    longitude:90.36203892315308,
    latitude:23.82439436458189,
    zoom:13
  })

  useEffect(()=>{
    setViewport({...viewport, ...search['location']['coordinates']})
  }, [search])



  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );
  const [markerPoint, setMarkerPoint] = useState({
    longitude:90.36203892315308,
    latitude:23.82439436458189
  })


      return (showMap && <div className={`w-100 h-432px p-32px-24px`}>

        
        <Map 
        ref={mapRef}
        {...viewport}
          onViewportChange={handleViewportChange}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onMove={evt => setViewport(evt.viewState)}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}>
            
            {
              data.map(item =>{
                if(item['location']){
                  return <Marker 
                  // className='position-relative marker-class' 
                  longitude={item['location']['lng']} 
                  latitude={item['location']['lat']} 
                  anchor="top">
                  <div className='position-absolute box-shadow-gray  bg-secondary-050 p-4px-8px radius-8px '>{ item['currency'] + ( parseFloat(item['rent'])+parseFloat(item['tax'])+parseFloat(item['serviceFee']) )}</div>
                </Marker>
                }
              })
            }

          
            
        </Map>
      </div>)
}