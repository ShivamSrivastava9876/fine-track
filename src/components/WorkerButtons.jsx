// components/UserComponent.js
import { ReactNode, useState } from "react";
import Image from "next/image";
import SearchIcon from "../../public/assets/Icons/searchIcon.svg";
import { useDispatch } from "react-redux";
import { searchWorkerAsync } from "@/redux/slice/worker/workerSlice";
import Link from "next/link";

const CategoryComponent = ({
  addWorker,
  setAddWorker,
}) => {

  const dispatch = useDispatch();
  const [searchParameter, setSearchParameter] = useState("");

  const handleAddCategory = () => {
    setAddWorker(!addWorker);
  };

  const handleWorkerSearch = (e) => {
    e.preventDefault();
    dispatch(searchWorkerAsync(searchParameter)).then((result) => {
      if (searchWorkerAsync.fulfilled.match(result)) {
        // setSearchParameter("");
      }
    })
  }

  const handleSearchParameter = (searchParameter) => {
    setSearchParameter(searchParameter);
  }

  return (
    <div className="flex items-center justify-between flex-wrap w-full mb-8">

      {/* User Title */}
      <h1 className="text-2xl mx-2 m-2 font-bold">कामगार</h1>

      <div className="flex flex-row flex-wrap">
        {/* Right-hand side Buttons */}
        <div className="flex items-center mx-2 space-x-4 relative">

          {/* Button */}
          <Link href="#addWorker">
            <button
              className={`flex items-center rounded-full px-4 py-2 bg-[#DB8A4D] text-white shadow transition-transform duration-300 transform ${addWorker ? "invisible" : ""
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
              नवीन कामगार
            </button>
          </Link>
        </div>

        {/* Right-hand side Search Box */}
        <form onSubmit={(e) => handleWorkerSearch(e)} className="flex items-center m-2 md:w-80 border-2 border-solid border-gray-300 rounded-full px-4 py-2">
          <input
            type="search"
            placeholder="शोधा"
            value={searchParameter}
            onChange={(e) => handleSearchParameter(e.target.value)}
            className="w-full h-full outline-none bg-transparent text-blue-gray-700"
          />
          <div className="ml-2">
            <Image
              onClick={handleWorkerSearch}
              src={SearchIcon}
              alt="search-icon"
              className="cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryComponent;
