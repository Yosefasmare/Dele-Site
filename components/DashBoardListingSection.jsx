'use client';

import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { useParams } from 'next/navigation';
import Property from './Property';
import No_property from './No_property';
import { useEffect, useState } from 'react';
import PropertyDetailLoader from './PropertyDetailLoader';
import Link from 'next/link';
import { fetchAgentFun } from '@/lib/requests';

const DashBoardListingSection = () => {
  const { id } = useParams();
  const [agentProperties, setAgentProperties] = useState([]);
  const [agent, setAgent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProperties, setSelectedProperties] = useState([]);

  useEffect(()=>{
    const fetchAgent = async () =>{
      const agent = await fetchAgentFun({id})
      if(agent){
        setAgent(agent)
      }
    }
    if(id){
      fetchAgent()
    }

  },[id])

  // Function to toggle selection of a property
  const toggleSelection = (propertyId) => {
    if (selectedProperties.includes(propertyId)) {
      setSelectedProperties(selectedProperties.filter((id) => id !== propertyId));
    } else {
      setSelectedProperties([...selectedProperties, propertyId]);
    }
  };

  // Function to delete selected properties
  const deleteSelectedProperties = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedProperties.length} selected property/properties?`
      )
    ) {
      try {
        for (const propertyId of selectedProperties) {
          await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
            process.env.NEXT_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
            propertyId
          );
          const newValue = (agent?.numberOfListedProperties) - 1
          await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
            process.env.NEXT_PUBLIC_APPWRITE_AGENT_COLLECTION_ID,
            agent.$id,
            {numberOfListedProperties: newValue}
          )
        }
        // Refresh the list after deletion
        fetchAgentProperties();
        setSelectedProperties([]); // Clear selected properties
      } catch (error) {
        console.error('Error deleting properties:', error);
        setError('Failed to delete properties.');
      }
    }
  };

  const handleSold = async () =>{
    if (
      window.confirm(
        `Are you sure you want set ${selectedProperties.length} selected property/properties Sold?`
      )
    ) {
      try {
        for (const propertyId of selectedProperties) {
          await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
            process.env.NEXT_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
            propertyId
          );
          const newValue = (agent?.numberOfSoldorRentedHouses || 0) + 1;
          const newValue2 = (agent?.numberOfListedProperties) - 1
            await databases.updateDocument(
                  process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
                  process.env.NEXT_PUBLIC_APPWRITE_AGENT_COLLECTION_ID,
                  agent.$id,
                  { 
                    numberOfListedProperties: newValue2,
                    numberOfSoldorRentedHouses: newValue 
                  }
                );
        }
        
        // Refresh the list after deletion
        fetchAgentProperties();
        setSelectedProperties([]); // Clear selected properties
      } catch (error) {
        console.error('Error deleting properties:', error);
        setError('Failed to delete properties.');
      }
    }
  }

  // Fetch agent properties based on the agent's ID
  const fetchAgentProperties = async () => {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
        process.env.NEXT_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
        [Query.equal('agentFireBaseId', id)]
      );
      setAgentProperties(response.documents);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAgentProperties();
    }
  }, [id]);

  return (
    <div className='w-full p-6'>
      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center p-28">
          <PropertyDetailLoader />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {/* No properties state */}
          {agentProperties.length === 0 || agentProperties == undefined || agentProperties == null ? (
            <div className="w-full flex flex-col justify-center items-center">
              <No_property />
              <Link
                href={`/dashboard/${id}/listings/add-property`}
                className="font-bold px-11 py-3 bg-black capitalize text-white border-2 border-black rounded-md transition-all ease-in-out hover:bg-white hover:text-black"
              >
                Add New Property
              </Link>
            </div>
          ) : (
            <div className='flex flex-col w-full'>
              {/* Delete button for selected properties */}
              <div className='flex justify-center items-center p-2 gap-2 border-2 border-black w-full'>

              <button
                onClick={handleSold}
                disabled={selectedProperties.length === 0}
                className={`px-4 py-2 mt-4 ${
                  selectedProperties.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                } rounded-md`}
              >
                Sold House
              </button>

              <button
                onClick={deleteSelectedProperties}
                disabled={selectedProperties.length === 0}
                className={`px-4 py-2 mt-4 ${
                  selectedProperties.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                } rounded-md`}
              >
                Delete Selected Properties
              </button>

              </div>

              {/* Property list with checkboxes */}
              <div className="p-3 flex flex-wrap gap-5 justify-center w-full">
                {agentProperties.map((property) => (
                  <div key={property.$id} className="relative flex w-full  items-center gap-2">
                    {/* Checkbox for selection */}
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property.$id)}
                      onChange={() => toggleSelection(property.$id)}
                      className="absolute top-2 left-2 z-10"
                    />
                    {/* Property card */}
                    <div className='flex p-5 justify-around w-full border-2 border-black rounded-md items-center'>
                      <div className='flex flex-col '>
                        <h2 className='font-bold '>Title</h2>
                         <span>
                          {property.title}
                         </span>
                      </div>
                      <div className='flex flex-col '>
                        <h2 className='font-bold '>Catagory</h2>
                         <span>
                          {property?.catagory}
                         </span>
                      </div>
                      <div className='flex flex-col '>
                        <h2 className='font-bold '>Status</h2>
                         <span>
                          {property?.status}
                         </span>
                      </div>
                      <div className='flex flex-col '>
                        <h2 className='font-bold '>Size</h2>
                         <span>
                         {`${property?.size} ${property?.sizePostFix}`}
                         </span>
                      </div>
                      <div className='flex flex-col '>
                        <h2 className='font-bold '>Number of bedrooms</h2>
                         <span>
                          {property?.numberOfBed}
                         </span>
                      </div>
                      <div className='flex flex-col '>
                        <h2 className='font-bold '>Number of Bathrooms</h2>
                         <span>
                          {property?.numberOfBath}
                         </span>
                      </div>
                      <div className='flex  justify-center items-center '>
                        <Link href={`/properties/${property.$id}`} className='px-10 py-3 border-2 border-green-500 rounded-md transition ease-in-out  bg-green-500 hover:bg-white text-black'>Look</Link>
                      </div>
                    </div>
                    {/* <Property
                      id={property.$id}
                      title={property.title}
                      price={property?.price}
                      currency={property?.currency}
                      PropertyImg={property?.imageUrls?.[0]}
                      catagory={property?.catagory}
                      status={property?.status}
                      noBed={property?.numberOfBed}
                      noBath={property?.numberOfBath}
                      size={`${property?.size} ${property?.sizePostFix}`}
                      location={`${property?.subcity}, ${property?.city}, ${property?.country}`}
                    /> */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashBoardListingSection;