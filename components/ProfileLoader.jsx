'use client'

import React from 'react'

const ProfileLoader = ({ width, height }) => {
    return (
      <div
        className={`${width || "w-full"} ${height || "h-full"} rounded-full bg-gray-200 animate-pulse border border-e-gray-900`}
      ></div>
    );
  };

export default ProfileLoader
