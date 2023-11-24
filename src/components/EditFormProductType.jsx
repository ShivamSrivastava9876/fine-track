import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";

const EditFormProductType = ({ row, openCategory, handleCategory, handleOptionClick, handleUpdateProductType, isOpen, handleCancel, category, productType, setProductType, setImage }) => {
    const dispatch = useDispatch();

    const modalClasses = isOpen ? 'block' : 'hidden';

    useEffect(() => {
        dispatch(getCategoriesAsync())
    }, [dispatch])

    const categoryList = useSelector(getCategoryList);

    //To save new image
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
    }

    return (
        <div>
            <div className={`fixed inset-0 z-40 bg-black opacity-10 backdrop-blur-md transition-opacity ${modalClasses}`}></div>
            <div className="flex justify-center items-center min-h-screen fixed inset-10 z-50">

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateProductType(e, row.productType, row.category);
                    }}
                    className="p-8 rounded shadow-md flex flex-col justify-center w-35rem h-28rem bg-white border border-blue-500"
                >
                    <div className="mb-4 space-y-1">
                        <h2 className=" flex items-center m-4 text-2xl font-bold">
                            Edit product type
                        </h2>
                    </div>
                    <div class="relative cursor-pointer inline-block text-left mb-2 h-10">
                        <div onClick={handleCategory} class="inline-flex items-center justify-center px-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
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
                            defaultValue={row.productType}
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            placeholder={row.productType}
                        />
                    </div>
                    <div className="mb-2 h-10">
                        <input
                            type="file"
                            className="w-full py-2 px-8 h-10 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                            // value={image}
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="flex flex-row space-x-2 m-2">
                        <button
                            type="submit"
                            className="w-full mt-2 rounded-xl bg-[#DF8E51] text-white py-2 transition duration-300"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleCancel}
                            className="w-full mt-2 rounded-xl bg-[#DF8E51] text-white py-2 transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default EditFormProductType;
