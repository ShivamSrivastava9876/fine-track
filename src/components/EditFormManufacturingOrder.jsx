import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesAsync,
  getCategoryList,
} from "@/redux/slice/category/categorySlice";
import {
  getProductTypeAsync,
  getProductTypeList,
  getSelectedProductTypeAsync,
} from "@/redux/slice/productType/productTypeSlice";
import { FiImage } from "react-icons/fi";
import {
  getManufacturingProductList,
  getManufacturingUserList,
  getManugfacturingProductListAsync,
  getManugfacturingUserListAsync,
} from "../redux/slice/manufacturing/manufacturingSlice";

const EditFormManufacturingOrder = ({
  productWeight,
  setProductWeight,
  orderStatus,
  handleProductClick,
  handleUserClick,
  handleUpdateManufacturingOrder,
  openProductType,
  handleProductType,
  openCategory,
  handleUser,
  row,
  weight,
  setWeight,
  endDate,
  setEndDate,
  startDate,
  setStartDate,
  workerContact,
  setWorkerContact,
  workerName,
  setWorkerName,
  product,
  setProduct,
  customer,
  setCustomer,
  description,
  setDescription,
  ornamentName,
  setOrnamentName,
  wastageWeight,
  setWastageWeight,
  returnWeight,
  setReturnWeight,
  balance,
  setBalance,
  isOpen,
  handleCancel,
  error,
}) => {
  const dispatch = useDispatch();
  const [returnWeightLimit, setReturnWeightLimit] = useState("");

  const modalClasses = isOpen ? "block" : "hidden";

  //Calculations
  const calculateReturnWeight = () => {
    const productWeightValue = parseFloat(productWeight) || 0;
    const wastageWeightValue = parseFloat(wastageWeight) || 0;
    const issueWeightValue = parseFloat(weight) || 0;

    const calculatedReturnWeight =
      issueWeightValue - productWeightValue - wastageWeightValue;

    setReturnWeightLimit(calculatedReturnWeight.toFixed(4));
  };

  const calculateBalanceWeight = () => {
    if (returnWeight !== "") {
      const productWeightValue = parseFloat(productWeight) || 0;
      const wastageWeightValue = parseFloat(wastageWeight) || 0;
      const issueWeightValue = parseFloat(weight) || 0;
      const returnWeightValue = parseFloat(returnWeight) || 0;

      const calculateBalance =
        issueWeightValue -
        productWeightValue -
        wastageWeightValue -
        returnWeightValue;

      setBalance(calculateBalance.toFixed(4));
    }
  };

  useEffect(() => {
    calculateReturnWeight();
  }, [productWeight, wastageWeight, weight]);

  useEffect(() => {
    calculateBalanceWeight();
  }, [productWeight, wastageWeight, weight, returnWeight]);

  return (
    <div className="">
      <div
        className={`fixed inset-0 z-40 bg-black opacity-10 backdrop-blur-md transition-opacity ${modalClasses}`}
      ></div>
      <div className="flex justify-center items-center fixed bottom-2 top-2 right-5 left-5 z-50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateManufacturingOrder(
              e,
              row.id,
              row.customer,
              row.product,
              row.workerName,
              row.workerContact,
              row.startDate,
              row.endDate,
              row.weight,
              row.description
            );
          }}
          className="p-8 rounded shadow-md flex flex-col justify-start overflow-y-scroll no-scrollbar h-full w-auto md:w-[500px] bg-white border border-blue-500"
        >
          <div className="mb-4 space-y-1">
            <h2 className=" flex items-center justify-center m-4 text-2xl font-bold">
              {row.status === "Pending" ? "तपशील जोडा" : "पावती"}
            </h2>
          </div>

          <div className="grid md:grid-cols-1 gap-2 mb-4">
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                बिल क्रमांक:&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.billNo}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                कामगारचा नाव:&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.workerName}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                कामगारचा संपर्क क्रमांक:&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.workerContact}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                ग्राहकाचा नाव:&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.customer}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                दीलेला वजन (ग्राम):&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.weight} gm</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                प्रारंभची तारीख:&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.startDate}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                शेवटची तारीख:&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.endDate}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">वर्णन:&nbsp;</h1>
              <div className="max-h-10 overflow-y-scroll pr-2 text-xs md:text-sm">
                {row.description}
              </div>
            </div>
            {(row.status === "completed" || row.status === "cancelled") &&
              row.ornamentName !== "" && (
                <div className="flex">
                  <h1 className="text-xs md:text-sm font-semibold">
                    दागिन्यांचे नाव:&nbsp;
                  </h1>
                  <div className="text-xs md:text-sm">{row.ornamentName}</div>
                </div>
              )}
            {(row.status === "completed" || row.status === "cancelled") && (
              <div className="flex">
                <h1 className="text-xs md:text-sm font-semibold">
                  प्रोडक्टचे वजन (ग्राम):&nbsp;
                </h1>
                <div className="text-xs md:text-sm">
                  {row.productWeight === ""
                    ? "0 gm"
                    : `${row.productWeight} gm`}
                </div>
              </div>
            )}
            {(row.status === "completed" || row.status === "cancelled") && (
              <div className="flex">
                <h1 className="text-xs md:text-sm font-semibold">
                  वाया गेलेले वजन (ग्राम):&nbsp;
                </h1>
                <div className="text-xs md:text-sm">
                  {row.wastageWeight === ""
                    ? "0 gm"
                    : `${row.wastageWeight} gm`}
                </div>
              </div>
            )}
            {(row.status === "completed" || row.status === "cancelled") && (
              <div className="flex">
                <h1 className="text-xs md:text-sm font-semibold">
                  परत केलेले वजन (ग्राम):&nbsp;
                </h1>
                <div className="text-xs md:text-sm">
                  {row.returnWeight === "" ? "0 gm" : `${row.returnWeight} gm`}
                </div>
              </div>
            )}
            {(row.status === "completed" || row.status === "cancelled") && (
              <div className="flex">
                <h1 className="text-xs md:text-sm font-semibold">
                  शिल्लक (ग्राम):&nbsp;
                </h1>
                <div className="text-xs md:text-sm">
                  {row.balance === "" ? "0 gm" : `${row.balance} gm`}
                </div>
              </div>
            )}
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                स्टेटस:&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.status}</div>
            </div>
          </div>

          {row.status === "Pending" && (
            <div className="grid md:grid-cols-2 gap-2">
              <div className={`mb-4`}>
                <input
                  type="text"
                  className="w-full h-9 py-2 px-8 text-xs border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={ornamentName}
                  onChange={(e) => setOrnamentName(e.target.value)}
                  placeholder="दागिन्यांचे नाव"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  className={`w-full h-9 py-2 px-8 text-xs border rounded-xl outline-none border-[#9C9C9C] text-[#111010] ${
                    productWeight === "" && error
                      ? "border-2 border-red-500"
                      : ""
                  }`}
                  value={productWeight}
                  onChange={(e) => setProductWeight(e.target.value)}
                  placeholder="प्रोडक्टचे वजन (ग्राम)"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  className={`w-full h-9 py-2 px-8 text-xs border rounded-xl outline-none border-[#9C9C9C] text-[#111010] ${
                    wastageWeight === "" && error
                      ? "border-2 border-red-500"
                      : ""
                  }`}
                  value={wastageWeight}
                  onChange={(e) => setWastageWeight(e.target.value)}
                  placeholder="वाया गेलेले वजन (ग्राम)"
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  className={`w-full h-9 py-2 px-8 text-xs border rounded-xl outline-none border-[#9C9C9C] text-[#111010] ${
                    returnWeight === "" && error
                      ? "border-2 border-red-500"
                      : ""
                  }`}
                  value={returnWeight}
                  onChange={(e) => setReturnWeight(e.target.value)}
                  placeholder="परत केलेले वजन (ग्राम)"
                />
                <div className=" bg-yellow-100 text-xs">{`परत केलेले वजन ${returnWeightLimit} ग्राम पेक्षा कमी किंवा समान असावे `}</div>
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  disabled={true}
                  className={`w-full h-9 py-2 px-8 text-xs border rounded-xl outline-none border-[#9C9C9C] text-[#111010] ${
                    balance === "" && error ? "border-2 border-red-500" : ""
                  }`}
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  placeholder="शिल्लक (ग्राम)"
                />
              </div>
              <div class="relative cursor-pointer inline-block text-left mb-2 h-10">
                <div
                  onClick={handleUser}
                  class={`inline-flex items-center justify-center text-xs font-semibold px-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600 ${
                    orderStatus === "Pending" && error
                      ? "border-2 border-red-500"
                      : ""
                  }`}
                >
                  स्टेटस: {orderStatus}
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
                    {["पूर्ण", "रद्द"].map((option) => (
                      <div key={option} class="py-1">
                        <div
                          href="#"
                          onClick={() => handleUserClick(option)}
                          class="block px-4 py-2 text-xs cursor-pointer text-gray-700 hover:bg-indigo-100"
                        >
                          {option}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-row space-x-2 m-2">
            {row.status === "Pending" && (
              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-[#DF8E51] text-white py-2 transition duration-300"
              >
                आवेदन सादर करा
              </button>
            )}
            <button
              onClick={handleCancel}
              className="w-full mt-2 rounded-xl bg-[#DF8E51] text-white py-2 transition duration-300"
            >
              {row.status === "Pending" ? "रद्द" : "बंद"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFormManufacturingOrder;
