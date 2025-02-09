import Image from 'next/image';
import DashBoardBanner from '../../../../public/dashboardBanner.jpg'
import { MdMapsHomeWork } from "react-icons/md";
import { FaEye ,FaHandshake } from "react-icons/fa";
import { TiMessages } from "react-icons/ti"
import AgentAnalitics from '@/components/AgentAnalitics';
import AgentProperies from '@/components/AgentProperies';
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';
import InboxSection from '@/components/InboxSection';
import DashBoardListingSection from '@/components/DashBoardListingSection';

const page = async ({params}) => {
    const id = (await params).id

    const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID, // Database ID
        process.env.NEXT_PUBLIC_APPWRITE_AGENT_COLLECTION_ID, // Collection ID
        [Query.equal("id", id)] // Filter by the `id` field (not `$id`)
      );

      const agent = response.documents[0]

 
  return (
      <div className="flex flex-col w-full p-3 gap-3">
           <h1 className=" text-3xl text-gray-900 font-rorboto">DashBoard overview</h1>
           <div className="w-full flex flex-col mt-5 overflow-hidden rounded-[30px] relative" > 
              <Image src={DashBoardBanner} alt='banner' width={1000} height={1000} className=' absolute w-full h-full object-cover z-0' />
               <div className='flex flex-col p-5 z-30  '>
                   <h1 className='font-serif font-extrabold text-4xl text-white capitalize p-5'>DashBoard analitics</h1>
                   <div className='grid grid-cols-2 gap-4 place-items-center lg:flex'>
                      <AgentAnalitics icon={<MdMapsHomeWork />} header={'total listings'} value={agent?.numberOfListedProperties || 0} />
                      <AgentAnalitics icon={<FaHandshake />} header={'total sold/rented'} value={agent?.numberOfSoldorRentedHouses || 0} />
                      <AgentAnalitics icon={<TiMessages />} header={'total inquiries'} value={agent?.totalNumberInquery || 0} />

                   </div>
               </div>
               <div className="bg-gradient-to-b from-[rgba(0,0,0,0.2)] via-[rgba(0,0,0,0.6)] to-gray-900 w-full h-full absolute z-10" />
           </div>
           <DashBoardListingSection />
            <div className='flex flex-col p-4'>
               <h2 className=' capitalize font-bold text-xl'>customers inbox</h2>
               <InboxSection />
            </div>
      </div>
  );
};

export default page;
