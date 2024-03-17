import React from "react";

export const CardItemAdmin = ({ total, title, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-80 mt-5 ">
      <div className="flex items-center">
        <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-purple-800 to-violet rounded-lg shadow-md shadow-gray-300">
          <span> {icon}</span>
        </div>
        <div className="flex-shrink-0 ml-3">
          <span className="text-2xl font-bold leading-none text-gray-900">
            {total}
          </span>
          <h3 className="text-base font-normal text-gray-500">{title}</h3>
        </div>
        <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500">
          
        </div>
      </div>
    </div>
  );
};
