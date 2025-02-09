import Image from 'next/image'
import React from 'react'

import Link from 'next/link'
import ExpandingBall from './ExpandingBall'

const Property = ({id,PropertyImg,title, catagory, price, pricePostFix, currency, status, noBed , noBath , size, location}) => {

  const pricePostfix = pricePostFix ? `/${pricePostFix}` : ''

  return ( 
    <div className='w-[360px] h-[460px] rounded-[40px] border-8 border-gray-900 p-3 flex flex-col bg-white shadow-custom transition-all ease-in-out hover:shadow-custom-hover'>
       <div className='w-full h-[55%] overflow-hidden rounded-[30px] bg-gray-900'>
        <Image src={PropertyImg} width={800} height={800} alt='property image' className='w-full h-full '/>
       </div>
       <div className=' w-full h-[15%] flex justify-around items-center'>
        <span className='text-2xl font-semibold'>{currency.toUpperCase() === 'USD' ? '$' : (<span className='text-lg font-light font-serif'>ETB</span>)}{price.toLocaleString('en-US').length <= 7 ?  price.toLocaleString('en-US') + pricePostfix  : price.toLocaleString('en-US').slice(0,10) + '...' + pricePostfix }</span>
        <div className='flex gap-1 items-center justify-center'>
            <ExpandingBall status={status} />
            <span className=' capitalize text-lg font-bold'>{catagory} for {status}</span>
        </div>
       </div>
       <div className='flex p-1 capitalize font-light font-serif text-4xl'>
               {title.length > 17 ? title.slice(0,17) + '...' : title}
       </div>
       <div className='flex w-full py-3 gap-2 pl-4 items-center'>
          <span className=' font-serif font-bold text-lg'> {noBed} bed </span>
           |
          <span className=' font-serif font-bold text-lg'> {noBath} bath</span>
          |
          <span className=' font-serif font-bold text-lg'> {size} </span>
       </div>
       <div className='w-full h-10% flex'>
        <div className='w-[70%] h-[100%] text-wrap font-serif font-bold text-lg pl-4 text-ellipsis'>
            {location.length <= 35 ? location : location.slice(0, 35) + '...'} 
        </div>
        <div className='w-30% h-full flex items-center justify-center'>
        <Link href={`/properties/${id}`}><button className='pl-5 pr-5 p-2 bg-black text-white font-bold rounded-md transition-all ease-in-out'>Details</button></Link>
        </div>
       </div>
    </div>
  )
}

export default Property
