// components/UserComponent.js
import { ReactNode } from "react";

const OrderComponent = () => {
  
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {/* Left-hand side Buttons */}
      {/* <div className="flex items-center space-x-4 relative"> */}
        {/* Button 1 */}
        {/* <button className="flex items-center px-4 py-2 bg-white text-[#344054] rounded-xl border border-[#D0D5DD] shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Filters
        </button> */}

        {/* Dropdown */}
        
      {/* </div> */}

      {/* User Title */}
      <h1 className="text-2xl mx-4 font-bold">Cancelled orders</h1>

      {/* Right-hand side Search Box */}
      {/* <input
        type="search"
        placeholder="Search"
        className="px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none w-80 outline-none"
        // style={{ width: "200px" }}
      /> */}
    </div>
  );
};

export default OrderComponent;
