import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import { getProductTypeAsync, getProductTypeList, getSelectedProductTypeAsync } from "@/redux/slice/productType/productTypeSlice";
import { FiImage } from 'react-icons/fi';
import { getManufacturingProductList, getManufacturingUserList, getManugfacturingProductListAsync, getManugfacturingUserListAsync } from "../redux/slice/manufacturing/manufacturingSlice";
import { getWorkerNames } from "../redux/slice/worker/workerSlice";

const StartManufacturingForm = ({ productWeight, setProductWeight, orderStatus, handleProductClick, handleUserClick, handleUpdateManufacturingOrder, openProductType, handleProductType, openCategory, handleUser, row, weight, setWeight, endDate, setEndDate, startDate, setStartDate, workerContact, setWorkerContact, workerName, setWorkerName, product, setProduct, customer, setCustomer, description, setDescription, ornamentName, setOrnamentName, wastageWeight, setWastageWeight, returnWeight, setReturnWeight, balance, setBalance, isOpen, handleCancel, error }) => {
    const dispatch = useDispatch();
    const [openWorkerSelection, setOpenWorkerSelection] = useState(false);

    const workersNameList = useSelector(getWorkerNames);

    const modalClasses = isOpen ? 'block' : 'hidden';

    const handleWorkerSelection = () => {
        setOpenWorkerSelection(!openWorkerSelection)
    }

    const handleWorkerNameClick = (option, id) => {
        setWorkerName(option);
        setOpenWorkerSelection(!openWorkerSelection);
        setWorkerId(id);
    }

    return (
        <div className="">
            <div className={`fixed inset-0 z-40 bg-black opacity-10 backdrop-blur-md transition-opacity ${modalClasses}`}></div>
            <div className="flex justify-center items-center fixed bottom-2 top-2 right-5 left-5 z-50">

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    className="p-8 rounded shadow-md flex flex-col justify-start overflow-y-scroll no-scrollbar h-full w-auto md:w-[500px] bg-white border border-blue-500"
                >
                    <div className="mb-4 space-y-1">
                        <h2 className=" flex items-center justify-center m-4 text-2xl font-bold">
                            Place manufacturing order
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-1 gap-2 mb-4">
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Customer:&nbsp;</h1>
                            <div className="text-xs md:text-sm">{row.billNo}</div>
                        </div>
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Today's 24k gold rate:&nbsp;</h1>
                            <div className="text-xs md:text-sm">{row.workerName}</div>
                        </div>
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Product:&nbsp;</h1>
                            <div className="text-xs md:text-sm">{row.workerContact}</div>
                        </div>
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Weight (gm):&nbsp;</h1>
                            <div className="text-xs md:text-sm">{row.customer}</div>
                        </div>
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Size:&nbsp;</h1>
                            <div className="text-xs md:text-sm">{row.weight} gm</div>
                        </div>
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Quantity:&nbsp;</h1>
                            <div className="text-xs md:text-sm">{row.startDate}</div>
                        </div>
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Total fine required:&nbsp;</h1>
                            <div className="text-xs md:text-sm">{row.endDate}</div>
                        </div>
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Received fine from customer:&nbsp;</h1>
                            <div className="max-h-10 overflow-y-scroll pr-2 text-xs md:text-sm">{row.description}</div>
                        </div>
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Remaining cash:&nbsp;</h1>
                            <div className="max-h-10 overflow-y-scroll pr-2 text-xs md:text-sm">{row.description}</div>
                        </div>
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Received cash from customer:&nbsp;</h1>
                            <div className="max-h-10 overflow-y-scroll pr-2 text-xs md:text-sm">{row.description}</div>
                        </div>
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Making charges:&nbsp;</h1>
                            <div className="max-h-10 overflow-y-scroll pr-2 text-xs md:text-sm">{row.description}</div>
                        </div>
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Balance pending:&nbsp;</h1>
                            <div className="max-h-10 overflow-y-scroll pr-2 text-xs md:text-sm">{row.description}</div>
                        </div>
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Remark:&nbsp;</h1>
                            <div className="max-h-10 overflow-y-scroll pr-2 text-xs md:text-sm">{row.description}</div>
                        </div>
                        <div className="flex">
                            <h1 className="text-xs md:text-sm font-semibold">Status:&nbsp;</h1>
                            <div className="text-xs md:text-sm">{row.status}</div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2">

                        <div onClick={handleWorkerSelection} class={`relative inline-block cursor-pointer text-left mb-2 ${user === '' && error ? 'border-2 border-red-500' : ''}`}>
                            <div class="inline-flex items-center justify-center text-xs md:text-sm font-semibold px-4 py-2 w-full h-3.3125 rounded-xl border border-gray-300 shadow-sm bg-white text-[#595858] hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                                {workerName || "Select worker"}
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

                            {openWorkerSelection && (
                                <div class="origin-top-right absolute z-10 right-16 mt-2 w-[220px] max-h-[150px] overflow-y-scroll rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">

                                    {workersNameList.map((workersName) => (
                                        <div key={workersName.id} class="py-1">
                                            <div
                                                href="#"
                                                onClick={() => handleWorkerNameClick(workersName.worker_name, workersName.id)}
                                                class="block px-4 py-2 text-xs md:text-sm font-semibold cursor-pointer text-[#595858] hover:bg-indigo-100"
                                            >
                                                {workersName.worker_name}
                                            </div>
                                        </div>))}
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <input
                                type="number"
                                className={`w-full h-9 py-2 px-8 text-xs border rounded-xl outline-none border-[#9C9C9C] text-[#111010] ${wastageWeight === '' && error ? 'border-2 border-red-500' : ''}`}
                                value={issueWeight}
                                onChange={(e) => setIssueWeight(e.target.value)}
                                placeholder="Issue weight (gm)"
                            />
                        </div>
                        <div className="mb-4 flex justify-center items-center">
                            <label htmlFor="startDate" className="w-full flex items-center cursor-pointer h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]">
                                Start date
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    className="md:ml-10 text-[#595858] text-xs md:text-sm font-semibold cursor-pointer"
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="mb-4 flex justify-center items-center">
                            <label htmlFor="endDate" className="w-full flex items-center cursor-pointer h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]">
                                End date
                                <input
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    min={startDate}
                                    className="md:ml-10 ml-3 text-[#595858] text-xs md:text-sm font-semibold cursor-pointer"
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </label>
                        </div>

                    </div>

                    <div className="flex flex-row space-x-2 m-2">
                        {row.status === "Pending" && <button
                            type="submit"
                            className="w-full mt-2 rounded-xl bg-[#DF8E51] text-white py-2 transition duration-300"
                        >
                            Submit
                        </button>}
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

export default StartManufacturingForm;
