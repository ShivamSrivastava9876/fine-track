import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import { createProductTypeAsync, getProductTypeAsync } from "@/redux/slice/productType/productTypeSlice";
import { FiImage } from 'react-icons/fi';

const AddCategory = ({ addProductType, setAddProductType }) => {
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [image, setImage] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [noCategory, setNoCategory] = useState(false);
  const [noProductType, setNoProductType] = useState(false);

  useEffect(() => {
    dispatch(getCategoriesAsync())
  }, [dispatch])

  const categoryList = useSelector(getCategoryList);

  const handleAddProductType = (e) => {
    if (image && newCategory !== "" && productType !== "") {
      e.preventDefault();
      dispatch(createProductTypeAsync({ category: newCategory, product_type: productType, image: image })).then((result) => {
        if (createProductTypeAsync.fulfilled.match(result)) {
          dispatch(getProductTypeAsync());
          setNewCategory("");
          setProductType("");
          setImage(null);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000)
        }
      });
    }
    
    else {
      e.preventDefault();
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000)
    }

  };

  const handleClose = () => {
    setAddProductType(!addProductType)
  }

  const handleCategory = () => {
    setOpenCategory(!openCategory);
  };

  const handleOptionClick = (option) => {
    setNewCategory(option);
    setOpenCategory(!openCategory);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  }

  const hideError = () => {
    setError(false);
  }

  const hideSuccess = () => {
    setSuccess(false);
  }

  return (
    <>
      {error && <div
        // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
        className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
        role="alert"
        style={{ zIndex: 1000 }}
      >
        <strong className="font-bold">Error! Please fill all required fields</strong>
        <button
          onClick={hideError}
          className="relative top-0.5 bottom-0 left-1"
        >
          <span className="text-red-500 text-2xl">×</span>
        </button>
      </div>}
      {success && <div
        // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
        className="bg-green-100 flex justify-between items-center border border-green-400 text-green-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
        role="success"
        style={{ zIndex: 1001 }}
      >
        <strong className="font-bold">Product type added successfully</strong>
        <button
          onClick={hideSuccess}
          className="relative top-0.5 bottom-0 left-1"
        >
          <span className="text-green-500 text-2xl">×</span>
        </button>
      </div>}
      <div id="addProductType" className="flex justify-center m-8 relative">
        <button
          className="absolute top-2 right-2 md:right-4 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
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
        <form
          onSubmit={handleAddProductType}
          className="p-8 shadow-md flex flex-col justify-center items-center rounded-2xl md:w-34.125 bg-white"
        >
          <div className="mb-4">
            <h2 className=" text-[#0a0a0a] text-center text-base font-bold text-16px h-4 m-4 w-10.0625">
              Add product type
            </h2>
          </div>
          <div className="grid md:grid-cols-1 gap-1">
            <div onClick={handleCategory} class={`relative inline-block cursor-pointer text-left mb-4 ${newCategory === '' && error ? 'border-2 border-red-500' : ''}`}>
              <div class="inline-flex items-center justify-center px-4 py-2 w-full h-3.3125 rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                {newCategory || "Select category"}
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
                        onClick={() => handleOptionClick(category.category_name)}
                        class="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-indigo-100"
                      >
                        {category.category_name}
                      </div>
                    </div>))}
                </div>)}
            </div>
            <div className={`mb-4 md:w-21.375 ${productType === '' && error ? 'border-2 border-red-500' : ''}`}>
              <input
                type="text"
                className="w-full py-2 px-8 h-3.3125 flex flex-row items-center justify-center border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                placeholder="Product type"
              />
            </div>
            <div className={`mb-4 flex justify-center items-center ${image === null && error ? 'border-2 border-red-500' : ''}`}>
              <label htmlFor="fileInput" className="w-full flex items-center h-3.3125 py-2 px-8 border rounded-xl font-semibold outline-none border-[#9C9C9C] text-[#595858] cursor-pointer">
                <FiImage className="mr-2" /> {image !== null ? 'Image uploaded' : 'Upload image'}
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
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
    </>
  );
};

export default AddCategory;
