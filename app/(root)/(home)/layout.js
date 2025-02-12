import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"


const layout = ({children}) => {
  return (
    <html lang="en" >
      <body >
         <Navbar />
         {children}
         <Footer />
      </body>
    </html>
  )
}

export default layout
