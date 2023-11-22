import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import { createProductTypeAsync, getProductTypeAsync } from "@/redux/slice/productType/productTypeSlice";

const AddCategory = ({ addProductType, setAddProductType }) => {
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [image, setImage] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);

  useEffect(() => {
    dispatch(getCategoriesAsync())
  }, [dispatch])

  const categoryList = useSelector(getCategoryList);

  const handleAddProductType = (e) => {
    e.preventDefault();
    console.log(image);
    dispatch(createProductTypeAsync({category: newCategory, product_type: productType, image: image})).then((result) => {
      if (createProductTypeAsync.fulfilled.match(result)) {
        dispatch(getProductTypeAsync());
        setNewCategory("");
        setProductType("");
        setImage(null);
      }
      
    });
  };

  const handleClose = () => {
    setAddProductType(!addProductType)
  }

  const handleCategory = () => {
    setOpenCategory(!openCategory);
    console.log(categoryList)
  };

  const handleOptionClick = (option) => {
    setNewCategory(option);
    setOpenCategory(!openCategory);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  }

  return (
    <div className="flex justify-center m-8 relative">
      <button
        className="absolute top-0 right-0 p-0.5 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
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
        className="p-8 rounded shadow-md flex flex-col w-35rem h-28rem bg-white"
      >
        <div className="mb-4 space-y-1">
          <h2 className=" text-[#0a0a0a] text-center font-normal text-base text-16px w-161">
            Add product type
          </h2>
        </div>
        <div onClick={handleCategory} class="relative inline-block cursor-pointer text-left mb-2 h-10">
          <div class="inline-flex items-center justify-center px-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
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
            <div class="origin-top-right absolute right-16 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              {categoryList.map((category) => (
                <div class="py-1">
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
        <div className="mb-2 h-10">
          <input
            type="text"
            className="w-full py-2 px-8 h-10 flex flex-row items-center justify-center border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            placeholder="Product type"
          />
        </div>
        <div className="mb-2 h-10">
          <input
            type="file" multiple
            className="w-full py-2 px-8 h-10 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
            // value={image}
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 rounded-xl bg-[#DF8E51] text-white py-2 transition duration-300"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
