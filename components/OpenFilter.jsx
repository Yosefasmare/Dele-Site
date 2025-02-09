import { GoXCircleFill } from "react-icons/go";
import React from 'react'
import { GoArrowSwitch } from 'react-icons/go'

const OpenFilter = ({setOpenFilter,setTypeQuery,setStatusQuery,setConditionQuery,setMinBed,setMaxBed,setMinBath,setMaxBath,setMinSize,setMaxSize}) => {
  return (
    <div className='lg:w-[50%] w-[95%] h-[90%] p-3  bg-gray-900 rounded-md flex flex-col overflow-y-scroll overflow-x-hidden'>
        <div className='flex p-3 justify-around items-center'>
            <h1 className='text-white font-extrabold text-2xl'>Search By Filter</h1>
            <GoXCircleFill  color='white' scale={1.5} className=' cursor-pointer' onClick={()=>setOpenFilter(prev=>!prev)}/>
        </div>
        <div className='flex flex-col w-full gap-3 justify-center lg:hidden'>
        <div className='flex flex-col h-full justify-start gap-3 '>
              <span className='font-bold text-white text-xl capitalize'>type</span>
                 <select
                 onChange={(e)=>setTypeQuery(e.target.value)}
                 name="type" id="type" className=' h-full  border-none outline-none rounded-md font-bold  p-4'>
                  <option value="" hidden disabled>Type</option>
                  <option value="" >All</option>
                  <option value="family-house" >Family House</option>
                  <option value="condo">Condo</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="studio-apartment">Studio Apartment</option>
                  <option value="guest-house">Guest house</option>
                  <option value="land">Land</option>
                  <option value="real-estate">Real estate</option>
                  <option value="shop">Shop</option>
                  <option value="duplex">Duplex</option>
                  <option value="penthouse">Penthouse</option>
                 </select>

            </div>
            <div className='flex  flex-col h-full justify-start gap-3 '>
            <span className='font-bold text-white text-xl capitalize'>status</span>
                 <select
                 onChange={(e)=>setStatusQuery(e.target.value)}
                 name="status" id="status" className=' h-full  border-none outline-none rounded-md font-bold  p-4 '>
                  <option value="" hidden>Status</option>
                  <option value="" >All</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                 </select>

            </div>
            <div className='flex flex-col h-full justify-start gap-3'>
              <span className='font-bold text-white text-xl capitalize'>condtion</span>
                 <select
                  onChange={(e)=>setConditionQuery(e.target.value)}
                 name="condtion" id="condtion" className=' h-full  border-none outline-none rounded-md font-bold  p-4 ' >
                  <option value="" hidden>Condtion</option>
                  <option value="" >All</option>
                  <option value="new">Newly Built</option>
                  <option value="fairely-used">Fairly used</option>
                  <option value="old">Old</option>
                  <option value="renovated">Renovated</option>
                  <option value="uncompleted-building">Uncompleted Building </option>
                  <option value="under-construction">Under Construction</option>
                 </select>
            </div>
        </div>
            <div className='w-full flex-1'>
                <div className='flex flex-col p-4 gap-2'>
                       <h1 className='font-bold text-white text-xl'>Number of Bedrooms</h1>
                       <div className='flex flex-col lg:flex-row gap-2 pl-7 justify-center items-center pt-3'>
                            <input 
                            type="number" 
                            min={0}
                            onChange={(e)=>setMinBed(e.target.value)}
                            placeholder='minimum'
                            className='p-4 pl-5 pr-5 border-2 text-white border-white rounded-md outline-none bg-[rgba(0,0,0,.3)]'
                             />
                             <GoArrowSwitch color='white' size={25}/>
                             <input 
                            type="number" 
                            min={1}
                            onChange={(e)=>setMaxBed(e.target.value)}
                            placeholder='maximum'
                            className='p-4 pl-5 pr-5 border-2 text-white border-white rounded-md outline-none bg-[rgba(0,0,0,.3)]'
                             />
                       </div>
                </div>
                <div className='flex flex-col p-4 gap-2'>
                       <h1 className='font-bold text-white text-xl'>Number of Bathrooms</h1>
                       <div className='flex flex-col lg:flex-row gap-2 pl-7 justify-center items-center pt-3'>
                            <input 
                            type="number" 
                            min={0}
                            onChange={(e)=>setMinBath(e.target.value)}
                            placeholder='minimum'
                            className='p-4 pl-5 pr-5 border-2 text-white border-white rounded-md outline-none bg-[rgba(0,0,0,.3)]'
                             />
                             <GoArrowSwitch color='white' size={25}/>
                             <input 
                            type="number" 
                            min={1}
                            onChange={(e)=>setMaxBath(e.target.value)}
                            placeholder='maximum'
                            className='p-4 pl-5 pr-5 border-2 text-white border-white rounded-md outline-none bg-[rgba(0,0,0,.3)]'
                             />
                       </div>
                       
                </div>
                <div className='flex flex-col p-4 gap-2'>
                       <h1 className='font-bold text-white text-xl'>Size</h1>
                       <div className='flex flex-col lg:flex-row gap-2 pl-7 justify-center items-center pt-3'>
                            <input 
                            type="number" 
                            min={20}
                            onChange={(e)=>setMinSize(e.target.value)}
                            placeholder='minimum'
                            className='p-4 pl-5 pr-5 border-2 text-white border-white rounded-md outline-none bg-[rgba(0,0,0,.3)]'
                             />
                             <GoArrowSwitch color='white' size={25}/>
                             <input 
                            type="number" 
                            min={20}
                            onChange={(e)=>setMaxSize(e.target.value)}
                            placeholder='maximum'
                            className='p-4 pl-5 pr-5 border-2 text-white border-white rounded-md outline-none bg-[rgba(0,0,0,.3)]'
                             />
                       </div>
                       
                </div>
            </div>
      </div>
  )
}

export default OpenFilter
