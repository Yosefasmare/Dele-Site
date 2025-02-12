import Image from "next/image";
import Banner from '../../../public/banner.jpg';
import Logo from '../../../public/logo.jpg';
import ListingSection from "@/components/ListingSection";
import BuyHome from '../../../public/buy-agent.webp';
import SellHome from '../../../public/spot-sell.webp';
import RentHome from '../../../public/spot-rent.webp';
import ServiceSection from "@/components/ServiceSection";
import About from "@/components/About";
import SearchFilterHome from "@/components/SearchFilterHome";
import Link from "next/link";
import fetchPropertyPosts from "@/lib/requests";

export default async function Home({ searchParams }) {
  // Refactored to synchronous function
   const propertyPosts = await fetchPropertyPosts(searchParams)

  return (
    <>
      <section className="w-full h-[68vh]  flex  relative justify-center items-center">
        <div className="absolute -z-10 w-full h-full overflow-hidden">
          <Image loading="eager" priority src={Banner} alt="Banner" className="w-full h-full object-cover" />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center gap-5 pt-9 text-center">
          <h1 className="text-4xl lg:text-6xl text-center text-white font-extrabold">Find Your Dream Home in Ethiopia</h1>
          <span className="text-white text-xl lg:text-2xl font-light capitalize">Discover beautiful properties in prime locations across Ethiopia</span>
        <Link href={'/properties'}>
          <button className="px-8 py-2 rounded-md text-black bg-white capitalize font-bold hover:border-2 transition-all ease-in-out hover:bg-black hover:border-white hover:text-white">browse properties</button>
        </Link>
        </div>
       <SearchFilterHome  />
      </section>

      <ListingSection propertyPosts={propertyPosts} headerName={'Latest Listings'} />

      <section className="w-full h-auto p-5 gap-3 lg:h-[80vh] bg-[#ECECEC] flex flex-col lg:flex-row justify-around items-center ">
        <ServiceSection path={'/properties/?status=sale'} icon={BuyHome} header={'buy a home'} desc={'Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.'} link={'browse homes'} />
        <ServiceSection path={'/dashboard'} icon={SellHome} header={'sell a home'} desc={'No matter what path you take to sell your home, we can help you navigate a successful sale.'} link={'explore your options'} />
        <ServiceSection path={'/properties/?status=rent'} icon={RentHome} header={'rent a home'} desc={'We’re creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.'} link={'rental services'} />
      </section>

      <About />
    </>
  );
}
