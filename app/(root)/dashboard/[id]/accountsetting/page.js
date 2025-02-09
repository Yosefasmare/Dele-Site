import AgentProfileInfo from "@/components/AgentProfileInfo"

const page = async ({params}) => {
  const id = (await params).id

  return (
    <div className="flex flex-col p-4">
        <AgentProfileInfo id={id} />
    </div>
  )
}

export default page
