import FilterdSearch from "@/components/FilterdSearch"
import ListingSection from "@/components/ListingSection"
import { databases } from "@/lib/appwrite";
import fetchPropertyPosts from "@/lib/requests";
import { Query } from "appwrite";


const page = async ({searchParams}) => {

  const propertyPosts = await fetchPropertyPosts(searchParams)

  return (
    <div className="flex flex-col pt-10">
         <FilterdSearch />
         <main className="w-full h-[70px]"/>
        <ListingSection propertyPosts={propertyPosts} headerName={'Listings'} />
    </div>
  )
}

export default page

