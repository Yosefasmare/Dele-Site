'use client'

import Link from 'next/link'
import React from 'react'
import { MdManageAccounts, MdMessage, MdOutlineClear } from 'react-icons/md'
import { GrOverview } from "react-icons/gr";
import LogOutBtn from './LogOutBtn'
import { LuLandPlot } from "react-icons/lu";
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';

const DashBoardSideBar = ({id}) => {
  const {toggleSidebar,isOpen} = useSidebar()

  const pathname = usePathname()
  const segment = pathname.split('/')
  const thirdSegment = segment[3] != undefined || segment[3] != null ? `/${segment[3]}` : `/`


  const dashBoardlinks = [
    { name: 'Dashboard Overview', icon: <GrOverview color="white" />, href: '/' },
    { name: 'listings', icon: <LuLandPlot color="white" />, href: '/listings' },
    { name: 'Customers inbox', icon: <MdMessage color="white" />, href: '/inbox' },
    { name: 'Account Settings', icon: <MdManageAccounts color="white" />, href: '/accountsetting' },
  ];


  return (
    <>
    <div className='w-[20%] bg-black hidden lg:block' />
    <div className={`lg:w-[20%] w-[70%] lg:translate-x-0 ${isOpen ? ' translate-x-0 ' : ' translate-x-[-800px]'} transition-all ease-in-out lg:flex flex-col  flex pt-4 bg-black h-full fixed top-0 left-0 z-50 shadow-lg`}  >
    <div className="w-full p-2 flex items-center justify-between lg:justify-center  capitalize  font-extrabold text-4xl  text-white  font-serif">
      dele-site
      <span className="flex lg:hidden cursor-pointer"><MdOutlineClear  onClick={toggleSidebar}/></span>
    </div>
    <div className="flex flex-col w-full p-3">
      {dashBoardlinks.map((link) => (
      <Link  key={link.name} href={`/dashboard/${id}${link.href}`} passHref>
        <div  className={` ${thirdSegment === link.href && 'bg-gray-700'} flex justify-start pl-2 items-center w-full p-4 mt-1 hover:bg-gray-700 rounded-lg cursor-pointer`} >
            <div className="flex gap-3 items-center ">
              <span>{link.icon}</span>
              <span className="capitalize text-white font-light">{link.name}</span>
            </div>
        </div>
      </Link>
      ))}
    </div>
<div className="flex justify-start pl-5 items-center gap-3  pt-2 w-full border-t-2 border-gray-200 mt-[35vh]">
 <LogOutBtn />
</div>
  </div>
  </>
  )
}

export default DashBoardSideBar


