import { getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import { createProductAsync, getProductAsync } from "@/redux/slice/product/productSlice";
import { getProductTypeList } from "@/redux/slice/productType/productTypeSlice";
import { getManugfacturingProductListAsync, getManufacturingProductList, getManugfacturingUserListAsync, getManufacturingUserList, createManugfacturingOrderAsync, getManufacturingOrderListAsync } from "../redux/slice/manufacturing/manufacturingSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiImage } from 'react-icons/fi';

const AddProduct = ({ addProduct, setAddProduct }) => {
    const dispatch = useDispatch();

    const [user, setUser] = useState("");
    const [product, setProduct] = useState("");
    const [workerName, setWorkerName] = useState("");
    const [workerContact, setWorkerContact] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [weight, setWeight] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState(false);
    const [formatError, setFormatError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [openProductType, setOpenProductType] = useState(false);
    const [openUser, setOpenUser] = useState(false);

    //Handling image file
    const handleFileChange = (e) => {

        const selectedFile = e.target.files;
        const filesLength = selectedFile.length;

        setFiles(filesLength)
        setImage(selectedFile);
    }

    useEffect(() => {
        dispatch(getManugfacturingProductListAsync());
        dispatch(getManugfacturingUserListAsync());
    }, [dispatch])
    const productList = useSelector(getManufacturingProductList);
    const userList = useSelector(getManufacturingUserList);

    const handleClose = () => {
        setAddProduct(!addProduct);
    };

    const handleManufacturingOrderSubmit = (e) => {
        if (user !== "", product !== "", workerName !== "", workerContact !== "", startDate !== "", endDate !== "", weight !== "", description !== "") {

            e.preventDefault();
            console.log("description", description);
            //logic for add product
            dispatch(createManugfacturingOrderAsync({ customer: user, product: product, worker_name: workerName, worker_contact: workerContact, start_date: startDate, end_date: endDate, weight: weight, decription: description })).then((result) => {
                if (createManugfacturingOrderAsync.fulfilled.match(result)) {
                    dispatch(getManufacturingOrderListAsync());
                    setUser("");
                    setProduct("");
                    setWorkerName("");
                    setWorkerContact("");
                    setStartDate("");
                    setEndDate("");
                    setWeight("");
                    setDescription("");

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
            }, 3000);
        }

    }

    const handleCategory = () => {
        setOpenCategory(!openCategory);
    };

    const handleCategoryClick = (option) => {
        setCategory(option);
        setOpenCategory(!openCategory);
    };

    const handleProductType = () => {
        setOpenProductType(!openProductType)
    }

    const handleUser = () => {
        setOpenUser(!openUser)
    }

    const handleProductClick = (option) => {
        setProduct(option);
        setOpenProductType(!openProductType);
    }

    const handleUserClick = (option) => {
        setUser(option);
        setOpenUser(!openUser);
    }

    const hideError = () => {
        setError(false);
    }

    const hideFormatError = () => {
        setFormatError(false);
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
                <strong className="font-bold">Order added successfully</strong>
                <button
                    onClick={hideSuccess}
                    className="relative top-0.5 bottom-0 left-1"
                >
                    <span className="text-green-500 text-2xl">×</span>
                </button>
            </div>}
            <div
                id="addProduct"
                className="relative flex flex-col items-center rounded shadow-md w-full h-34.3125 bg-white mt-1.375"
            >
                <button
                    className="absolute top-2 right-2 p-0.5 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
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
                <div id="formTitle" className="w-52 h-4 m-4 font-bold text-center text-25">
                    Gold issue
                </div>
                <div id="formFields" className="">
                    <form
                        onSubmit={handleManufacturingOrderSubmit}
                        className="p-8 flex flex-col items-center w-35rem h-28rem bg-white"
                    >
                        <div id="textFields" className="grid md:grid-cols-2 gap-4">

                            <div onClick={handleProductType} class={`relative inline-block cursor-pointer text-left mb-2 ${product === '' && error ? 'border-2 border-red-500' : ''}`}>
                                <div class="inline-flex items-center justify-center px-4 py-2 w-full h-3.3125 rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                                    {product || "Select product"}
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
                                    <div class="origin-top-right absolute z-30 right-16 mt-2 w-[220px] max-h-[150px] overflow-y-scroll rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">

                                        {productList.map((product) => (
                                            <div key={product.product_name} class="py-1">
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

                            <div onClick={handleUser} class={`relative inline-block cursor-pointer text-left mb-2 ${user === '' && error ? 'border-2 border-red-500' : ''}`}>
                                <div class="inline-flex items-center justify-center px-4 py-2 w-full h-3.3125 rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                                    {user || "Select customer"}
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

                                {openUser && (
                                    <div class="origin-top-right absolute z-10 right-16 mt-2 w-[220px] max-h-[150px] overflow-y-scroll rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">

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
                                    </div>
                                )}
                            </div>
                            <div className={`mb-4 md:w-21.375 ${workerName === '' && error ? 'border-2 border-red-500' : ''}`}>
                                <input
                                    type="text"
                                    className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                    value={workerName}
                                    onChange={(e) => setWorkerName(e.target.value)}
                                    placeholder="Worker name"
                                />
                            </div>
                            <div className={`mb-4 md:w-21.375 ${workerContact === '' && error ? 'border-2 border-red-500' : ''}`}>
                                <input
                                    type="text"
                                    className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                    value={workerContact}
                                    onChange={(e) => setWorkerContact(e.target.value)}
                                    placeholder="Worker contact"
                                />
                            </div>
                            <div className={`mb-4 flex justify-center items-center ${startDate === '' && error ? 'border-2 border-red-500' : ''}`}>
                                <label htmlFor="startDate" className="w-full flex items-center h-3.3125 py-2 px-8 border rounded-xl font-semibold outline-none border-[#9C9C9C] text-[#9C9C9C] cursor-pointer">
                                    Start date
                                    <input
                                        type="date"
                                        id="startDate"
                                        className="md:ml-10 text-[#595858] font-semibold cursor-pointer"
                                        onChange={(e) => {
                                            setStartDate(e.target.value)
                                        }}
                                    />
                                </label>
                            </div>


                            <div className={`mb-4 flex justify-center items-center ${endDate === '' && error ? 'border-2 border-red-500' : ''}`}>
                                <label htmlFor="startDate" className="w-full flex items-center h-3.3125 py-2 px-8 border rounded-xl font-semibold outline-none border-[#9C9C9C] text-[#9C9C9C] cursor-pointer">
                                    End date
                                    <input
                                        type="date"
                                        id="endDate"
                                        className="md:ml-10 text-[#595858] font-semibold cursor-pointer"
                                        min={startDate}
                                        onChange={(e) => {
                                            setEndDate(e.target.value)
                                        }}
                                    />
                                </label>
                            </div>
                            <div className={`mb-4 md:w-21.375 ${weight === '' && error ? 'border-2 border-red-500' : ''}`}>
                                <input
                                    type="number"
                                    className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="Issue weight (in gm)"
                                />
                            </div>
                            <div className={`mb-4 md:w-21.375 ${description === '' && error ? 'border-2 border-red-500' : ''}`}>
                                <input
                                    type="text"
                                    className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Description"
                                />
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
            </div>
        </>
    );
};

export default AddProduct;
