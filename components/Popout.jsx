import React from 'react'

const Popout = () => {
  return (
    <div className='w-full h-full -mt-20 fixed z-30 bg-black/60 flex justify-center items-center '>
        <div className="   bg-white shadow-lg rounded-lg p-4 w-64">
          <h3 className="text-lg font-semibold"></h3>
          <p className="text-gray-600">This is the content of the popout component.</p>
          <button
            onClick={togglePopout}
            className="mt-4 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
       </div>
  )
}

export default Popout
