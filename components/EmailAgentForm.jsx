'use client'

import { databases, ID } from '@/lib/appwrite';
import { Query } from 'appwrite';
import Form from 'next/form'
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";
import { SyncLoader } from 'react-spinners';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailAgentForm =  ({title,agentId}) => {

  const propertyId = useParams().id


  const defMessage = `I am interested in the ${title} `
  const [name,setName] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [message,setMessage] = useState(defMessage)
  const [error, setError] = useState('')
  const [loading,setLoading] = useState(false)
  
  const handelSubmit = async () =>{
 
    if(!phoneNumber || phoneNumber.length < 10 ){
      setError('please enter a correct phone number')
      return
    }

    console.log(propertyId)

    try {
         setLoading(true)
           await databases.createDocument(
              process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
              process.env.NEXT_PUBLIC_APPWRITE_INQUIRY_ID,
              ID.unique(),
              {
                senderName: name,
                message,
                senderPhoneNumber: phoneNumber,
                agentId,
                propertyId
              }
            );
            setTimeout(() => {
              toast.success("Message sent successfully! 🚀"); // ✅ Show success toast
            }, 200);
            setError('')

             const response = await databases.listDocuments(
                    process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID, // Database ID
                    process.env.NEXT_PUBLIC_APPWRITE_AGENT_COLLECTION_ID, // Collection ID
                    [Query.equal("id", agentId)] 
                  );
            
                  
                  if (response.total === 1) {
                    const agent = response.documents[0];
                    const newValue = (agent?.totalNumberInquery || 0) + 1;
            
                    // Update agent inquiry count
                    await databases.updateDocument(
                      process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
                      process.env.NEXT_PUBLIC_APPWRITE_AGENT_COLLECTION_ID,
                      agent.$id,
                      { totalNumberInquery: newValue }
                    );
                  }

    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }


  }

  return (
    <Form action='/' className='flex flex-col  w-[100%] gap-6 pt-4 items-center' onSubmit={e=>handelSubmit(e.preventDefault())}>
      <div className='flex flex-col justify-center w-full pl-4'>
      <label htmlFor="name" className='text-black font-bold capitalize'>Name</label>
       <input
        type="text" 
        placeholder='Name'
        id='name'
        name='name'
        value={name}
        onChange={e=>setName(e.target.value)}
        className='w-[90%] p-2 border-2 text-lg border-black rounded-md'
        required
         />
      </div>
      <div className='flex flex-col justify-center w-full pl-4'>
      <label htmlFor="tel" className='text-black font-bold capitalize'>Phone Number</label>
      <PhoneInput
      aria-label="Phone number input" 
      country={"et"} // Default Ethiopia (+251)
      value={phoneNumber}
      onChange={(phone)=>setPhoneNumber(phone)}
      inputClass="!w-[90%] !py-5 !border-2 !border-gray-900  rounded-md"
      containerClass="custom-phone-input" 
    />
    {error && <span className='flex font-light text-red-700'>{error}</span>}
      </div>
      <div className='flex flex-col justify-center w-full pl-4'>
      <label htmlFor="tel" className='text-black font-bold capitalize'>message</label>
         <textarea
          placeholder='message'
          value={message}
          onChange={e=>setMessage(e.target.value)}
          className='w-[90%] h-[120px] p-3 border-2 text-lg border-black rounded-md'
           required
         />
      </div>
         <button type='submit' className={`w-[90%] ${loading ? 'bg-[#ec221f92]' : 'bg-[#EC221F]'}  text-white p-2 transition-all ease-in-out  rounded-md text-lg ${!loading && 'hover:bg-black ' }  `} disabled={loading}>{loading ?  <div className='flex gap-2 justify-center text-white'><SyncLoader size={7} color='white' /> sending...</div> : 'send'}</button>
         <ToastContainer position="top-right" autoClose={3000} />
    </Form>
  )
}

export default EmailAgentForm
