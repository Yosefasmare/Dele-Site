import AgentDiscription from "@/components/AgentDiscription"
import { databases } from "@/lib/appwrite"

const page = async ({params}) => {

    const id = (await params).id

    const agent =  await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
      process.env.NEXT_PUBLIC_APPWRITE_AGENT_COLLECTION_ID,
      id
    )


  return (
    <div className=" flex flex-col p-9 justify-start items-center">
        <main className="w-full h-[50px]" />
        <AgentDiscription agent={agent} />
    </div>
  )
}

export default page
