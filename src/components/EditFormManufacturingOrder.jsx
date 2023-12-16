import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import { getProductTypeAsync, getProductTypeList, getSelectedProductTypeAsync } from "@/redux/slice/productType/productTypeSlice";
import { FiImage } from 'react-icons/fi';
import { getManufacturingProductList, getManufacturingUserList, getManugfacturingProductListAsync, getManugfacturingUserListAsync } from "../redux/slice/manufacturing/manufacturingSlice";

const EditFormManufacturingOrder = ({ handleProductClick, handleUserClick, handleUpdateManufacturingOrder, openProductType, handleProductType, openCategory, handleUser, row, weight, setWeight, endDate, setEndDate, startDate, setStartDate, workerContact, setWorkerContact, workerName, setWorkerName, product, setProduct, customer, setCustomer, description, setDescription, isOpen, handleCancel }) => {
    const dispatch = useDispatch();

    const modalClasses = isOpen ? 'block' : 'hidden';

    useEffect(() => {
        dispatch(getManugfacturingProductListAsync());
        dispatch(getManugfacturingUserListAsync());
    }, [dispatch]);

    const userList = useSelector(getManufacturingUserList);
    const productList = useSelector(getManufacturingProductList);

    //To save new image
    const handleFileChange = (e) => {
        const selectedFile = e.target.files;
        const filesLength = selectedFile.length;

        setFiles(filesLength)
        setImage(selectedFile);
    }

    return (
        <div>
            <div className={`fixed inset-0 z-40 bg-black opacity-10 backdrop-blur-md transition-opacity ${modalClasses}`}></div>
            <div className="flex justify-center items-center min-h-screen fixed inset-10 z-50">

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateManufacturingOrder(e, row.id, row.customer, row.product, row.workerName, row.workerContact, row.startDate, row.endDate, row.weight, row.description);
                    }}
                    className="p-8 rounded shadow-md flex flex-col justify-center w-auto h-28rem bg-white border border-blue-500"
                >
                    <div className="mb-4 space-y-1">
                        <h2 className=" flex items-center m-4 text-2xl font-bold">
                            Edit order
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                        <div class="relative cursor-pointer inline-block text-left mb-2 h-10">
                            <div onClick={handleUser} class="inline-flex items-center justify-center px-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                                {customer || row.customer || "Select customer"}
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
                                <div class="origin-top-right absolute right-0 mt-2 z-50 h-[270px] overflow-y-scroll w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    {userList.map((user) => (
                                        <div key={user.email} class="py-1">
                                            <div
                                                href="#"
                                                onClick={() => handleUserClick(user.email)}
                                                class="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-indigo-100"
                                            >
                                                {user.email}
                                            </div>
                                        </div>))}
                                </div>)}
                        </div>
                        <div onClick={handleProductType} class="relative inline-block cursor-pointer text-left mb-2">
                            <div class="inline-flex items-center justify-center px-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                                {product || row.product || "Select product type"}
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
                                <div class="origin-top-right absolute right-0 mt-2 w-auto h-[270px] overflow-y-scroll rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">

                                    {productList.map((product) => (
                                        <div key={product.name} class="py-1">
                                            <div
                                                href="#"
                                                onClick={() => handleProductClick(product.product_name)}
                                                class="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-indigo-100"
                                            >
                                                {product.product_name}
                                            </div>
                                        </div>))}
                                </div>
                            )}
                        </div>
                        
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.worker_name}
                                value={workerName}
                                onChange={(e) => setWorkerName(e.target.value)}
                                placeholder="Worker name"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.worker_contact}
                                value={workerContact}
                                onChange={(e) => setWorkerContact(e.target.value)}
                                placeholder="Worker contact"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.start_date}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                placeholder="Start date"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.end_date}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                placeholder="End date"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.weight}
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="Weight"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.description}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />
                        </div>
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

            </div >
        </div >
    );
};

export default EditFormManufacturingOrder;
