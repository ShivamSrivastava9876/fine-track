import { getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import { createProductAsync, getProductAsync } from "@/redux/slice/product/productSlice";
import { getProductTypeAsync, getProductTypeList, getSelectedProductTypeAsync } from "@/redux/slice/productType/productTypeSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiImage } from 'react-icons/fi';

const AddProduct = ({ addProduct, setAddProduct }) => {
  const dispatch = useDispatch();

  const [huId, setHuId] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [model, setModel] = useState("");
  const [subModel, setSubModel] = useState("");
  const [stoneWeight, setStoneWeight] = useState("");
  const [image, setImage] = useState("");
  const [grossWeight, setGrossWeight] = useState("");
  const [puritySpc, setPuritySpc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [openProductType, setOpenProductType] = useState(false);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");

  const [error, setError] = useState(false);

  //Handling image file
  const handleFileChange = (e) => {
    
    const selectedFile = e.target.files;
    const filesLength = selectedFile.length;
    console.log("selectedFiles",selectedFile);
    
    setFiles(filesLength)
    setImage(selectedFile);
    console.log("file length", files);
  }

  //Handling category dropdown
  // useEffect(() => {
  //   dispatch(getCategoriesAsync()).then((result) => {
  //     if (getCategoriesAsync.fulfilled.match(result)) {
  //       dispatch(getProductTypeAsync())
  //     }
  //   })
  // }, [dispatch])

  useEffect(() => {
    dispatch(getCategoriesAsync()).then((result) => {
      if (getCategoriesAsync.fulfilled.match(result) && category !== "") {
        dispatch(getSelectedProductTypeAsync(category))
      }
    })
  }, [dispatch, category])
  const categoryList = useSelector(getCategoryList);
  const productTypeList = useSelector(getProductTypeList);

  const handleClose = () => {
    setAddProduct(!addProduct);
  };

  const handleProductSubmit = (e) => {
    if (image) {
      e.preventDefault();
      //logic for add product
      dispatch(createProductAsync({ category: category, product_type: productType, product_id: productId, product_name: productName, hu_id: huId, model, sub_model: subModel, gross_wt: grossWeight, stone_wt: stoneWeight, purity_spec: puritySpc, price, image, quantity, description, is_available: true })).then((result) => {
        if (createProductAsync.fulfilled.match(result)) {
          dispatch(getProductAsync());
          setHuId("");
          setProductId("");
          setProductName("");
          setModel("");
          setSubModel("");
          setStoneWeight("");
          setImage("");
          setGrossWeight("");
          setPuritySpc("");
          setPrice("");
          setQuantity("");
          setCategory("");
          setProductType("");
          setDescription("");
        }
      })
    }
    else {
      e.preventDefault();
      setError(true)
    }

  }

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

  const hideError = () => {
    setError(false);
  }

  return (
    <>
      {error && <div
        // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
        className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
        role="alert"
        style={{ zIndex: 1000 }}
      >
        <strong className="font-bold">Error! Upload the image</strong>
        <button
          onClick={hideError}
          className="relative top-0.5 bottom-0 left-1"
        >
          <span className="text-red-500 text-2xl">×</span>
        </button>
      </div>}
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
            <div id="textFields" className="grid md:grid-cols-2 gap-4">
              <div onClick={handleCategory} class="relative inline-block cursor-pointer text-left mb-2">
                <div class="inline-flex items-center justify-center px-4 py-2 w-full h-3.3125 rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
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
                </div>

                {openCategory && (
                  <div class="origin-top-right absolute z-20 right-16 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">

                    {categoryList.map((category) => (
                      <div key={category.id} class="py-1">
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
              <div onClick={handleProductType} class="relative inline-block cursor-pointer text-left mb-2">
                <div class="inline-flex items-center justify-center px-4 py-2 w-full h-3.3125 rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                  {productType || "Select product type"}
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
                </div>

                {openProductType && (
                  <div class="origin-top-right absolute z-10 right-16 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">

                    {productTypeList.map((productType) => (
                      <div key={productType.id} class="py-1">
                        <div
                          href="#"
                          onClick={() => handleProductTypeClick(productType.product_type)}
                          class="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-indigo-100"
                        >
                          {productType.product_type}
                        </div>
                      </div>))}
                  </div>
                )}
              </div>
              <div className="mb-4 md:w-21.375">
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={huId}
                  onChange={(e) => setHuId(e.target.value)}
                  placeholder="HU id"
                />
              </div>
              <div className="mb-4 md:w-21.375">
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="Product id"
                />
              </div>
              <div className="mb-4 md:w-21.375">
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Model"
                />
              </div>
              <div className="mb-4 md:w-21.375">
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={subModel}
                  onChange={(e) => setSubModel(e.target.value)}
                  placeholder="Sub model"
                />
              </div>
              <div className="mb-4 md:w-21.375">
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Product name"
                />
              </div>
              <div className="mb-4 md:w-21.375">
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={stoneWeight}
                  onChange={(e) => setStoneWeight(e.target.value)}
                  placeholder="Stone weight"
                />
              </div>
              {/* <div className="mb-4 md:w-21.375">
                <input
                  type="file" multiple
                  className="w-full py-2 px-8 h-10 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  // value={image}
                  onChange={handleFileChange}
                  placeholder="Image"
                />
              </div> */}
              <div className="mb-4 flex justify-center items-center">
                <label htmlFor="fileInput" className="w-full flex items-center h-3.3125 py-2 px-8 border rounded-xl font-semibold outline-none border-[#9C9C9C] text-[#595858] cursor-pointer">
                <FiImage className="mr-2" /> {files !== '' ? `${files} images` : 'Upload images'}
                  <input
                    type="file"
                    id="fileInput"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <div className="mb-4 md:w-21.375">
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={grossWeight}
                  onChange={(e) => setGrossWeight(e.target.value)}
                  placeholder="Gross weight"
                />
              </div>
              <div className="mb-4 md:w-21.375">
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={puritySpc}
                  onChange={(e) => setPuritySpc(e.target.value)}
                  placeholder="Purity spc"
                />
              </div>
              <div className="mb-4 md:w-21.375">
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                />
              </div>
              <div className="mb-4 md:w-21.375">
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                />
              </div>
              <div className="mb-4 md:w-21.375">
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#DF8E51] h-3.3125 w-10.0625 md:w-21.375 m-4 text-white py-2 transition duration-300"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
