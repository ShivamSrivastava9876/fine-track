// components/UserComponent.js
import { ReactNode, useState } from "react";
import Image from "next/image";
import SearchIcon from "../../public/assets/Icons/searchIcon.svg";
import { useDispatch } from "react-redux";
import { searchCategoryAsync } from "@/redux/slice/category/categorySlice";

const CategoryComponent = ({
  addCategory,
  setAddCategory,
}) => {

  const dispatch = useDispatch();
  const [searchParameter, setSearchParameter] = useState("");

  const handleAddCategory = () => {
    setAddCategory(!addCategory);
  };

  const handleCategorySearch = (e) => {
    e.preventDefault();
    console.log("search is working", searchParameter)
    dispatch(searchCategoryAsync(searchParameter)).then((result) => {
      if (searchCategoryAsync.fulfilled.match(result)) {
        // setSearchParameter("");
      }
    })
  }

  const handleSearchParameter = (searchParameter) => {
    setSearchParameter(searchParameter);
  }

  return (
    <div className="flex items-center justify-between flex-wrap w-full mb-8">
      {/* Left-hand side Buttons */}
      <div className="flex items-center space-x-4 relative">
        {/* Button 1 */}
        <button className="flex items-center px-4 py-2 bg-white text-[#344054] rounded-xl border border-[#D0D5DD] shadow">
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
        </button>

        {/* Button 2 */}
        <button
          className={`flex items-center px-4 py-2 bg-[#DB8A4D] text-white rounded-xl shadow transition-transform duration-300 transform ${
            addCategory ? "invisible" : ""
          }`}
          onClick={handleAddCategory}
        >
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add category
        </button>
      </div>

      {/* User Title */}
      <h1 className="text-2xl mx-2 font-bold">Categories</h1>

      {/* Right-hand side Search Box */}
      <form onSubmit={(e) => handleCategorySearch(e)} className="flex items-center w-96 border-2 border-solid border-gray-300 rounded-full px-4 py-2">
        <input
          type="search"
          placeholder="Search"
          value={searchParameter}
          onChange={(e) => handleSearchParameter(e.target.value)}
          className="w-full h-full outline-none bg-transparent text-blue-gray-700"
        />
        <div className="ml-2">
          <Image
            onClick={handleCategorySearch}
            src={SearchIcon}
            alt="search-icon"
            className="cursor-pointer"
          />
        </div>
        {/* <input type="submit"></input> */}
      </form>
    </div>
  );
};

export default CategoryComponent;
