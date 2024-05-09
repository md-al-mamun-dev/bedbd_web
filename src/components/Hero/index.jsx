'use client'
import styles from './index.module.css'
import Image from 'next/image'
// import dummy_profile_img from './images/profile-dummy.svg'
import { Search, X, CalendarDays , Users2, Filter   } from 'lucide-react'
// import LucidIcon from '../LucidIcon'
// import Calender from '../UIElements/Calender'
import GuestCount from '../UIElements/GuestCount'
import { useEffect, useRef,  useState } from 'react'
import useControl from '@/context/control/useControl'
import { SearchBox } from '@mapbox/search-js-react'
import useSearchDispatch from '@/context/search/useSearchDispatch'
import useSearch from '@/context/search/useSearch'
import useControlDispatch from '@/context/control/useControlDispatch'
import Calender from './Calender'
// const FilterSection = (props)=>{
//     const { filters } =  props
//     return (
//         <div className={` ${styles.filter_section} container`}>
//             <button className={`cursor-pointer ${styles.filter_btn} `}>
//                 {/* <LucidIcon className={`${styles.filter_icon}`} name='filter' size={24}/> */}

//                 <Filter className={`${styles.filter_icon}`} size={24}/>
//                 {/* <LucidIcon className={`${styles.filter_icon}`} name='filter' size={24}/> */}

//                 Filter
//             </button>
//             <div className={`${styles.filters_list}`}>
//                 <div className={`${styles.filter_item} ${styles.active} `}>All</div>
//                 {
//                     filters.map( filter=> <div className={` ${styles.filter_item}`}>{filter}</div> )
//                 }
//             </div>
//         </div>
//     )
// }


const Hero = (props) => {
    const filters = ['exclusive', 'nature', 'hill', 'sea-beach', 'home', 'room', 'cottage', 'exclusive', 'nature', 'hill', 'sea-beach', 'home', 'room', 'cottage', 'exclusive', 'nature', 'hill', 'sea-beach', 'home', 'room', 'cottage' ]

    const [location, setLoacation] = useState('')
    const [bookingDate, setBookingDate] = useState([])  
    const [showCalender, setShowCalender] =  useState(false)
    const [guestCount, setGuestCount]= useState({      'adult' : 0,
                                                    'children' : 0,
                                                     'infants' : 0,
                                                        'pets' : 0    })
    const [guestCountTxtVal, setGuestCountTxtVal] = useState('')
    const [infantCountTxtVal, setInfantCountTxtVal] = useState('')
    const [petCountTxtVal, setPetCountTxtVal] = useState('')

    const dispatch = useSearchDispatch()
    const controlDispatch = useControlDispatch()

    const { location:{name: searchText, coordinates}, dateRange } = useSearch()

    function onSearchBtnClickHandlar() {
        controlDispatch({type: 'control/searching', data:''})
    }

    function handleRetrieve(e) {
        if(e['features'][0]['properties']['coordinates']){
            dispatch({
                type: 'search/location',
                data:{
                    name: e['features'][0]['properties']['name'],
                    coordinates: e['features'][0]['properties']['coordinates']
                }} )
        }else{
            
}
    }
    const {showHero,
        showMap,
        showSearchSidebar} = useControl()

    const controlData = useControl()




    const [showGuestCounter, setShowGuestCounter] = useState(false)

    // const 
    // useEffect(()=>{
    //     console.log(guestCount)
    // }, guestCount['adult'], guestCount['children'], guestCount['infants'], guestCount['pets'])

    useEffect(()=>{
        if(guestCount['adult'] > 0)
            setGuestCountTxtVal((guestCount['adult'] + guestCount['children'])+'Guest(s)')
        else
            setGuestCountTxtVal('')
    }, [guestCount['adult'], guestCount['children'] ])

    useEffect(()=>{
        if(guestCount['infants'] > 0)
            setInfantCountTxtVal(', '+guestCount['infants'] + 'Infant(s)')
        else
            setInfantCountTxtVal('')
    }, [guestCount['infants']])

    useEffect(()=>{
        if(guestCount['pets'] > 0)
            setPetCountTxtVal(', '+guestCount['pets']+'Pet(s)')
        else
            setPetCountTxtVal('')
    }, [guestCount['pets']])
    

    function intToDate(intDate) {
        const monthAbbreviations = [
            'Jan', 'Feb', 'Mar', 'Apr',
            'May', 'Jun', 'Jul', 'Aug',
            'Sep', 'Oct', 'Nov', 'Dec'
          ];

        const date = new Date(intDate * 1000);
        const monthString = monthAbbreviations[date.getMonth()];
        const dateString = date.getDate().toString();

        // const d = date.toLocaleDateString('en-US', {  month: 'short', day: 'numeric' })
        return `${dateString} ${monthString}`
    }



    const calenderRef = useRef(null);
    const guestCounterRef = useRef(null);

    const CheckInOutClickHandlar =()=> {
        if(!showCalender)
            setShowCalender(!showCalender)
    }
    const GuestClickHandlar =()=> {
        if(!showGuestCounter)
            setShowGuestCounter(!showGuestCounter)
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
          if (calenderRef.current && !calenderRef.current.contains(event.target)) {
            setShowCalender(false);
          }
          if (guestCounterRef.current && !guestCounterRef.current.contains(event.target)) {
            setShowGuestCounter(false);
          }
        };
    
        const handleEscapeKey = (event) => {
          if (event.key === 'Escape' ) {
            if(showCalender)
                setShowCalender(false);
            if(showGuestCounter)
                setShowGuestCounter(false)
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
          document.removeEventListener('keydown', handleEscapeKey);
        };
      }, [showCalender, showGuestCounter]);



    //   ${styles.md_container}   ${styles.container}


    return (
        showHero && <div className={` w-100 hero z-index-2 position-relative p-top-48px p-btm-48px`}>
                <div className='w-fit-content margin-center'>
                    <div className='position-relative'>
                        <div className={`${styles.hero_title} z-index-2 `}>
                            <h1>Start getting deals by choosing your <span className='clr-primary-400'>perfect place </span></h1>
                        </div>
                        <div className={`${styles.hero_decorator_wrapper}`}>
                            <Image src={`/images/hero_decoration_element.svg`} fill/>
                        </div>                    
                    </div>
                    <div className={` ${styles.find_listing}`}>
                            
                        <div className={`${styles.hero_initial_section} `}>
                            <div className={`${styles.heading} uppercase`}>find</div>
                            <div className={` ${styles.scroller} ${styles.listing_types}`}>
                                <div role='filter-list' className={` scroller__inner ${styles.scroller__inner} `}> 
                                    <div className={`active capitalize w-max-content ${styles.active}`}>all </div>
                                    <div className={`capitalize w-max-content`}> rooms</div>
                                    <div className={` capitalize w-max-content`}>apartment</div>
                                    <div className={`capitalize w-max-content`}>cabin</div>
                                    <div className={`capitalize w-max-content`}>home stay</div>
                                    <div className={`capitalize w-max-content`}>villas</div>
                                    <div className={`capitalize w-max-content`}>cottage</div> 
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.search_bar}`}>
                            <form className={`${styles._form} `}>
                                <div id='search-input' className={`search-input ${styles.form_input}  ${styles.form_input_location} location`}>
                                    <label className='capitalize'>location</label> 
                                    <SearchBox 

                                            className='bg-secondary-050 w-100 p-10px-8px radius-4px border-neutral-300 fs-regular clr-neutral-400'
                                            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                                            onRetrieve={handleRetrieve}
                                            placeholder='enter your location'
                                            value={searchText}
                                            style={{
                                                border: '3px solid #ccc',
                                                borderRadius: '5px',
                                                background:'transparent',
                                                padding: '10px',
                                                fontSize: '16px',
                                                // Add more custom styles as needed
                                            }}
                                        />
                                    {/* <input className={`location_input ${styles.input_textbox}`} type='text' placeholder='Which city do you prefer? '/> */}
                                    <X className={`${styles.sm_icon}`}/>
                                </div>

                                <div className={`search-input ${styles.form_input} ${styles.form_input_check_in} `} 
                                    onClick={CheckInOutClickHandlar}>
                                    <label className='capitalize'>check in</label>
                                    <input readOnly={true} className={`date_input ${styles._date_input}`} 
                                        value={dateRange[0] ? intToDate(dateRange[0]) : '' } 
                                        type='text' placeholder='Add Date'/>
                                    <CalendarDays className={`${styles.sm_icon}`}/>
                                </div>

                                <div className={`search-input ${styles.form_input} ${styles.form_input_check_out} `} onClick={CheckInOutClickHandlar}>
                                    <label className='capitalize'>check Out</label>
                                    <input readOnly={true} className={`date_input ${styles._date_input}`} 
                                        value={dateRange[1] ? intToDate(dateRange[1]) : '' } 
                                        
                                        type='text' placeholder='Add Date'/>
                                    <CalendarDays className={`${styles.sm_icon}`}/>
                                </div>

                                <div className={`search-input ${styles.form_input} ${styles.form_input_check_in_out} `} onClick={CheckInOutClickHandlar}>
                                    <label className='capitalize'>check in-out</label>
                                    <input readOnly
                                        className={`check_in_out ${styles._date_input}`}
                                        value={`${dateRange[0] ? intToDate(dateRange[0]) : ''}${dateRange[1] ? ('-' + intToDate(dateRange[1])) : ''}`}

                                        type='text' placeholder='check in-out'/>
                                    <CalendarDays className={`${styles.sm_icon}`}/>
                                </div>

                                <div className={`search-input ${styles.form_input} ${styles.form_input_guests} `}
                                    onClick={GuestClickHandlar}>
                                    <label className='capitalize'>Guests</label>
                                    <input readOnly 
                                        value={guestCountTxtVal+infantCountTxtVal+petCountTxtVal}
                                        

                                    className='guests-input' type='text' placeholder='Add Guests'/>                                  
                                    <Users2 className={`${styles.sm_icon}`}/>                                    
                                </div>

                                <div className={`${styles.form_btn_group} `}>
                                    <button className={`capitalize ${styles.clear_btn}`}>clear</button>
                                    <button onClick={onSearchBtnClickHandlar} className={`${styles.search_btn} ` }>
                                        <Search className={`${styles.search_icon}`} />
                                        <div className={`${styles.search_btn_txt} capitalize`}>search</div>
                                    </button>
                                </div>

                                <Calender 
                                    data = { dateRange }
                                    reducerType='search/dateRange'
                                    dispatch={dispatch}





                                    showCalender={showCalender}  
                                    calenderRef={calenderRef}


                                    // bookingDate = {bookingDate} 
                                    // setBookingDate={setBookingDate} 
                                     />

                                <GuestCount 
                                    show={showGuestCounter}
                                    calenderRef={guestCounterRef}
                                    guestCount = {guestCount}
                                    setGuestCount = {setGuestCount}
                                    />
                                
                            </form>
                        </div>
                    </div> 
                </div>
                           
            </div>
      
    )
}

export default Hero