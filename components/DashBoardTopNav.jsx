'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaUserTie } from 'react-icons/fa';
import { MdAddHomeWork } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import { useSidebar } from '@/context/SidebarContext';
import { fetchAgentFun } from '@/lib/requests';
import { useParams } from 'next/navigation';


const DashBoardTopNav = () => {
  const id = useParams().id
  const [agent,setAgent] = useState(null)

    useEffect(()=>{

      const getAgent = async () => {
        try {
          const agent = await fetchAgentFun({id})
          setAgent(agent)
          
        } catch (error) {
          console.log(error)
        } 
        
      }
      if(id !== null && id !== '' && id !== undefined ){
        getAgent()
      }

    },[id])
    const { toggleSidebar } = useSidebar();

  
  return (
    <div className='p-2 flex border-b-2 border-black h-16'>
      <div className='flex justify-center items-center lg:hidden pr-2 '>
        <CgMenuLeftAlt className='font-bold text-2xl cursor-pointer' onClick={toggleSidebar}/>
         
      </div>
  <div className='flex  justify-between items-center w-full relative  h-full'>
      <div className='flex flex-col justify-center items-center font-bold capitalize after:w-0 after:h-1 after:bg-teal-600 lg:hover:after:w-24 hover:after:w-14  after:rounded-2xl after:transition-all after:ease-in-out '>
        <Link href={'/'} className='flex transition ease-in-out  '>
          <TiArrowBack  /> back <span className='hidden lg:flex'> home</span>
        </Link>
      </div>
             <h1 className='font-sans text-xl capitalize '>agent dashboard</h1>
             <div className='flex gap-2 justify-center items-center'>
                  <Link href={`/dashboard/${id}/listings/add-property`} >
                   <button className='p-2 lg:px-9 px-5 py-2 rounded-lg cursor-pointer flex justify-center items-center bg-gray-900 text-white gap-2 capitalize transition ease-in-out border-2 border-black hover:bg-white hover:text-black hover:font-extrabold'><MdAddHomeWork size={20}/><span className='hidden lg:flex'>add</span></button>
                  </Link>
                  <div className="flex justify-center items-center gap-2"> {agent?.profilePic !== null && agent?.profilePic !== '' && agent?.profilePic !== undefined ?  <Image src={agent?.profilePic} width={400} height={400} alt="profile pic"  className="w-[45px] h-[45px] rounded-full object-cover"/>: <FaUserTie className=" border-2 border-black rounded-full text-4xl" /> } </div>
             </div>
      </div>
    </div>
  )
}

export default DashBoardTopNav
