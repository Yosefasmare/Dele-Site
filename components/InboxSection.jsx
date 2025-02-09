'use client'

import React, { useEffect, useState } from 'react'
import Inbox from './Inbox'
import { useParams } from 'next/navigation'
import { databases } from '@/lib/appwrite'
import { Query } from 'appwrite'
import PropertyDetailLoader from './PropertyDetailLoader'
import Image from 'next/image'
import NoInbox from '../public/noInbox.png'

const InboxSection =  () => {

    const {id} = useParams()

    const [inquiries, setInquiries] = useState([]); // Store the inquiries
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
  
    useEffect(() => {
      const fetchInquiries = async () => {
        try {
          // Fetch documents based on the agentId
          const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
            process.env.NEXT_PUBLIC_APPWRITE_INQUIRY_ID,
            [Query.equal("agentId", id)] // Query by agentId
          );
  
            setInquiries(response.documents)
        } catch (error) {
          setError(error.message); // Handle any errors
        } finally{
          setLoading(false)
        }
      };
  
      if (id) {
        fetchInquiries(); // Fetch inquiries if id is available
      }
    }, [id]);


  return (
      <div>
        {loading ? <div className='flex p-28 justify-center items-center '><PropertyDetailLoader /></div> : 
          <div className="flex flex-col p-2 gap-2 overflow-y-scroll  border h-[400px]  border-gray-500 rounded-md">
             {inquiries != [] && inquiries !== null && inquiries.length > 0 ?  inquiries.map((inquery=>(
              <Inbox key={inquery.$id} inquery={inquery} />
             ))): (
              <div className='w-full h-full object-center'>
                <Image src={NoInbox} alt={'no inbox'} width={200} height={200} className='w-full h-[300px] object-contain' />
              </div>
             )}
         </div>
        }
      </div>
  )
}

export default InboxSection
