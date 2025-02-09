'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaUserTie } from 'react-icons/fa'
import { PropagateLoader } from 'react-spinners'
import UploadImage from './ImageChooser'
import { fetchAgentFun } from '@/lib/requests'
import AgentProfileInfoUpadte from './AgentProfileInfoUpadte'
import ProfileLoader from './ProfileLoader'

const AgentProfileInfo = ({id}) => {
    const [agent, setAgent] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{

        if(!id) return
    
            setLoading(true)
            const controller = new AbortController();
            const signal = controller.signal;
            const fetchAgent = async () => {
    
                try {
                const agent = await fetchAgentFun({id})
                   if (!signal.aborted) {
                    setAgent(agent);
                    }
                } catch (error) {
                    console.log(error)
                    setError('error while fetching agent')
                } finally {
                    if (!signal.aborted) {
                        setLoading(false);
                    }
                }
            }
         
                fetchAgent()
    
                return () => {
                    controller.abort();
                };
    },[id])

  return (
    <div className='flex flex-col p-3 gap-2 w-full'>
        <h1 className='p-3 capitalize font-bold font-serif text-2xl'>agent info</h1>
        {loading ? <div className='flex justify-center items-center p-24'><PropagateLoader /></div> : 
        <div className='flex lg:flex-row flex-col '>
            <div className='flex flex-col w-full gap-4 lg:w-2/5 justify-center items-center '>
            {loading ? <ProfileLoader width={'w-[200px]'} height={'h-[200px]'} />
             :
              <div className='w-[200px] h-[200px]  rounded-full overflow-hidden object-center border border-gray-600'>
                {agent?.profilePic?.trim() ? 
                <Image src={agent?.profilePic} alt='profile pic' width={800} height={800} />
                 :
                 <FaUserTie className=" border-2 border-black rounded-full text-4xl" /> 
                }
              </div>
             }
                   <div className='flex p-2 justify-center items-center '>
                      <UploadImage agentPic={agent?.profilePic?.trim()} id={agent?.$id} />
                   </div>
            </div>
            <div className=' w-full lg:w-3/5 flex flex-col items-start justify-start pt-4 p-1 gap-3'>
                <div className='w-full flex gap-5 items-center justify-between'>
                  <h2 className='font-light capitalize text-lg lg:text-xl '>agent name:</h2>
                  <span className='text-gray-900 font-extrabold text-xl lg:text-2xl'>{agent?.agentName}</span>
                </div>
                <div className='w-full flex gap-5 items-center justify-between'>
                  <h2 className='font-light capitalize text-lg lg:text-xl'>agent phone number:</h2>
                  <span className='text-gray-900 font-extrabold text-xl lg:text-2xl'>{agent?.agentPhoneNumber || '-'}</span>
                </div>
                <div className='w-full flex gap-5 items-center justify-between'>
                  <h2 className='font-light capitalize text-lg lg:text-xl'>agent email:</h2>
                  <span className='text-gray-900 font-extrabold text-xl lg:text-2xl'>{agent?.agentEmail}</span>
                </div>
                {agent?.password && 
                <div className='w-full flex gap-5 items-center justify-between'>
                  <h2 className='font-light capitalize text-lg lg:text-xl '>agent password:</h2>
                  <span className='text-gray-900 font-extrabold text-xl lg:text-2xl'>{agent?.password}</span>
                </div>
                }
                <div className='w-full flex gap-5 items-center justify-between'>
                  <h2 className='font-light capitalize text-lg lg:text-xl'>organiztion(working for):</h2>
                  <span className='text-gray-900 font-extrabold text-xl lg:text-2xl'>{agent?.company || '-'}</span>
                </div>
                <div className=' w-full flex gap-5 items-center justify-between'>
                  <h2 className='font-light capitalize text-lg lg:text-xl'>bio:</h2>
                  <span className='text-gray-900 font-extrabold text-xl lg:text-2xl'>{agent?.bio ? agent?.bio  :'-'}</span>
                </div>
                <AgentProfileInfoUpadte agentInfo={agent} />
            </div> 
        </div>
        }
    </div>
  )
}

export default AgentProfileInfo
