'use client'

import React, { useEffect, useState } from 'react'
import ImageUploader from './ImageUpload'
import { fetchAgentFun } from '@/lib/requests'
import { databases,  storage } from '@/lib/appwrite'
import { ID } from 'appwrite';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'
import { RotateLoader } from 'react-spinners'

const AddPropertyForm = ({id}) => {
    const [agent, setAgent] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    

    useEffect(()=>{
        setLoading(true)
        try {
            const fetchAgent = async () =>{
                const agent = await fetchAgentFun({id})
                setAgent(agent)
               
            }
            if(id){
                fetchAgent()
            }
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)

        }
    },[id])


    

    const [images, setUploadedImages] = useState([]);
    const [title,setTitle] = useState('')
    const [status, setStatus] = useState('')
    const [catagory, setCatagory] = useState('')
    const [price, setPrice] = useState('')
    const [pricePer, setPricePer] = useState('')
    const [pricePostFix,setPricePostFix] = useState('')
    const [currency, setCurrency] = useState('')
    const [condition, setCondition] = useState('')
    const [size, setSize] = useState('')
    const [sizePostfix, setSizePostfix] = useState('')
    const [numberOfBed, setNumberOfBed] = useState()
    const [numberOfBath, setNumberOfBath] = useState('')
    const [parking, setParking] = useState('')
    const [discription, setDiscription] = useState('')
    const [street, setStreet] = useState('')
    const [subcity, setSubcity] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [agentFirebaseId,setAgentFirebaseId] = useState(id)
    const [postLoading, setPostLoading] = useState(false)

    const handleImageUpload = (images) =>{
        const file = Object.values(images)
        setUploadedImages(file)
        }
        const handleClear = () =>{
            setUploadedImages()
            setTitle('');
            setStatus('');
            setCatagory('');
            setPrice('');
            setPricePer('');
            setPricePostFix('');
            setCurrency('');
            setSize('');
            setSizePostfix('');
            setNumberOfBed('');
            setNumberOfBath('');
            setParking('');
            setDiscription('');
            setStreet('');
            setSubcity('');
            setCity('');
            setCountry('');
            setAgentFirebaseId(id);
        }

        const [warning, setWarning] = useState("");

        useEffect(() => {
          // Get all number inputs by their type
          const numberInputs = document.querySelectorAll('input[type="number"]');
      
          // Prevent scrolling behavior on all number inputs
          numberInputs.forEach((input) => {
            input.addEventListener('wheel', (event) => {
              event.preventDefault();
            });
          });
      
          // Cleanup the event listeners when the component unmounts
          return () => {
            numberInputs.forEach((input) => {
              input.removeEventListener('wheel', (event) => {
                event.preventDefault();
              });
            });
          };
        }, []);

        const validateFields = () => {
          if (
              images?.[1] !== null && images?.[3] !== undefined &&
              images?.[2] !== null && images?.[3] !== undefined &&
            images?.[3] !== null && images?.[3] !== undefined &&
            !title &&
            !status &&
            !catagory &&
            !price &&
            !pricePer &&
            !pricePostFix &&
            !currency &&
            !size &&
            !sizePostfix &&
            !numberOfBed &&
            !numberOfBath &&
            !parking &&
            !discription &&
            !street &&
            !subcity &&
            !city &&
            !country &&
            !agentFirebaseId
          ) {
            setWarning("Please fill in all the fields.");
            return false;
          }
          setWarning(""); // Clear warning if all fields are valid
          return true;
        };

        const uploadImages = async () => {
            const uploadedImageUrls = [];
            for (const image of images) {
              try {
                const response = await storage.createFile(
                  process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, // Replace with your storage bucket ID
                  ID.unique(), // Auto-generate a unique ID for the file
                  image // File object from input
                );
                const imageUrl = storage.getFileView( process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, response.$id); // Get the URL
                uploadedImageUrls.push(imageUrl);
              } catch (error) {
                console.error("Error uploading image:", error);
                setWarning("Failed to upload some images.");
              }
            }
            return uploadedImageUrls;
          };


const handleSubmit = async () => {
    const parsedPrice = parseInt(price, 10);
    const parsedNumberOfBed = parseInt(numberOfBed, 10);
    const parsedNumberOfBath = parseInt(numberOfBath, 10);
    const parsedSize = parseInt(size, 10);

    if (isNaN(parsedPrice) || isNaN(parsedNumberOfBed) || isNaN(parsedNumberOfBath) || isNaN(parsedSize)) {
        alert("Please ensure all required numeric fields have valid values.");
        return;
    }

    // Set loading state
    setPostLoading(true);

    if (!validateFields()) return;

    try {
        // Upload images
        const uploadedUrls = await uploadImages();

        if (uploadedUrls.length > 0) {
            await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
                process.env.NEXT_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
                ID.unique(),
              {
                    title,
                    status,
                    catagory,
                    imageUrls: uploadedUrls,
                    price: parsedPrice,
                    pricePer,
                    pricePostFix,
                    currency,
                    condition,
                    discription,
                    size: parsedSize,
                    sizePostFix: sizePostfix,
                    numberOfBed: parsedNumberOfBed,
                    numberOfBath: parsedNumberOfBath,
                    parking,
                    street,
                    subcity,
                    city,
                    country,
                    agent: agent?.$id,
                    agentFireBaseId: agentFirebaseId
                }
            );


            const newValue = (agent?.numberOfListedProperties || 0) + 1

            await databases.updateDocument(
              process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
              process.env.NEXT_PUBLIC_APPWRITE_AGENT_COLLECTION_ID,
              agent?.$id,
              {numberOfListedProperties: newValue}
            )

              setTimeout(() => {
                          toast.success("Message sent successfully! 🚀"); // ✅ Show success toast
              }, 200);
              setTimeout(() => {
                 router.push(`/dashboard/${id}/listings`)
               }, 400);
        }
    } catch (error) {
        console.error("Error occurred while submitting:", error);
        // Optional: show user-friendly error message
    } finally {
        setPostLoading(false); // Reset loading state after operation
    }
}


  return (
<>
    <div className='w-full flex flex-col gap-4 justify-center items-center '>
       <form onSubmit={e=>handleSubmit(e.preventDefault())} className=' p-5 flex flex-col gap-3 w-[95%] lg:w-[85%] bg-white/70 shadow-2xl justify-start items-center rounded-sm'>
        <div className='flex justify-around items-center border-b border-gray-900 '>
             <ImageUploader onImagesUploaded={handleImageUpload} />
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="title" className='font-bold capitalize text-2xl'>property title</label>
             <input 
             type="text"
             id='title'
             name='title'
             className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/40 text-white placeholder:text-gray-900'
             placeholder='eg. house for sale'
             onChange={(e)=>setTitle(e.target.value)}
             value={title}
             required
             />
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="status" className='font-bold capitalize text-2xl'>property status</label>
             <select
             onChange={e=>setStatus(e.target.value)}
             value={status}
              name="status" id="status" 
              required
              className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white capitalize'>
                <option value="" hidden className='text-gray-900'>--- select status ---</option>
                <option value="sale">for sale</option>
                <option value="rent">for rent</option>
             </select>
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="status" className='font-bold capitalize text-2xl'>property catagory</label>
             <select
             onChange={e=>setCatagory(e.target.value)}
             value={catagory}
              name="status" id="status" 
              required
              className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white capitalize'>
                  <option value="" hidden>-- Select a Category --</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="single-family-home">Single-Family Home</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="condo">Condo</option>
                  <option value="studio">Studio</option>
                  <option value="duplex">Duplex</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="cottage">Cottage</option>
                  <option value="bungalow">Bungalow</option>
                  <option value="loft">Loft</option>
                  <option value="mansion">Mansion</option>
                  <option value="farmhouse">Farmhouse</option>
                  <option value="cabin">Cabin</option>
                  <option value="mobile-home">Mobile Home</option>
                  <option value="row-house">Row House</option>
                  <option value="shared-accommodation">Shared Accommodation</option>
                  <option value="office-space">Office Space</option>
                  <option value="retail-space">Retail Space</option>
                  <option value="warehouse">Warehouse</option>
             </select>
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="status" className='font-bold capitalize text-2xl'>property condtion</label>
             <select
             onChange={e=>setCondition(e.target.value)}
             value={condition}
              name="status" id="status" 
              required
              className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white capitalize'>
                  <option value="" hidden>-- Select a Condtion --</option>
                  <option value="new-construction">New Construction</option>
                  <option value="renovated">Renovated</option>
                  <option value="under-construction">Under Construction</option>
                  <option value="needs-renovation">Needs Renovation</option>
                  <option value="fully-furnished">Fully Furnished</option>
                  <option value="partially-furnished">Partially Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                  <option value="luxury">Luxury</option>
                  <option value="affordable">Affordable</option>
                  <option value="foreclosure">Foreclosure</option>
                  <option value="move-in-ready">Move-in Ready</option>
                  <option value="leasehold">Leasehold</option>
                  <option value="freehold">Freehold</option>
                  <option value="waterfront">Waterfront</option>
                  <option value="mountain-view">Mountain View</option>
                  <option value="city-view">City View</option>
                  <option value="eco-friendly">Eco-Friendly</option>
                  <option value="gated-community">Gated Community</option>
                  <option value="pet-friendly">Pet-Friendly</option>
                  <option value="public-transport-access">Public Transport Access</option>
             </select>
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="price" className='font-bold capitalize text-2xl'>property price</label>
             <input 
             type="number"
             id='price'
             name='price'
             className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white placeholder:text-gray-900 appearance-none'
             placeholder='eg. 200000000'
             onChange={(e)=>setPrice(e.target.value)}
             value={price}
             required
             />
        </div>
        {status !== '' && 
        <div className='w-full flex flex-col justify-center items-center gap-2'>
            {status === 'sale' ? 
            <>
             <label htmlFor="pricePer" className='font-bold capitalize text-2xl'>pricePer sqft/sqm</label>
             <input 
             type="number"
             id='pricePer'
             name='pricePer'
             className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white placeholder:text-gray-900 appearance-none'
             placeholder='eg. 2000'
             onChange={(e)=>setPricePer(e.target.value)}
             value={pricePer}
             required
             />
             <span className='font-light capitalize'>exapmle 2000 /sqft ,  2000 /sqm </span>
             </>
             :
             <>
             <label htmlFor="pricePer" className='font-bold capitalize text-2xl'>price postfix</label>
             <select
             onChange={e=>setPricePostFix(e.target.value)}
             value={pricePostFix}
             required
              name="pricePer" id="pricePer"
              className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white capitalize'
              >
                <option value="" hidden>--- select price postfix ---</option>
                <option value="daily">daily</option>
                <option value="month">per month</option>
                <option value="yearly">yearly</option>
              </select>
              </>
         }
        </div>
      }
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="currency" className='font-bold capitalize text-2xl'>property price currency</label>
             <select 
             onChange={e=>setCurrency(e.target.value)}
             value={currency}
             required
             name="currency" id="currency"
             className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white capitalize'
             >
                 <option value="" hidden>-- select currency --</option>
                 <option value="usd">USD</option>
                 <option value="etb">ETB</option>
             </select>
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="size" className='font-bold capitalize text-2xl'>property size</label>
             <input 
             type="number"
             id='size'
             name='size'
             className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white placeholder:text-gray-900 appearance-none'
             placeholder='eg. 20000'
             onChange={(e)=>setSize(e.target.value)}
             value={size}
             required
             />
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="sizePostfix" className='font-bold capitalize text-2xl'>property size postfix</label>
             <select 
             onChange={e=>setSizePostfix(e.target.value)}
             value={sizePostfix}
             required
             name="sizePostfix" id="sizePostfix"
             className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white capitalize'
             >
                 <option value="" hidden>-- select size postfix --</option>
                 <option value="sqft">per sqft</option>
                 <option value="sqm">per sqm</option>
             </select>
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="bedrooms" className='font-bold capitalize text-2xl'>number of bedrooms</label>
             <input 
             type="number"
             id='bedrooms'
             name='bedrooms'
             className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white placeholder:text-gray-900 appearance-none'
             placeholder='eg. 3'
             onChange={(e)=>setNumberOfBed(e.target.value)}
             value={numberOfBed}
             required
             />
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="bathrooms" className='font-bold capitalize text-2xl'>number of bathrooms </label>
             <input 
             type="number"
             id='bathrooms'
             name='bathrooms'
             className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white placeholder:text-gray-900 appearance-none'
             placeholder='eg. 2'
             onChange={(e)=>setNumberOfBath(e.target.value)}
             value={numberOfBath}
             required
             />
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="parking" className='font-bold capitalize text-2xl'>parking condition </label>
             <input 
             type="text"
             id='parking'
             name='parking'
             className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white placeholder:text-gray-900'
             placeholder='eg. 1 garage, 1 parking lot, open parking'
             onChange={(e)=>setParking(e.target.value)}
             value={parking}
             required
             />
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="discription" className='font-bold capitalize text-2xl'>property discription </label>
             <textarea 
             type="text"
             id='discription'
             name='discription'
             className='w-[80%] h-[300px] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white placeholder:text-gray-900'
             placeholder='eg. it has ....'
             onChange={(e)=>setDiscription(e.target.value)}
             value={discription}
             required
             />
        </div>
        <h1 className='font-bold text-3xl p-2'>property location</h1>
    <div className='flex flex-col lg:grid lg:grid-cols-2 w-full'>
            <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="steet" className='font-bold capitalize text-2xl'> street </label>
             <input 
             type="text"
             id='steet'
             name='steet'
             className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white placeholder:text-gray-900'
             placeholder='eg. kara'
             onChange={(e)=>setStreet(e.target.value)}
             value={street}
             required
             />
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="subcity" className='font-bold capitalize text-2xl'>subcity </label>
             <input 
             type="text"
             id='subcity'
             name='subcity'
             className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white placeholder:text-gray-900'
             placeholder='eg. kolfie keranio'
             onChange={(e)=>setSubcity(e.target.value)}
             value={subcity}
             required
             />
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="city" className='font-bold capitalize text-2xl'>city </label>
             <input 
             type="text"
             id='city'
             name='city'
             className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white placeholder:text-gray-900'
             placeholder='eg. Addis Abeba'
             onChange={(e)=>setCity(e.target.value)}
             value={city}
             required
             />
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
             <label htmlFor="country" className='font-bold capitalize text-2xl'>country </label>
             <input 
             type="text"
             id='country'
             name='country'
             className='w-[80%] p-2 py-3 outline-none border-none rounded-sm bg-black/50 text-white placeholder:text-gray-900'
             placeholder='eg. Ethiopia'
             onChange={(e)=>setCountry(e.target.value)}
             value={country}
             required
             />
        </div>
 </div>
        
        <div className='flex justify-center items-center gap-4 pt-9 border-t-2 border-gray-900 mt-4'>
                <button onClick={handleClear} type='clear' className='py-3 px-14 rounded-md font-semibold text-xl text-white bg-red-500'>Clear</button>
                <button type='submit' className='py-3 px-14 rounded-md font-semibold text-xl text-white bg-green-500'>{postLoading ? ' posting...' : 'post'}</button>
        </div>
       </form>
                {loading && (
                   <div className="flex flex-col z-10 fixed justify-center items-center gap-6 top-3 bg-black/70 backdrop-blur-md border border-white/20 rounded-lg shadow-lg w-[95%] lg:left-[400px] lg:w-[650px] h-[80%] left-3 ">
                            <h3 className="font-extrabold text-white text-2xl">posting please wait a little bit</h3>
                          <div className="flex justify-center items-center w-[270px] h-[270px] overflow-hidden object-cover rounded-full ">
                             <RotateLoader size={30} color='white'/>
                          </div>
                   </div>
                )}
 
         <ToastContainer position="top-right" autoClose={3000} />

    </div>
   </>
  )
}

export default AddPropertyForm
