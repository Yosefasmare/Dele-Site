import InboxSection from "@/components/InboxSection"

const page = () => {
  return (
    <div className="w-full flex flex-col p-3 gap-5">
       <h1 className="font-bold capitalize text-2xl">customers inbox messages</h1>
       <InboxSection />
    </div>
  )
}

export default page
