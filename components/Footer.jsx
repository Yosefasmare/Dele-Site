import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 pl-5 bottom-0 left-0">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
    {/* About Section */}
    <div>
      <h4 className="text-xl font-bold mb-3">About Us</h4>
      <p>
        We are a trusted platform for renting and selling homes across Ethiopia. Whether you're looking for your dream house or want to list your property, we are here to help.
      </p>
    </div>
    
    {/* Quick Links */}
    <div>
      <h4 className="text-xl font-bold mb-3">Quick Links</h4>
      <ul className="space-y-2">
        <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
        <li><Link href="/properties" className="hover:text-yellow-400">Browse Properties</Link></li>
        <li><Link href="/about" className="hover:text-yellow-400">About</Link></li>
      </ul>
    </div>
    
    {/* Contact Information */}
    <div>
      <h4 className="text-xl font-bold mb-3">Contact Us</h4>
      <p>Phone: +251 703 101 698</p>
      <p>Email:  yosidev8@gmail.com</p>
      <p>Address: Addis Ababa, Ethiopia</p>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="mt-10 text-center border-t border-gray-700 pt-5">
    <p>&copy; {new Date().getFullYear()} Your Dele-Site. All Rights Reserved.</p>
  </div>
</footer>

  )
}

export default Footer
