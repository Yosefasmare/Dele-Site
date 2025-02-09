import React from 'react'

const AgentAnalitics = ({header,icon,value}) => {
  return (

    <div className='p-2 px-3 flex flex-col w-full lg:flex-1 rounded-lg bg-[rgba(0,0,0,.5)] border-2 border-white   justify-center items-center'>
       <h2 className='text-xl font-light text-white capitalize '>{header}</h2>
       <span className='flex gap-2 font-serif font-thin justify-center items-center text-3xl text-orange-300'>{icon} {value}</span>
    </div>

  )
}

export default AgentAnalitics
