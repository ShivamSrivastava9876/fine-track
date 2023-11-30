import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { createCategoryAsync, getCategoriesAsync } from "@/redux/slice/category/categorySlice";

const AddCategory = ({ addCategory, setAddCategory }) => {
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);

  const handleAddCategory = (e) => {
    if (image) {
      e.preventDefault();
      dispatch(createCategoryAsync({ category_name: newCategory, image: image })).then((result) => {
        if (createCategoryAsync.fulfilled.match(result)) {
          dispatch(getCategoriesAsync());
          setNewCategory("");
          setImage(null);
        }
      })
    }
    else {
      e.preventDefault();
      setError(true);
    }

  };

  const hideError = () => {
    setError(false);
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
        style={{zIndex: 1000}}
      >
        <strong className="font-bold">Error!</strong>
        <span className="ml-2">Upload the image</span>
        <button
          onClick={hideError}
          className="relative top-0.5 bottom-0 left-1"
        >
          <span className="text-red-500 text-2xl">×</span>
        </button>
      </div>}
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
          onSubmit={handleAddCategory}
          className="p-8 shadow-md flex flex-col items-center justify-center rounded-2xl w-34.125 bg-white"
        >
          <div className="mb-4 space-y-1">
            <h2 className=" text-[#0a0a0a] text-center font-normal text-base text-16px w-161">
              Add category
            </h2>
          </div>
          <div className="mb-4 w-21.375 h-3.3125">
            <input
              type="text"
              className="w-21.375 h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category"
            />
          </div>
          <div className="mb-2 w-21.375 h-3.3125">
            <input
              type="file"
              className="w-full py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              // value={image}
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            className="w-21.375 h-3.3125 rounded-xl bg-[#DF8E51] text-white py-2 transition duration-300"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
