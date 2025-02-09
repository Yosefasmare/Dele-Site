import Image from 'next/image'
import React from 'react'
import House1 from '../public/house1.jpg'
import House2 from '../public/house2.jpg'
import House3 from '../public/house3.jpg'
import House4 from '../public/house4.jpg'
import Link from 'next/link'

const About = () => {
  return (
    <section className='w-full p-4 flex lg:h-[80vh] py-5 '>
        <div className='w-[45%] h-full lg:flex flex-col hidden'>

          <div className='w-full h-1/2 flex justify-center items-end p-4 gap-5'>
          <Image src={House1} alt='pic' className='w-[250px] h-[200px] rounded-xl object-cover ' />
          <Image src={House2} alt='pic' className='w-[200px] h-[150px] rounded-xl object-cover' />
          </div>
          <div className='w-full h-1/2 flex justify-center items-start p-4 gap-5'>
          <Image src={House3} alt='pic' className='w-[200px] h-[150px]  rounded-xl object-cover' />
          <Image src={House4} alt='pic' className='w-[250px] h-[200px] rounded-xl object-cover ' />
          </div>
        </div>
        <div className='lg:w-[55%] w-full flex flex-col pt-[70px]'>
         <h1 className=' capitalize font-extrabold text-3xl lg:text-4xl font-serif'>Welcome to Dele-Site</h1>
         <div className='pt-[20px]'>
        <p className=' text-lg  font-medium'>We are Ethiopia’s trusted platform for buying, selling, and renting properties. Our mission is to simplify your real estate journey by connecting you with verified listings, advanced search tools, and a user-friendly experience. Whether you're searching for a dream home or listing a property, we’re here to help every step of the way. Your dream home is just a click away!
            <Link href={'/about'} className=' underline text-blue-600'>More</Link>
        </p>
        <div className='pt-10 flex gap-5'>
            <Link href={`/properties`} className='p-2 pl-7 pr-7 rounded-md text-white bg-black  border-2 border-black transition-all ease-in-out hover:text-black hover:bg-white '>Explore Listings</Link>
            <Link href={`/dashboard`} className='p-2 pl-7 pr-7 rounded-md text-white bg-[#734b33]  border-2 border-[#734b33] transition-all ease-in-out hover:text-black hover:bg-white '>List Your Property</Link>
        </div>
    </div>
        </div>
    </section>
  )
}

export default About
