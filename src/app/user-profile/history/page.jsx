'use client'
import { useState } from "react"
import usePropertyTypes from "@/hooks/usePropertyTypes"
import useUserProfile from "@/context/profile/useUserProfile"
import useUserProfileDispatch from "@/context/profile/useUserProfileDispatch"
import LucidIcon from "@/components/LucidIcon"
import HistoryItem from "./HistoryItem"


export default function History() {
    // const [selectedPropertyType, setSelectedPropertyType] = useState('')
    // const [selectedDateRange, setSelectedDateRange] = useState(604800)
    const {isLoading, propertyTypes} = usePropertyTypes()

    const dispatch = useUserProfileDispatch()

    const {selectedPropertyType, selectedDateRange, balance }= useUserProfile()

    const availableBalance = new Intl.NumberFormat('en-US', {   minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            }).format(balance)



  return (
    <div className='w-100 p-24px'>
        <div className="flex flex-wrap gap-24px mr-top-10px mr-btm-10px max-width-1230px mr-l-auto mr-r-auto">
            <div className=" w-280px  position-relative">
                <select 
                    className='w-100 radius-4px p-8px-16px border-neutral-100 bg-transparent'
                    value={selectedPropertyType} 
                    onChange={e=>dispatch({type:'userProfile/selectPropertyType', data: e.target.value})}>
                    <option value=''>All property</option>
                    {
                        !isLoading 
                            ?   propertyTypes
                                    .map(item=>(
                                        <option value={item['id']}>
                                            {item['typeName']}
                                        </option>))
                            :   <div>Loading... </div>
                    }
                </select>
                <LucidIcon
                    className='position-absolute opacity-0_70 right-16px top-50 translateY-50 z-index-minus-1'
                    name='chevron-down' size={24} /> 
            </div>
            
            <div className=" w-280px position-relative mr-r-auto">
                <select 
                    className="w-100 radius-4px p-8px-16px border-neutral-100 bg-transparent"
                    value={selectedDateRange} 
                    onChange={e=>dispatch({type:'userProfile/selectedDateRange', data: e.target.value})}>
                    <option value={604800}> Last 7 days</option>
                    <option value={1296000}>Last 15 days</option>
                    <option value={2592000}>Last 1 month(30 days)</option>
                    <option value={7776000}>Last 3 months(90 days)</option>
                    <option value={15552000}>Last 6 months(180 days)</option>
                    <option value={31536000}>Last 1 year(365 days) </option>
                </select>
                <LucidIcon className='position-absolute opacity-0_70 right-16px top-50 translateY-50 z-index-minus-1' name='chevron-down' size={24} />
            </div>  
            <div className="flex flex-wrap gap-16px  flex-align-center ">
                <div className='clr-neutral-400 fs-regular fw-regular-dark'>
                    Available Balance: 
                    <span className='fs-500 fw-semi-bold clr-neutral-700 mr-left-16px'>
                        {'$' + availableBalance}
                    </span>
                </div>
                <button className='btn-primary w-190px'>Withdraw Now</button>

            </div>
        </div>

        <div >
            <div className='radius-8px w-100 max-width-1230px   grid-tmp-col-172px-224px-452px-252px-132px border-neutral-100 clr-neutral-600 fs-regular mr-l-auto mr-r-auto mr-top-24px mr-btm-24px history-table-title'>
                <div className='p-16px-24px '>Property ID</div>
                <div className='p-16px-24px '>Property Name</div>
                <div className='p-16px-24px '>Booking Details</div>
                <div className='p-16px-24px'>Booking Date</div>
                <div className='p-16px-24px txt-align-center'>Total Cost</div>
            </div>
            <div  className='mr-btm-24px'>
                <h3 className='clr-primary-400 w-100 max-width-1230px fs-600 fw-semi-bold mr-l-auto mr-r-auto p-l-24px mr-btm-12px'>Last Year</h3>

                <div className='grid gap-8px bg-secondary-050_odd_child'>     
                    <HistoryItem/>
                    <HistoryItem/>
                    <HistoryItem/>
                </div>
            </div>

            
        </div>
        

    </div>
  )
}
