"use client"

import { FaSearchLocation } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import OpenFilter from './OpenFilter';
import Link from "next/link";

const FilterdSearch = () => {

  const [openFilter, setOpenFilter] = useState(false)

  const router = useRouter()
  const path = usePathname()

  const [condition, setConditionQuery] = useState('')
  const [status, setStatusQuery] = useState('')
  const [type, setTypeQuery] = useState('')
  const [maxBed, setMaxBed] = useState('')
  const [minBed, setMinBed] = useState('')
  const [maxBath, setMaxBath] = useState('')
  const [minBath, setMinBath] = useState('')
  const [minSize, setMinSize] = useState('')
  const [maxSize, setMaxSize] = useState('')

  useEffect(()=>{

    if  (!condition && !status && !type && !maxBath && !minBath && !maxBed && !minBed && !maxSize && !minSize) return

   const params = {condition,type,status,maxBath,minBath,maxBed,minBed,maxSize,minSize}

  

       const filterdSearch = () =>{
        const queryParams = new URLSearchParams(
          Object.entries(params)
            .filter(([key, value]) => value !== null && value !== '')
        ).toString();
         router.push(`${path}?${queryParams}`);
       }
        filterdSearch()
      
        return filterdSearch;

  },[condition,status,type,maxBath,minBath,maxBed,minBed,maxSize,minSize])


  const handelClear = () =>{
    
    
    setConditionQuery('')
    setMaxBath('')
    setMaxBed('')
    setMaxSize('')
    setMinBath('')
    setMinBed('')
    setMinSize('')
    setStatusQuery('')
    setTypeQuery('')
    
    
    router.replace('/properties')

  }

  return (
    <>
    <div className='w-full h-[100px] bg-gray-900 flex items-end fixed z-40' >
       <div className='w-full h-[60%] flex p-2 pl-10'>
            <div className='lg:w-2/5 w-[75%] h-4/5 bg-white p-5 flex items-center rounded-md overflow-hidden'>
              <FaSearchLocation />
              <input
               type="text" 
               placeholder='Search By location '
               className='pl-2  outline-none border-none placeholder:text-slate-500 placeholder:text-lg p-1 flex-1'
              />
            </div>
            <div className='flex pl-5 h-4/5 items-center gap-3'>
            <div className='lg:flex flex-col h-full justify-start  -mt-10 hidden  '>
              <span className=' capitalize text-white pb-1'>type</span>
                 <select
                 onChange={(e)=>setTypeQuery(e.target.value)}
                 name="type" id="type" className=' h-full  border-none outline-none rounded-md font-bold  p-2'>
                   <option value="" hidden>Select a Category</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="single-family-home">Single-Family Home</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="condo">Condo</option>
                  <option value="studio">Studio</option>
                  <option value="duplex">Duplex</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="cottage">Cottage</option>
                  <option value="bungalow">Bungalow</option>
                  <option value="loft">Loft</option>
                  <option value="mansion">Mansion</option>
                  <option value="farmhouse">Farmhouse</option>
                  <option value="cabin">Cabin</option>
                  <option value="mobile-home">Mobile Home</option>
                  <option value="row-house">Row House</option>
                  <option value="shared-accommodation">Shared Accommodation</option>
                  <option value="office-space">Office Space</option>
                  <option value="retail-space">Retail Space</option>
                  <option value="warehouse">Warehouse</option>
                 </select>

            </div>
            <div className='lg:flex hidden flex-col h-full justify-start  -mt-10  '>
            <span className=' capitalize text-white pb-1'>status</span>
                 <select
                 onChange={(e)=>setStatusQuery(e.target.value)}
                 name="status" id="status" className=' h-full  border-none outline-none rounded-md font-bold  p-2 '>
                  <option value="" hidden>Status</option>
                  <option value="" >All</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                 </select>

            </div>
            <div className='lg:flex hidden flex-col h-full justify-start  -mt-10  '>
              <span className=' capitalize text-white pb-1'>condtion</span>
                 <select
                  onChange={(e)=>setConditionQuery(e.target.value)}
                 name="condtion" id="condtion" className=' h-full  border-none outline-none rounded-md font-bold  p-1 ' >
                  <option value="" hidden>Select a Condtion</option>
                  <option value="new-construction">New Construction</option>
                  <option value="renovated">Renovated</option>
                  <option value="under-construction">Under Construction</option>
                  <option value="needs-renovation">Needs Renovation</option>
                  <option value="fully-furnished">Fully Furnished</option>
                  <option value="partially-furnished">Partially Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                  <option value="luxury">Luxury</option>
                  <option value="affordable">Affordable</option>
                  <option value="foreclosure">Foreclosure</option>
                  <option value="move-in-ready">Move-in Ready</option>
                  <option value="leasehold">Leasehold</option>
                  <option value="freehold">Freehold</option>
                  <option value="waterfront">Waterfront</option>
                  <option value="mountain-view">Mountain View</option>
                  <option value="city-view">City View</option>
                  <option value="eco-friendly">Eco-Friendly</option>
                  <option value="gated-community">Gated Community</option>
                  <option value="pet-friendly">Pet-Friendly</option>
                  <option value="public-transport-access">Public Transport Access</option>
                 </select>
            </div>
                  <button onClick={()=>setOpenFilter(prev=>!prev)} className='pl-10 pr-10 p-2 font-bold bg-white border-none rounded-md'>Filter</button>
                  <button onClick={handelClear} className="py-2 px-7 rounded-md cursor-pointer bg-red-600 text-white font-bold">clear</button>
            </div>
       </div>
    </div>
    {openFilter&& (
    <div className=' fixed z-[9999] bg-[rgba(0,0,0,.4)] w-full h-full flex justify-center pt-5 '>
      <OpenFilter setConditionQuery={setConditionQuery} setStatusQuery={setStatusQuery} setTypeQuery={setTypeQuery} setMaxBed={setMaxBed} setMinBed={setMinBed} setMaxBath={setMaxBath} setMinBath={setMinBath} setMaxSize={setMaxSize} setMinSize={setMinSize} setOpenFilter={setOpenFilter} />
   </div>

    )}
    </>
  )
}

export default FilterdSearch
