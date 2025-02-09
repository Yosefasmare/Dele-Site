import React from 'react'
import './expandingball.css'

const ExpandingBall = ({status}) => {
  return (
    <div className={ `ball  ${status === 'sale' ? 'bg-green-600 before:bg-green-600' : 'bg-red-600 before:bg-red-600'} `}></div>
  )
}

export default ExpandingBall
