import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import { getProductTypeAsync, getProductTypeList, getSelectedProductTypeAsync } from "@/redux/slice/productType/productTypeSlice";
import { FiImage } from 'react-icons/fi';
import { getManufacturingProductList, getManufacturingUserList, getManugfacturingProductListAsync, getManugfacturingUserListAsync } from "../redux/slice/manufacturing/manufacturingSlice";

const EditFormManufacturingOrder = ({ productWeight, setProductWeight, orderStatus, handleProductClick, handleUserClick, handleUpdateManufacturingOrder, openProductType, handleProductType, openCategory, handleUser, row, weight, setWeight, endDate, setEndDate, startDate, setStartDate, workerContact, setWorkerContact, workerName, setWorkerName, product, setProduct, customer, setCustomer, description, setDescription, ornamentName, setOrnamentName, wastageWeight, setWastageWeight, returnWeight, setReturnWeight, balance, setBalance, isOpen, handleCancel, error }) => {
    const dispatch = useDispatch();
    const [returnWeightLimit, setReturnWeightLimit] = useState("");

    const modalClasses = isOpen ? 'block' : 'hidden';

    //Calculations
    const calculateReturnWeight = () => {
        const productWeightValue = parseFloat(productWeight) || 0;
        const wastageWeightValue = parseFloat(wastageWeight) || 0;
        const issueWeightValue = parseFloat(weight) || 0;

        const calculatedReturnWeight = issueWeightValue - productWeightValue - wastageWeightValue;

        setReturnWeightLimit(calculatedReturnWeight.toFixed(4));
    };

    const calculateBalanceWeight = () => {
        if (returnWeight !== "") {
            const productWeightValue = parseFloat(productWeight) || 0;
            const wastageWeightValue = parseFloat(wastageWeight) || 0;
            const issueWeightValue = parseFloat(weight) || 0;
            const returnWeightValue = parseFloat(returnWeight) || 0;

            const calculateBalance = issueWeightValue - productWeightValue - wastageWeightValue - returnWeightValue;

            setBalance(calculateBalance.toFixed(4));
        }
    }

    useEffect(() => {
        calculateReturnWeight();
    }, [productWeight, wastageWeight, weight]);

    useEffect(() => {
        calculateBalanceWeight();
    }, [productWeight, wastageWeight, weight, returnWeight])

    return (
        <div className="">
            <div className={`fixed inset-0 z-40 bg-black opacity-10 backdrop-blur-md transition-opacity ${modalClasses}`}></div>
            <div className="flex justify-center items-center fixed bottom-2 top-2 right-5 left-5 z-50">

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateManufacturingOrder(e, row.id, row.customer, row.product, row.workerName, row.workerContact, row.startDate, row.endDate, row.weight, row.description);
                    }}
                    className="p-8 rounded shadow-md flex flex-col justify-start overflow-y-scroll md:h-min h-full w-auto bg-white border border-blue-500"
                >
                    <div className="mb-4 space-y-1">
                        <h2 className=" flex items-center justify-center m-4 text-2xl font-bold">
                            {row.status === "Pending" ? "Add details" : "Receipt"}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-1 gap-2 mb-4">
                        <div className="flex">
                            <h1 className="font-semibold">Bill number:&nbsp;</h1>
                            <div>{row.billNo}</div>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold">Worker name:&nbsp;</h1>
                            <div>{row.workerName}</div>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold">Worker contact number:&nbsp;</h1>
                            <div>{row.workerContact}</div>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold">Customer name:&nbsp;</h1>
                            <div>{row.customer}</div>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold">Issue weight:&nbsp;</h1>
                            <div>{row.weight} gm</div>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold">Start date:&nbsp;</h1>
                            <div>{row.startDate}</div>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold">End date:&nbsp;</h1>
                            <div>{row.endDate}</div>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold">Description:&nbsp;</h1>
                            <div className="max-h-10 overflow-y-scroll pr-2">{row.description}</div>
                        </div>
                        {(row.status === "completed" || row.status === "cancelled") && row.ornamentName !== "" && <div className="flex">
                            <h1 className="font-semibold">Ornament name:&nbsp;</h1>
                            <div>{row.ornamentName}</div>
                        </div>}
                        {(row.status === "completed" || row.status === "cancelled") && <div className="flex">
                            <h1 className="font-semibold">Product weight:&nbsp;</h1>
                            <div>{row.productWeight === "" ? "0 gm" : `${row.productWeight} gm`}</div>
                        </div>}
                        {(row.status === "completed" || row.status === "cancelled") && <div className="flex">
                            <h1 className="font-semibold">Wastage weight:&nbsp;</h1>
                            <div>{row.wastageWeight === "" ? "0 gm" : `${row.wastageWeight} gm`}</div>
                        </div>}
                        {(row.status === "completed" || row.status === "cancelled") && <div className="flex">
                            <h1 className="font-semibold">Return weight:&nbsp;</h1>
                            <div>{row.returnWeight === "" ? "0 gm" : `${row.returnWeight} gm`}</div>
                        </div>}
                        {(row.status === "completed" || row.status === "cancelled") && <div className="flex">
                            <h1 className="font-semibold">Balance:&nbsp;</h1>
                            <div>{row.balance === "" ? "0 gm" : `${row.balance} gm`}</div>
                        </div>}
                        <div className="flex">
                            <h1 className="font-semibold">Status:&nbsp;</h1>
                            <div>{row.status}</div>
                        </div>
                    </div>

                    {row.status === "Pending" && <div className="grid md:grid-cols-2 gap-2">
                        <div className={`mb-4`}>
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 text-xs border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                value={ornamentName}
                                onChange={(e) => setOrnamentName(e.target.value)}
                                placeholder="Ornament name"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="number"
                                className={`w-full h-9 py-2 px-8 text-xs border rounded-xl outline-none border-[#9C9C9C] text-[#111010] ${productWeight === '' && error ? 'border-2 border-red-500' : ''}`}
                                value={productWeight}
                                onChange={(e) => setProductWeight(e.target.value)}
                                placeholder="Product weight (gm)"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="number"
                                className={`w-full h-9 py-2 px-8 text-xs border rounded-xl outline-none border-[#9C9C9C] text-[#111010] ${wastageWeight === '' && error ? 'border-2 border-red-500' : ''}`}
                                value={wastageWeight}
                                onChange={(e) => setWastageWeight(e.target.value)}
                                placeholder="Wastage weight (gm)"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="number"
                                className={`w-full h-9 py-2 px-8 text-xs border rounded-xl outline-none border-[#9C9C9C] text-[#111010] ${returnWeight === '' && error ? 'border-2 border-red-500' : ''}`}
                                value={returnWeight}
                                onChange={(e) => setReturnWeight(e.target.value)}
                                placeholder="Return weight (gm)"
                            />
                            <div className=" bg-yellow-100 text-xs">{`Return weight should be less than or equal to ${returnWeightLimit}gm`}</div>
                        </div>
                        <div className="mb-4">
                            <input
                                type="number"
                                disabled={true}
                                className={`w-full h-9 py-2 px-8 text-xs border rounded-xl outline-none border-[#9C9C9C] text-[#111010] ${balance === '' && error ? 'border-2 border-red-500' : ''}`}
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                placeholder="Balance (gm)"
                            />
                        </div>
                        <div class="relative cursor-pointer inline-block text-left mb-2 h-10">
                            <div onClick={handleUser} class={`inline-flex items-center justify-center font-semibold px-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm bg-white text-xs text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600 ${orderStatus === 'Pending' && error ? 'border-2 border-red-500' : ''}`}>
                                Status: {orderStatus}
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
                                <div class="origin-top-right absolute right-0 mt-2 z-50 max-h-[100px] w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    {["completed", "cancelled"].map((option) => (
                                        <div key={option} class="py-1">
                                            <div
                                                href="#"
                                                onClick={() => handleUserClick(option)}
                                                class="block px-4 py-2 text-xs cursor-pointer text-gray-700 hover:bg-indigo-100"
                                            >
                                                {option}
                                            </div>
                                        </div>))}
                                </div>)}
                        </div>
                    </div>}



                    {/* Previous form */}

                    {/* <div className="grid md:grid-cols-2 gap-2"> */}

                    {/* <div onClick={handleProductType} class="relative inline-block cursor-pointer text-left mb-2">
                            <div class="inline-flex items-center justify-center px-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                                {product || row.product || "Select product type"} */}
                    {/* Arrow icon (tailwindcss/heroicons) */}
                    {/* <svg

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
                                </svg> */}
                    {/* </div> */}

                    {/* {openProductType && (
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
                            )} */}
                    {/* </div> */}

                    {/* <div className="mb-4 ">
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
                        </div> */}

                    {/* <div className="mb-4 flex justify-center items-center">
                            <label htmlFor="startDate" className="w-full flex items-center cursor-pointer h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]">
                                Start date
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    className="md:ml-10 text-[#595858] font-semibold cursor-pointer"
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
                                    className="md:ml-10 ml-3 text-[#595858] font-semibold cursor-pointer"
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </label>
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
                        </div> */}
                    {/* </div> */}

                    {/* Previous form ends here */}




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
                            {row.status === "Pending" ? "Cancel" : "Close"}
                        </button>
                    </div>
                </form>

            </div >
        </div >
    );
};

export default EditFormManufacturingOrder;
