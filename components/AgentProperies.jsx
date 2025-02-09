import React from 'react'
import No_property from './No_property'
import Property from './Property'

const AgentProperies = ({title,agentProperties}) => {
  return (
    <div className='flex flex-col  overflow-x-hidden'>
      <h1 className=' capitalize font-bold text-2xl'>{title}</h1>
      <div className=' w-full max-h-[850px] overflow-y-scroll flex flex-wrap justify-center items-center border-4 rounded-2xl border-gray-900'>
      {agentProperties == [] || agentProperties == undefined || agentProperties == null  ?(
             <No_property />  ) :
          ( <div className='lg:p-5 p-2 gap-3 grid grid-cols-1 lg:grid-cols-2  '>
                 {agentProperties.map(property=>(
                        <Property  key={property.$id} id={property.$id} title={property.title}  price={property?.price} currency={property?.currency}  PropertyImg={property?.imageUrls?.[0]}  catagory={property?.catagory} status={property?.status} noBed={property?.numberOfBed} noBath={property?.numberOfBath} size={`${property?.size} ${property?.sizePostFix}`} location={`${property?.subcity},${property?.city},${property?.country}`}/>
          ))}
 </div>
 )
} 
      </div>
    </div>
  )
}

export default AgentProperies
