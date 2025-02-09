import AddPropertyForm from "@/components/AddPropertyForm"

const page = async ({params}) => {

    const id = (await params).id

  return (
    <div className=" flex flex-col p-3 justify-start items-center bg-gray-400 gap-2">
        <h1 className=" capitalize font-extrabold text-3xl text-gray-900 p-3 underline">add new property</h1>
        <AddPropertyForm id={id} />
    </div>
  )
}

export default page
