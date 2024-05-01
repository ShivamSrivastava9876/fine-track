// components/UserComponent.js
import { ReactNode, useState } from "react";
import Image from "next/image";
import SearchIcon from "../../public/assets/Icons/searchIcon.svg";
import { useDispatch } from "react-redux";
import { searchManufacturingOrderAsync } from "../redux/slice/manufacturing/manufacturingSlice";
import Link from "next/link";

const ProductComponent = ({
  addProduct,
  setAddProduct,
}) => {

  const dispatch = useDispatch();
  const [searchParameter, setSearchParameter] = useState("");

  const handleAddManufacturingOrder = () => {
    setAddProduct(!addProduct);
  };

  const handleManufacturingOrderSearch = (e) => {
    e.preventDefault();
    dispatch(searchManufacturingOrderAsync(searchParameter)).then((result) => {
      if (searchManufacturingOrderAsync.fulfilled.match(result)) {
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
      <h1 className="text-2xl mx-2 m-2 font-bold">उत्पादन ऑर्डर्स</h1>

      <div className="flex flex-row flex-wrap">

        {/* Right-hand side Search Box */}
        <form onSubmit={(e) => handleManufacturingOrderSearch(e)} className="flex items-center w-80 m-2 border-2 border-solid border-gray-300 rounded-full px-4 py-2">
          <input
            type="search"
            placeholder="शोधा"
            value={searchParameter}
            onChange={(e) => handleSearchParameter(e.target.value)}
            className="w-full h-full outline-none bg-transparent text-blue-gray-700"
          />
          <div className="ml-2">
            <Image
              onClick={handleManufacturingOrderSearch}
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
