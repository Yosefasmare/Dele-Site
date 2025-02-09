import Image from 'next/image'
import ExpandingBall from '@/components/ExpandingBall'
import { FiMapPin } from "react-icons/fi";
import EmailAgentForm from '@/components/EmailAgentForm';
import AgentInfoBox from '@/components/AgentInfoBox';
import { databases } from '@/lib/appwrite';




const page = async ({params}) => {
  const id = (await params).id
      const response = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
        process.env.NEXT_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
        id
      )
      const  propertybyid  = response


     

  return (
    <>
      <main className='w-full h-[85px]' />
      <div className='w-full p-10 pt-5 flex flex-col'>
          <div className='w-[100%]   h-[440px] flex flex-col lg:flex-row justify-between items-center overflow-hidden'>
              <Image src={propertybyid?.imageUrls?.[0]} width={1000} height={1000} alt='property image' className='lg:w-[75%] w-full h-[60%]   rounded-[40px] lg:h-full object-cover'/>
              <div className='lg:w-[30%] lg:h-[100%] w-full h-[40%] flex lg:flex-col items-center justify-around gap-5 '>
                      <Image  src={propertybyid?.imageUrls?.[1]} alt='property image' width={1000}  height={1000} className='lg:w-[300px] lg:h-[200px] h-[70%] overflow-hidden rounded-lg'/>
                      <Image  src={propertybyid?.imageUrls?.[2]} alt='property image' width={1000}  height={1000} className='lg:w-[300px] lg:h-[200px] h-[70%] overflow-hidden rounded-lg'/>
                 
              </div>
          </div>
          <div className='flex lg:flex-row flex-col'>
             <div className='lg:w-[65%] w-full flex flex-col'>
                  <div className='flex font-serif text-3xl p-4 items-center gap-3'>
                       <ExpandingBall status={propertybyid?.status} />
                        {propertybyid?.catagory} for {propertybyid?.status}
                  </div>
                  <div className={` flex items-center font-sarif text-2xl lg:text-4xl font-extrabold  overflow-hidden`}>
                  {propertybyid?.currency.toUpperCase() === 'USD' ? '$' : (<span className='text-lg font-light font-serif'>ETB</span>)}
                  {propertybyid?.price.toLocaleString('en-US')}{propertybyid?.pricePostFix != '' && '/' + propertybyid?.pricePostFix}
                  </div>
                  <div className='flex gap-3 items-center pt-2 font-sans text-lg'>
                        <div>{propertybyid?.numberOfBed} bed</div>
                        |
                        <div>{propertybyid?.numberOfBath} bath</div>
                        |
                        <div>{propertybyid?.size} {propertybyid?.sizePostFix}</div>
                  </div>
                  <div className='flex capitalize items-center gap-1 pt-6 text-2xl font-bold'>
                          <FiMapPin />
                          {propertybyid?.street},{propertybyid?.subcity},{propertybyid?.city},{propertybyid?.country}
                  </div>
                  <div className='flex flex-col w-full pt-5'>
                         <span className='font-bold text-xl '>Description</span>
                         <div className=' capitalize text-wrap'>
                          {propertybyid?.discription}
                         </div>
                  </div>
                  <div className='flex flex-col pt-5 gap-4'>
                      <span className='font-bold text-xl '> Property Highlights</span>
                      <div className='lg:w-[85%] w-full lg:h-[250px] h-[300px] border-4 border-black rounded-xl p-3 pl-10 flex flex-wrap shadow-custom'>
                          <div className='w-[50%] flex flex-col lg:flex-row items-center justify-center gap-2 lg:justify-between  pr-10'>
                                   <span className='text-sm lg:text-lg font-serif text-slate-600'>Property Type:</span>
                                   <span className='text-xl text-center font-serif font-bold'>{propertybyid?.catagory}</span>
                          </div>
                          <div className='w-[50%] flex flex-col lg:flex-row items-center justify-center gap-2 lg:justify-between  pr-10'>
                                   <span className='text-sm lg:text-lg font-serif text-slate-600'>Parking:</span>
                                   <span className='text-xl text-center font-serif font-bold'> {propertybyid?.parking || '-'}</span>
                          </div>
                          <div className='w-[50%] flex flex-col lg:flex-row items-center justify-center gap-2 lg:justify-between  pr-10'>
                                   <span className='text-sm lg:text-lg font-serif text-slate-600'>Condition:</span>
                                   <span className='text-xl text-center font-serif font-bold'>{propertybyid?.condition}</span>
                          </div>
                      <div className='w-[50%] flex flex-col lg:flex-row items-center justify-center gap-2 lg:justify-between  pr-10'>
                                   <span className='text-sm lg:text-lg font-serif text-slate-600'>Status:</span>
                                   <span className='text-xl text-center font-serif font-bold'>for  {propertybyid?.status}</span>
                          </div>
                          <div className='w-[50%] flex flex-col lg:flex-row items-center justify-center gap-2 lg:justify-between  pr-10'>
                                   <span className='text-sm lg:text-lg font-serif text-slate-600'>Price/{propertybyid?.sizePostFix}:</span>
                                   <span className='text-md text-center font-serif flex items-end'>
                                   {propertybyid?.currency.toUpperCase() === 'USD' ? '$' : (<span className='text-lg font-light font-serif'>ETB</span>)} 
                                   <span className='font-bold !text-xl'>  {propertybyid?.pricePer.toLocaleString('en-US') || '-'} </span>
                                   </span>
                          </div>
                          <div className='w-[50%] flex flex-col lg:flex-row items-center justify-center gap-2 lg:justify-between  pr-10'>
                                   <span className='text-sm lg:text-lg font-serif text-slate-600'>Company:</span>
                                   <span className='text-xl font-serif font-bold'>{propertybyid?.agent?.company || '-'}</span>
                          </div>
                      </div>
                  </div>
                  <div className='flex justify-center w-[100%] h-auto p-2 pt-4 lg:hidden'>
             <div className='flex flex-col justify-strat items-center w-full h-[500px] border-2 shadow-custom trans bg-white  border-black rounded-md'>
                      <span className='p-2 text-2xl font-bold'>If Interested</span>
                      <EmailAgentForm agentEmail={propertybyid?.agent?.agentEmail} title={propertybyid?.title} agentId={propertybyid?.agent.id}/>
                </div>
             </div>
                  <div className='w-full flex flex-col pt-7 gap-3 '>
                    <h1 className='font-bold text-xl '>Posted By</h1>
                     <AgentInfoBox agentId={propertybyid?.agent?.$id} agentPic={propertybyid?.agent?.profilePic} agentName={propertybyid?.agent?.agentName}  agentEmail={propertybyid?.agent?.agentEmail} agentPhoneNumber={propertybyid?.agent?.agentPhoneNumber} />
                  </div>
             </div>
             <div className='lg:flex justify-center w-[35%] h-auto p-2 pt-4 hidden'>
             <div className='flex flex-col justify-strat items-center w-[85%] h-[500px] border-2 shadow-custom trans bg-white  border-black rounded-md'>
                      <span className='p-2 text-2xl font-bold'>If Interested</span>
                      <EmailAgentForm agentEmail={propertybyid?.agent?.agentEmail} title={propertybyid?.title} agentId={propertybyid?.agent.id} propertyId={id}/>
                </div>
             </div>
          </div>
      </div>
    </>
  )
}




export default page
