import React from "react";

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-red-600 border-b-white border-l-white border-r-white animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 bg-white rounded-full"></div>
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full border border-gray-400"></div>
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  );
};