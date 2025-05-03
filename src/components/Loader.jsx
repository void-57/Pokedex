import React from "react";

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div
        className="relative w-24 h-24 animate-spin"
        style={{ animationDuration: "1.5s" }} 
      >
        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-black">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
          <div className="absolute top-1/2 left-0 w-full h-1 bg-black transform -translate-y-1/2"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white border-4 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-2.5 h-2.5 bg-gray-300 rounded-full m-auto mt-[3px]"></div>
        </div>
      </div>
      <p className="mt-6 text-gray-700 font-semibold text-lg">Loading...</p>
    </div>
  );
};
