import { getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddProduct = ({ addProduct, setAddProduct }) => {
  const dispatch = useDispatch();

  const [huId, setHuId] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [model, setModel] = useState("");
  const [subModel, setSubModel] = useState("");
  const [stoneWeight, setStoneWeight] = useState("");
  const [addImage, setAddImage] = useState("");
  const [grossWeight, setGrossWeight] = useState("");
  const [puritySpc, setPuritySpc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [openProductType, setOpenProductType] = useState(false);

  //Handling category dropdown
  useEffect(() => {
    dispatch(getCategoriesAsync())
  }, [dispatch])
  const categoryList = useSelector(getCategoryList);

  const handleClose = () => {
    setAddProduct(!addProduct);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    //write logic here
  };

  const handleCategory = () => {
    setOpenCategory(!openCategory);
  };

  const handleCategoryClick = (option) => {
    setCategory(option);
    setOpenCategory(!openCategory);
  };

  const handleProductType = () => {
    setOpenProductType(!openProductType)
  }

  const handleProductTypeClick = (option) => {
    setProductType(option);
    setOpenProductType(!openProductType);
  }

  return (
    <div
      id="addProduct"
      className="relative flex flex-col items-center rounded shadow-md w-full h-34.3125 bg-white mt-1.375"
    >
      <button
        className="absolute top-2 right-2 p-0.5 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
        onClick={handleClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
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
      </button>
      <div id="formTitle" className="w-52 h-4 m-4 text-center text-25">
        Product details
      </div>
      <div id="formFields" className="">
        <form
          onSubmit={handleProductSubmit}
          className="p-8 flex flex-col items-center w-35rem h-28rem bg-white"
        >
          <div id="textFields" className="grid grid-cols-2 gap-4">
            <div onClick={handleCategory} class="relative inline-block text-left mb-2">
              <button class="inline-flex items-center justify-center px-4 py-2 w-full h-3.3125 rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                {category || "Select category"}
                {/* Arrow icon (tailwindcss/heroicons) */}
                <svg
                  
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 ml-2 -mr-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {openCategory && (
                <div class="origin-top-right absolute right-16 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  
                  {categoryList.map((category) => (
                  <div class="py-1">
                    <div
                      href="#"
                      onClick={() => handleCategoryClick(category.category_name)}
                      class="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-indigo-100"
                    >
                      {category.category_name}
                    </div>
                  </div>))}
                </div>
              )}
            </div>
            <div class="relative inline-block text-left mb-2">
              <button class="inline-flex items-center justify-center px-4 py-2 w-full h-3.3125 rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                {productType || "Select product type"}
                {/* Arrow icon (tailwindcss/heroicons) */}
                <svg
                  onClick={handleProductType}
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 ml-2 -mr-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {openProductType && (
                <div class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div class="py-1">
                    <div
                      href="#"
                      onClick={() => handleProductTypeClick("Option 1")}
                      class="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-indigo-100"
                    >
                      Option 1
                    </div>
                    <div
                      href="#"
                      onClick={() => handleProductTypeClick("Option 2")}
                      class="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-indigo-100"
                    >
                      Option 2
                    </div>
                    <div
                      href="#"
                      onClick={() => handleProductTypeClick("Option 3")}
                      class="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-indigo-100"
                    >
                      Option 3
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={huId}
                onChange={(e) => setHuId(e.target.value)}
                placeholder="HU id"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Product id"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Model"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={subModel}
                onChange={(e) => setSubModel(e.target.value)}
                placeholder="Sub model"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product name"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={stoneWeight}
                onChange={(e) => setStoneWeight(e.target.value)}
                placeholder="Stone weight"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                //add image upload function
                value={addImage}
                onChange={(e) => setAddImage(e.target.value)}
                placeholder="Add image"
              />
            </div>

            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={grossWeight}
                onChange={(e) => setGrossWeight(e.target.value)}
                placeholder="Gross weight"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={puritySpc}
                onChange={(e) => setPuritySpc(e.target.value)}
                placeholder="Purity spc"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
              />
            </div>
          </div>

          <button
            type="submit"
            className="rounded-xl bg-[#DF8E51] h-3.3125 w-21.375 m-4 text-white py-2 transition duration-300"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
