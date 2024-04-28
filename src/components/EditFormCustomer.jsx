import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import {
  createUserAsync,
  userDetailsAsync,
} from "@/redux/slice/user/userSlice";

const EditFormCustomer = ({
  isOpen,
  row,
  handleCancel,
  customerName,
  setCustomerName,
  businessName,
  setBusinessName,
  email,
  setEmail,
  contactNo,
  setContactNo,
  alternateContactNo,
  setAlternateContactNo,
  address,
  setAddress,
  shippingAddress,
  setShippingAddress,
  remark,
  setRemark,
  handleUpdateCustomer,
}) => {
  const dispatch = useDispatch();

  const modalClasses = isOpen ? "block" : "hidden";

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black opacity-10 backdrop-blur-md transition-opacity ${modalClasses}`}
      ></div>
      <div className="flex justify-center items-center fixed bottom-2 top-2 right-5 left-5 z-50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateCustomer(
              e,
              row.id,
              row.customerName,
              row.businessName,
              row.email,
              row.contactNo,
              row.alternateContactNo,
              row.address,
              row.shippingAddress,
              row.remark
            );
          }}
          className="p-8 rounded shadow-md flex flex-col justify-start overflow-y-scroll no-scrollbar h-full w-auto bg-white border border-blue-500"
        >
          <div className="mb-4 space-y-1">
            <h2 className=" text-[#0a0a0a] text-center font-bold text-base text-16px w-161">
              Update customer details
            </h2>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <div className={`mb-4`}>
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div className={`mb-4`}>
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Business name"
              />
            </div>
            <div className={`mb-4`}>
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className={`mb-4`}>
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                placeholder="Contact number"
              />
            </div>
            <div className={`mb-4`}>
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={alternateContactNo}
                onChange={(e) => setAlternateContactNo(e.target.value)}
                placeholder="Alternate contact no"
              />
            </div>
            <div className={`mb-4`}>
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </div>
            <div className={`mb-4`}>
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Shipping address"
              />
            </div>
            <div className={`mb-4`}>
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Remark"
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
      </div>
    </>
  );
};

export default EditFormCustomer;
