import PropertyLoader from "@/components/PropertyLoader"

export default function Loading () {

  const ids = [{id:'1'},{id:'2'},{id:'3'}]

  return (
    <div className=" w-full mt-10 p-2 flex justify-around items-center  pt-28   ">
      {ids.map((id)=>(
       <PropertyLoader key={id.id} />
      ))}
    </div>
  )
}


