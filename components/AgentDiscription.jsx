'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaHandshake, FaUserTie } from 'react-icons/fa'
import { MdMapsHomeWork } from 'react-icons/md'
import ListingSection from './ListingSection'
import { databases } from '@/lib/appwrite'
import { Query } from 'appwrite'
import UserDashboard from './User'

const AgentDiscription = ({agent}) => {
    const [propertyPosts,setPropertyPosts] = useState([])

    useEffect(()=>{
        const fetchAgentProps = async () => {
            const response = await databases.listDocuments(
              process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
              process.env.NEXT_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
              [Query.equal("agentFireBaseId", agent?.id)] 
            )

            setPropertyPosts(response.documents)
        }

        if(agent){
            fetchAgentProps()
        }
    },[agent])


  return (
    <div className='flex flex-col  lg:flex-row  w-full gap-10'>
        <div className='flex flex-col justify-center  items-center lg:h-[400px] lg:p-8 rounded-md lg:border-4 border-b-2 lg:border-b-4 border-black'>
        {agent?.company !== null && agent?.company !== '' && 
               <div className='justify-center items-center font-bold'>
                  Works For <span className='text-red-950 font-extrabold underline'>{agent?.company}</span>
               </div>
            }
               <div className='pt-2 font-bold text-2xl'>
                 {agent?.agentName}
               </div>
               <div className='pb-2 font-semibold underline text-lg'>
               {agent?.agentPhoneNumber}
               </div>
              <div className='w-[170px]  h-[170px] rounded-full object-center border-2 border-black overflow-hidden'>
                 {agent?.profilePic ? 
                 <Image src={agent?.profilePic} alt={'agent profile pic'} width={800} height={800} className=' object-cover w-full ' />
                 :
                 <FaUserTie className=" border-2 border-black rounded-full text-4xl" />
                 }
              </div>
              <div className='flex justify-around items-center w-full'>
                    <div className='flex justify-center items-center font-semibold text-2xl'>
                        <MdMapsHomeWork color='brown' size={30} /> -{agent?.numberOfListedProperties || 0}
                    </div> 
                    <div className='flex justify-center items-center font-semibold text-xl'>
                        <FaHandshake color='green' size={30} /> -{agent?.numberOfSoldorRentedHouses || 0}
                    </div>
              </div>
              <div className=' flex flex-col  p-2  '>
                <h3 className='font-bold text-xl'>Bio</h3>
                <span className='font-serif'>
                    {agent?.bio.length >= 16 ? agent?.bio.slice(0,16) : agent?.bio }
                </span>
              </div>
        </div>

        <div className='lg:w-[80%] w-full -mt-10'>
          <ListingSection propertyPosts={propertyPosts} headerName={'Listed Properties'} />
        </div>
       

    </div>
  )
}

export default AgentDiscription
