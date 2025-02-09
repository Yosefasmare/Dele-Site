import DashBoardListingSection from '@/components/DashBoardListingSection'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col p-3'>
       <h1 className='font-bold capitalize text-2xl'>listings</h1>
       <div className='pt-2'>
           <DashBoardListingSection />
       </div>
    </div>
  )
}

export default page
