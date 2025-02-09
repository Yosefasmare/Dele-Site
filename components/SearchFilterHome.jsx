'use client'

import Link from 'next/link';
import { usePathname,useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SearchFilterHome = () => {

      const router = useRouter()
      const path = usePathname();

    const [loction, setLoaction] = useState('')
    const [type, setType] = useState('')
    const [condition, setCondition] = useState('')
    const [status, setStatus] = useState('')

    
      useEffect(()=>{
    
        if  (!condition && !status && !type && !loction) return
    
       const params = {condition,type,status,loction}
    
           const filterdSearch = () =>{
            const queryParams = new URLSearchParams(
              Object.entries(params)
                .filter(([key, value]) => value !== null && value !== '' && value !== undefined)
            ).toString();
             router.push(`${path}?${queryParams}`);
           }
            filterdSearch()
          
            return filterdSearch;
    
      },[condition,status,type,loction])

  return (
    <div className="hidden lg:flex p-4 bg-white rounded-lg shadow-2xl  gap-4 items-center absolute z-40 mt-96 ">
    <select
    onChange={e=>setLoaction(e.target.value)}
     className="px-5 py-2 rounded-lg border-2 border-slate-500 outline-none capitalize font-semibold">
      <option value={''} >Location</option>
      <option value={'addis abeba'}>addis abeba</option>
    </select>
    <select
    onChange={e=>setType(e.target.value)}
    className="px-5 py-2 rounded-lg border-2 border-slate-500 outline-none capitalize font-semibold">
    <option value="" hidden>-- Select a Category --</option>
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
    <select
    onChange={e=>setStatus(e.target.value)}
    className="px-5 py-2 rounded-lg border-2 border-slate-500 outline-none capitalize font-semibold">
      <option value={''} >status</option>
      <option value={'sale'}>for sale</option>
      <option value={'rent'}>for rent</option>
    </select>
    <select
    onChange={e=>setCondition(e.target.value)}
    className="px-5 py-2 rounded-lg border-2 border-slate-500 outline-none capitalize font-semibold">
   <option value="" hidden>-- Select a Condtion --</option>
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
     <Link href={'/'}>
      <button className="px-6 py-2 bg-red-800 text-white capitalize rounded-lg transition-all ease-in-out font-serif font-bold border-2 border-gray-900 hover:bg-white hover:text-gray-900" >clear</button>
     </Link>
  </div>
  )
}

export default SearchFilterHome
