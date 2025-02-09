import Link from 'next/link'
import React from 'react'

const Inbox = ({inquery}) => {
  return (
    <div className='flex p-1 pl-2 gap-3 border-2 border-gray-900 items-center'>
        <div className='flex flex-col'>
            <h3 className=' capitalize font-light '>sender name</h3>
            <span className='font-bold font-serif text-md flex'>{inquery?.senderName}</span>
        </div>
        <div className='flex flex-col'>
            <h3 className=' capitalize font-light '>sender phoneNumber</h3>
            <span className='font-semibold font-serif text-md flex'> {inquery?.senderPhoneNumber}</span>
        </div>
        <div className='flex flex-col'>
            <h3 className=' capitalize font-light '>message</h3>
            <span className='font-semibold font-serif text-sm flex'> {inquery?.message.length >=  15 ?  inquery?.message.slice(0,15): inquery?.message}</span>
        </div>
        <Link href={`/properties/${inquery?.propertyId}`} className='px-7 py-2 bg-blue-400 rounded-md text-gray-900 font-bold' >Look</Link>
    </div>
  )
}

export default Inbox
