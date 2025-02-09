import React from 'react'
import Property from './Property'
import No_property from './No_property'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'

const ListingSection = ({propertyPosts,headerName}) => {

  return (
    <section className="w-full mt-10 p-2 flex flex-col">
         <h1 className='text-4xl font-serif font-bold p-5'>{headerName}</h1>

         <ErrorBoundary errorComponent={<No_property />}>

{propertyPosts == [] || propertyPosts.length === 0 || propertyPosts == undefined || propertyPosts == null  ?(
   <No_property />  ) :
 ( <div className='p-5 gap-3 grid grid-cols-1 lg:grid-cols-3 place-items-center '>
  {propertyPosts.map(property=>(
     <Property key={property.$id} id={property.$id} title={property.title}  price={property?.price} pricePostFix={property?.pricePostFix || null} currency={property?.currency}  PropertyImg={property?.imageUrls?.[0]}  catagory={property?.catagory} status={property?.status} noBed={property?.numberOfBed} noBath={property?.numberOfBath} size={`${property?.size} ${property?.sizePostFix}`} location={`${property?.subcity},${property?.city},${property?.country}`}/>
  ))}
 </div>
 )
}       
         </ErrorBoundary>

      </section>
  )
}

export default ListingSection
