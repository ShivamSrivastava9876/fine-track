// components/UserComponent.js
import { ReactNode, useState } from "react";
import Image from "next/image";
import SearchIcon from "../../public/assets/Icons/searchIcon.svg";
import { useDispatch } from "react-redux";
import { searchProductAsync } from "@/redux/slice/product/productSlice";
import Link from "next/link";

const ProductComponent = ({
  addProduct,
  setAddProduct,
}) => {

  const dispatch = useDispatch();
  const [searchParameter, setSearchParameter] = useState("");

  const handleAddProduct = () => {
    setAddProduct(!addProduct);
  };

  const handleProductSearch = (e) => {
    e.preventDefault();
    dispatch(searchProductAsync(searchParameter)).then((result) => {
      if (searchProductAsync.fulfilled.match(result)) {
        // dispatch(searchUserAsync(searchParameter))
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
      <h1 className="text-2xl mx-2 m-2 font-bold">Products</h1>

      <div className="flex flex-row flex-wrap">
        {/* Right-hand side Buttons */}
        <Link href="#addProduct" className="flex items-center relative">
          <div className="flex items-center space-x-4 mx-2 relative">

            {/* Button 2 */}
            <button
              className={`flex items-center px-4 py-2 bg-[#DB8A4D] text-white rounded-full shadow transition-transform duration-300 transform ${addProduct ? "invisible" : ""
                }`}
              onClick={handleAddProduct}
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
              Add product
            </button>
          </div>
        </Link>

        {/* Right-hand side Search Box */}
        <form onSubmit={(e) => handleProductSearch(e)} className="flex items-center md:w-80 m-2 border-2 border-solid border-gray-300 rounded-full px-4 py-2">
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
    </div>
  );
};

export default ProductComponent;
