import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { createCategoryAsync, getCategoriesAsync } from "@/redux/slice/category/categorySlice";
import { FiImage } from 'react-icons/fi';

const AddCategory = ({ addCategory, setAddCategory }) => {
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [noCategory, setNoCategory] = useState(false);

  const handleAddCategory = (e) => {
    if (image && newCategory !== "") {
      e.preventDefault();
      dispatch(createCategoryAsync({ category_name: newCategory, image: image })).then((result) => {
        if (createCategoryAsync.fulfilled.match(result)) {
          dispatch(getCategoriesAsync());
          setNewCategory("");
          setImage(null);
          setNoCategory(false);
          setError(false);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000)
        }
      })
    }
    else {
      e.preventDefault();
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000)
    }
  };

  const hideError = () => {
    setError(false);
  }

  const hideNoCategory = () => {
    setNoCategory(false);
  }

  const hideSuccess = () => {
    setSuccess(false);
  }

  const handleClose = () => {
    setAddCategory(!addCategory);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
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
        <strong className="font-bold">Category added successfully</strong>
        <button
          onClick={hideSuccess}
          className="relative top-0.5 bottom-0 left-1"
        >
          <span className="text-green-500 text-2xl">×</span>
        </button>
      </div>}
      <div id="addCategory" className="flex justify-center m-8 relative">
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
          onSubmit={handleAddCategory}
          className="p-8 shadow-md flex flex-col items-center justify-center rounded-2xl md:w-34.125 bg-white"
        >
          <div className="mb-4">
            <h2 className=" text-[#0a0a0a] text-center font-bold text-base text-16px m-3 w-161">
              Add category
            </h2>
          </div>

          <div className="grid md:grid-cols-1 gap-1">
            <div className={`mb-4 md:w-21.375 ${newCategory === '' && error ? 'border-2 border-red-500' : ''}`}>
              <input
                type="text"
                className="w-full py-2 px-8 text-xs md:text-base font-semibold h-3.3125 flex flex-row items-center justify-center border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
              />
            </div>
            <div className={`mb-4 flex justify-center items-center ${image === null && error ? 'border-2 border-red-500' : ''}`}>
              <label htmlFor="fileInput" className="w-full flex items-center text-xs md:text-base h-3.3125 py-2 px-8 border rounded-xl font-semibold outline-none border-[#9C9C9C] text-[#595858] cursor-pointer">
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
