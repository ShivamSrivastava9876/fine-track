import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const AddCategory = ({ addCategory, setAddCategory }) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    //Handle logic here
  };

  const handleClose = () => {
    setAddCategory(!addCategory);
  };

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
        onSubmit={handleAddCategory}
        className="p-8 rounded shadow-md flex flex-col w-35rem h-28rem bg-white"
      >
        <div className="mb-4 space-y-1">
          <h2 className=" text-[#0a0a0a] text-center font-normal text-base text-16px w-161">
            Add category
          </h2>
        </div>
        <div className="mb-4 ">
          <input
            type="text"
            className="w-21.375 h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
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
  );
};

export default AddCategory;
