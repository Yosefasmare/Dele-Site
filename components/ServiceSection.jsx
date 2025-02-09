import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ServiceBtn from './ServiceBtn'

const ServiceSection = ({icon,header,desc,link,path}) => {


  return (
   <Link href={path} className='w-[95%] lg:w-[30%] h-[45vh] lg:h-[85%] ' >
    <div className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden  p-5">
         <div className="w-[100%] h-[40%] flex   justify-center items-center overflow-hidden">
                <Image src={icon} alt="pic"  className=" scale-[0.6]" />     
         </div>
         <div className="flex flex-col justify-start items-center w-[100%] h-[50%] ">
                 <span className="font-extrabold text-3xl capitalize">{header}</span>
                 <div className=" w-[100%] font-semibold p-4 flex text-center">
                        {desc}
                 </div>
         </div>
          <div className="w-[100%] flex justify-center items-center">
         <ServiceBtn link={link}/>
          </div>
    </div>
   </Link>

  )
}

export default ServiceSection
