import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaUserTie } from 'react-icons/fa'



const AgentInfoBox = ({agentId,agentPic,agentName,agentEmail,agentPhoneNumber}) => {

  return (
    <Link href={`/agents/${agentId}`}>
    <div className='lg:w-[60%] w-full h-[200px] border-4 border-black rounded-lg flex justify-between overflow-hidden bg-white shadow-custom'>
             <div className='lg:w-[37%] w-[40%] h-full flex justify-center items-center'>
                {agentPic !== null && agentPic ?  <Image src={agentPic} alt='agent pic' width={200} height={200} className='lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] overflow-hidden rounded-full object-cover' /> : <FaUserTie className=" border-2 border-black rounded-full text-9xl" /> }  
             </div>
             <div className='w-[62%] h-full flex flex-col items-start justify-center gap-5'>
                  <span className='lg:text-2xl text-xl text-wrap font-extrabold font-serif'>{agentName}</span>
                  <span className='text-md font-semibold font-serif text-slate-500'>{agentEmail}</span>
                  <button  className='w-[90%] h-[40px]  bg-[#EC221F] text-white font-bold rounded-md transition-all ease-in-out  hover:bg-black'>Call Me</button>
             </div>
    </div>
    </Link>
  )
}

export default AgentInfoBox
