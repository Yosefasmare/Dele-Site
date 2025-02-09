

const page = () => {
  return (
    <div className="w-full flex flex-col">
        <div className="w-full h-[210px] bg-gray-900 flex flex-col justify-end items-center gap-2 pb-2">
                <h1 className="text-white font-extrabold text-5xl">About Us</h1>
                <span className="text-white font-semibold font-serif p-2">Your trusted platform for buying, selling, and renting properties in Ethiopia.</span>
        </div>
        <div className="flex flex-col p-4 bg-gray-200 gap-4">
               <div className="w-full p-7 shadow-xl bg-white rounded-md flex flex-col">
                     <h1 className="text-gray-900 font-bold text-2xl">Mission</h1>
                     <span className="text-gray-900 pt-3 p-1 text-lg">
                     To transform the Ethiopian real estate market by providing a reliable, user-friendly, and secure platform that caters to every need—big or small.
                      We believe everyone deserves a home they love, and we’re here to make that happen.
                     </span>
               </div>
               <div className="w-full p-7 shadow-xl bg-white rounded-md flex flex-col">
                  <h1 className="text-gray-900 font-bold text-2xl">Why Choose Us?</h1>
                   <ul className="list-disc pt-3 p-1 text-lg pl-14">
                       <li className="font-bold ">Verified Listings:
                        <span className="font-semibold"> No scams, no surprises—only properties you can trust.</span>
                       </li>
                       <li className="font-bold ">Easy Search Tools: 
                        <span className="font-semibold"> Filter by location, budget, and property type to find exactly what you need.</span>
                       </li>
                       <li className="font-bold ">Seamless Communication:
                        <span className="font-semibold"> Contact sellers or landlords directly through our platform.</span>
                       </li>
                       <li className="font-bold ">On-the-Go Access:
                        <span className="font-semibold"> Our responsive design works perfectly on mobile, tablet, or desktop.</span>
                       </li>
                   </ul>
               </div>
               <div className="w-full p-7 shadow-xl bg-white rounded-md flex flex-col">
                  <h1 className="text-gray-900 font-bold text-2xl">How it Works</h1>
                   <ul className=" pt-3 p-1 text-lg pl-7">
                       <li className="font-bold ">For Buyers & Renters:
                        <span className="font-semibold"> Explore hundreds of verified listings, use advanced filters, and contact sellers directly to schedule visits.</span>
                       </li>
                       <li className="font-bold ">For Sellers & Landlords: 
                        <span className="font-semibold"> List your property in minutes, reach thousands of potential buyers or tenants, and close deals faster.</span>
                       </li>
                   </ul>
               </div>
        </div>
      
    </div>
  )
}

export default page
