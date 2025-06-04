import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
    </div>
  );
}

export default Loading