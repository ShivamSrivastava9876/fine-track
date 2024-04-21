import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import { getProductTypeAsync, getProductTypeList, getSelectedProductTypeAsync } from "@/redux/slice/productType/productTypeSlice";
import { FiImage } from 'react-icons/fi';
import AddIcon from "../../public/assets/Icons/add.svg";
import Image from "next/image";

const ViewPhotosOfProduct = ({ rows, selectedProductImages, openImage, setOpenImage, isOpen }) => {
    const dispatch = useDispatch();

    const modalClasses = isOpen ? 'block' : 'hidden';

    const handleCancel = () => {
        setOpenImage(false);

    }

    return (
        <div>
            <div className={`fixed inset-0 z-40 bg-black opacity-10 backdrop-blur-md transition-opacity ${modalClasses}`}></div>
            <div className="flex justify-center items-center fixed bottom-2 top-2 right-5 left-5 z-50">

                <div className="p-8 rounded shadow-md relative flex flex-col justify-start overflow-y-scroll scroll-smooth no-scrollbar h-full w-auto bg-white border border-blue-500">
                    <button onClick={handleCancel} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="mb-4">
                        <h2 className=" flex items-center m-2 text-2xl font-bold">
                            Images of selected product
                        </h2>
                    </div>
                    <div className="overflow-y-auto flex flex-wrap h-full justify-center">
                        {selectedProductImages.map((image, index) => (
                            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                                <img src={image.images} className="w-full h-auto rounded-lg border border-gray-300" alt={`Product Image ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>

            </div >
        </div >
    );
};

export default ViewPhotosOfProduct;
