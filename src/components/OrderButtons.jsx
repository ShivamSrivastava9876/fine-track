// components/UserComponent.js
import { ReactNode, useState } from "react";
import Image from "next/image";
import SearchIcon from "../../public/assets/Icons/searchIcon.svg";
import { useDispatch } from "react-redux";
import { searchOrderAsync } from "@/redux/slice/order/orderSlice";

const OrderComponent = () => {

  const dispatch = useDispatch();
  const [searchParameter, setSearchParameter] = useState("");

  const handleProductSearch = (e) => {
    e.preventDefault();
    console.log("order search is working", searchParameter)
    dispatch(searchOrderAsync(searchParameter)).then((result) => {
      if (searchOrderAsync.fulfilled.match(result)) {
        // dispatch(searchUserAsync(searchParameter))
        // setSearchParameter("");
      }
    })
  }

  const handleSearchParameter = (searchParameter) => {
    setSearchParameter(searchParameter);
  }
  
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
      <h1 className="text-2xl mx-4 font-bold">Orders</h1>

      {/* Right-hand side Search Box */}
      <form onSubmit={(e) => handleProductSearch(e)} className="flex items-center w-96 border-2 border-solid border-gray-300 rounded-full px-4 py-2">
        <input
          type="search"
          placeholder="Search"
          value={searchParameter}
          onChange={(e) => handleSearchParameter(e.target.value)}
          className="w-full h-full outline-none bg-transparent text-blue-gray-700"
        />
        <div className="ml-2">
          <Image
            onClick={handleProductSearch}
            src={SearchIcon}
            alt="search-icon"
            className="cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default OrderComponent;
