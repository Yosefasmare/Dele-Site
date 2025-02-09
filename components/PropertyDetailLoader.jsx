'use client'

import React from 'react'
import { HashLoader } from 'react-spinners'

const PropertyDetailLoader = () => {
  return (
    <HashLoader
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    aria-label="ball-triangle-loading"
    wrapperstyle={{}}
    wrapperclass=""
    />
  )
}

export default PropertyDetailLoader
