import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import { getProductTypeAsync, getProductTypeList, getSelectedProductTypeAsync } from "@/redux/slice/productType/productTypeSlice";
import { FiImage } from 'react-icons/fi';
import AddIcon from "../../public/assets/Icons/add.svg";
import Image from "next/image";

const EditFormProduct = ({ row, handleUpdateWorker, firstName, setFirstName, lastName, setLastname, email, setEmail, mobile, setMobile, zipcode, setZipcode, city, setCity, state, setState, country, setCountry, address, setAddress, isOpen, handleCancel }) => {
    const dispatch = useDispatch();

    const modalClasses = isOpen ? 'block' : 'hidden';

    return (
        <div>
            <div className={`fixed inset-0 z-40 bg-black opacity-10 backdrop-blur-md transition-opacity ${modalClasses}`}></div>
            <div className="flex justify-center items-center fixed bottom-2 top-2 right-5 left-5 z-50">

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateWorker(e, row.firstName, row.lastName, row.email, row.mobile, row.address, row.city, row.state, row.country, row.zipcode);
                    }}
                    className="p-8 rounded shadow-md flex flex-col justify-start overflow-y-scroll md:h-min h-full w-auto bg-white border border-blue-500"
                >
                    <div className="mb-4">
                        <h2 className=" flex items-center m-4 text-2xl font-bold">
                            Edit worker
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-2">

                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.firstName}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First name"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.lastName}
                                value={lastName}
                                onChange={(e) => setLastname(e.target.value)}
                                placeholder="Last name"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.email}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.mobile}
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Contact no"
                            />
                        </div>

                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.address}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Address"
                            />
                        </div>


                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.city}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.state}
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="State"
                            // field named original price is there in the prop of this form but not used yet
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.country}
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="Country"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.zipcode}
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                placeholder="PIN code"
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

export default EditFormProduct;
