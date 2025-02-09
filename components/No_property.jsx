
import Image from 'next/image'
import No_property_Img from '../public/no_property.webp'

const No_property = () => {
  return (
    <div className="w-full flex justify-center items-center p-5">
        <Image src={No_property_Img} alt='No Property' className='w-[250px]' />
    </div>
  )
}

export default No_property
