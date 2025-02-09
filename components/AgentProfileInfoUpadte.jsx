'use client'

import { databases } from '@/lib/appwrite'
import React, { useState } from 'react'

const AgentProfileInfoUpadte = ({agentInfo}) => {
    const [isUpdateOpen,setIsUpdateOpen] = useState(false)
    const [newName, setNewName] = useState(agentInfo?.agentName)
    const [newPhoneNumber, setNewPhoneNumber] = useState(agentInfo?.agentPhoneNumber)
    const [newEmail, setNewEmail] = useState(agentInfo?.agentEmail)
    const [newPassword, setNewPassword] = useState(agentInfo?.password)
    const [newOrganiztion, setNewOrganization] = useState(agentInfo?.company)
    const [newBio, setNewBio] = useState(agentInfo?.bio)
    const [loading, setLoading] = useState(false)

    const handleUpdate = async () => {

        if(newName === agentInfo?.agentName && newPhoneNumber === agentInfo?.agentPhoneNumber && newEmail === agentInfo?.agentEmail && newPassword === agentInfo?.password && newOrganiztion === agentInfo?.company && newBio === agentInfo?.bio){
            alert('Please! Change Atleast One Feild')
            return 
        }
        try {
            setLoading(true)
            await databases.updateDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
                process.env.NEXT_PUBLIC_APPWRITE_AGENT_COLLECTION_ID,
                agentInfo?.$id,
                {
                    agentName: newName,
                    agentPhoneNumber: newPhoneNumber,
                    agentEmail: newEmail,
                    bio: newBio,
                    company: newOrganiztion,
                    password: newPassword
                }
            )
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            setIsUpdateOpen(false)
            setNewBio('')
            setNewEmail('')
            setNewName('')
            setNewOrganization('')
            setNewPassword('')
            setNewPhoneNumber('')
            window.location.reload()
        }


    }

    const handleClear =()=>{
        setIsUpdateOpen(false)
        setNewBio('')
        setNewEmail('')
        setNewName('')
        setNewOrganization('')
        setNewPassword('')
        setNewPhoneNumber('')
    }

  return (
    <div className=' relative'>
    <div className='flex items-center justify-center'>
      <button onClick={()=>setIsUpdateOpen(prev=>!prev)} className='px-6 py-2 font-bold capitalize bg-green-600 text-white rounded-md cursor-pointer transition ease-in-out hover:scale-110'>update profile info</button>
   </div>
   {isUpdateOpen && 
    <div className="flex flex-col  z-10 overflow-y-scroll fixed justify-start pt-3 items-center gap-5  top-3 bg-black/70 backdrop-blur-md border border-white/20 rounded-lg shadow-lg w-[95%] lg:left-[400px] lg:w-[650px] h-[90%] left-3 ">
      <h1 className='font-extrabold text-3xl text-white capitalize'>update your info</h1>
      <form onSubmit={e=>handleUpdate(e.preventDefault())} className='flex-col flex gap-4 items-start p-4'>
          <div className='flex flex-col items-start gap-3'>
              <label htmlFor="name" className=' capitalize text-xl font-semibold text-white'>agent name</label>
              <input 
              type="text"
              onChange={(e)=>setNewName(e.target.value)}
              defaultValue={newName}
              className='py-3 px-4 w-[400px] outline-none text-white rounded-sm bg-gray-800'
              required
               />
          </div>
          <div className='flex flex-col items-start gap-3'>
              <label htmlFor="name" className=' capitalize text-xl font-semibold text-white'>agent phone number</label>
              <input 
              type="tel"
              onChange={e=>setNewPhoneNumber(e.target.value)}
              defaultValue={newPhoneNumber}
              className='py-3 px-4 w-[400px] outline-none text-white rounded-sm bg-gray-800'
              required
               />
          </div>
          <div className='flex flex-col items-start gap-3'>
              <label htmlFor="name" className=' capitalize text-xl font-semibold text-white'>agent email</label>
              <input 
              type="email"
              onChange={e=>setNewEmail(e.target.value)}
              defaultValue={newEmail}
              className='py-3 px-4 w-[400px] outline-none text-white rounded-sm bg-gray-800'
              required
               />
          </div>
          {agentInfo?.password && 
          <div className='flex flex-col items-start gap-3'>
              <label htmlFor="name" className=' capitalize text-xl font-semibold text-white'>password</label>
              <input 
              type="password"
              onChange={e=>setNewPassword(e.target.value)}
              defaultValue={newPassword}
              className='py-3 px-4 w-[400px] outline-none text-white rounded-sm bg-gray-800'
              required
               />
          </div>
          }
           <div className='flex flex-col items-start gap-3'>
              <label htmlFor="name" className=' capitalize text-xl font-semibold text-white'>organiztion/work for (optional)</label>
              <input 
              type="text"
              onChange={e=>setNewOrganization(e.target.value)}
              defaultValue={newOrganiztion}
              className='py-3 px-4 w-[400px] outline-none text-white rounded-sm bg-gray-800'
               />
          </div>
          <div className='flex flex-col items-start gap-3'>
              <label htmlFor="name" className=' capitalize text-xl font-semibold text-white'>bio(optional)</label>
              <textarea 
              defaultValue={newBio}
              onChange={e=>setNewBio(e.target.value)}
              className='py-3 px-4 w-[400px] h-[200px] outline-none text-white rounded-sm bg-gray-800'
               />
          </div>
          <div className='flex w-full gap-3 p-4 justify-center items-center'>
                <button  onClick={handleClear} type='cancle' className='px-11 rounded-md py-2 bg-red-600 font-semibold font-serif text-white transition ease-in-out hover:scale-105' disabled={loading}>cancle</button>
                <button type='submit' className={`px-11 rounded-md py-2 bg-green-600 font-semibold font-serif text-white transition ease-in-out hover:scale-105 ${loading && 'cursor-not-allowed bg-green-200'}`} disabled={loading}>{loading ? 'updateing...' : 'update'}</button>
          </div>
          
      </form>
     </div>
   }
   </div>
  )
}

export default AgentProfileInfoUpadte
