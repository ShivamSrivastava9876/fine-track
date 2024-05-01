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
  createManugfacturingOrderAsync,
  getManufacturingProductList,
  getManufacturingUserList,
  getManugfacturingProductListAsync,
  getManugfacturingUserListAsync,
} from "../redux/slice/manufacturing/manufacturingSlice";
import {
  getWorkerNames,
  getWorkersNameAsync,
} from "@/redux/slice/worker/workerSlice";
import { getOrderListAsync } from "@/redux/slice/order/orderSlice";

const CreateManufacturingOrder = ({ row, isOpen, handleCancel }) => {
  const dispatch = useDispatch();

  const [workerName, setWorkerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [issueWeight, setIssueWeight] = useState(""); //But issue weight will be equal to total fine required so handle it accordingly
  const [workerId, setWorkerId] = useState("");
  const [openWorkerSelection, setOpenWorkerSelection] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  console.log(row, "row");

  const modalClasses = isOpen ? "block" : "hidden";

  const handleWorkerSelection = () => {
    setOpenWorkerSelection(!openWorkerSelection);
  };

  const handleWorkerNameClick = (option, id) => {
    setWorkerName(option);
    setOpenWorkerSelection(!openWorkerSelection);
    setWorkerId(id);
  };

  //Handling error and success popup
  const hideError = () => {
    setError(false);
  };

  const hideSuccess = () => {
    setSuccess(false);
  };

  const handleManufacturingOrderSubmit = (e) => {
    if (
      workerName !== "" &&
      workerId !== "" &&
      startDate !== "" &&
      endDate !== "" &&
      issueWeight !== ""
    ) {
      e.preventDefault();

      dispatch(
        createManugfacturingOrderAsync({
          customer: row.customer,
          product: row.product,
          worker: workerId,
          start_date: startDate,
          end_date: endDate,
          weight: issueWeight,
        })
      ).then((result) => {
        if (createManugfacturingOrderAsync.fulfilled.match(result)) {
          dispatch(getOrderListAsync());
          setWorkerName("");
          setStartDate("");
          setEndDate("");
          setIssueWeight("");

          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        }
      });
    } else {
      e.preventDefault();
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    dispatch(getWorkersNameAsync());
  }, [dispatch]);
  const workersNameList = useSelector(getWorkerNames);

  return (
    <div className="">
      {error && (
        <div
          // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
          className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
          role="alert"
          style={{ zIndex: 1000 }}
        >
          <strong className="font-bold">
            कृपया सर्व आवश्यक फील्ड भरा
          </strong>
          <button
            onClick={hideError}
            className="relative top-0.5 bottom-0 left-1"
          >
            <span className="text-red-500 text-2xl">×</span>
          </button>
        </div>
      )}
      {success && (
        <div
          // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
          className="bg-green-100 flex justify-between items-center border border-green-400 text-green-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
          role="success"
          style={{ zIndex: 1001 }}
        >
          <strong className="font-bold">नवीन ऑर्डर ऐड झाले</strong>
          <button
            onClick={hideSuccess}
            className="relative top-0.5 bottom-0 left-1"
          >
            <span className="text-green-500 text-2xl">×</span>
          </button>
        </div>
      )}
      <div
        className={`fixed inset-0 z-40 bg-black opacity-10 backdrop-blur-md transition-opacity ${modalClasses}`}
      ></div>
      <div className="flex justify-center items-center fixed bottom-2 top-2 right-5 left-5 z-50">
        <form
          onSubmit={handleManufacturingOrderSubmit}
          className="py-4 px-8 rounded shadow-md flex flex-col justify-start overflow-y-scroll no-scrollbar h-full w-auto md:w-[500px] bg-white border border-blue-500"
        >
          <div className="mb-4 space-y-1">
            <h2 className=" flex items-center justify-center m-4 text-2xl font-bold">
              उत्पादन सुरू करण्यासाठी फॉर्म
            </h2>
          </div>
          <div className="grid md:grid-cols-1 gap-2 mb-4">
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                प्रोडक्ट:&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.product}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                ग्राहक:&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.customer}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                मागील शिल्लक फाइन (ग्राम):&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.prevBalanceFine}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                सोन्याचा दर 24 कैरेट प्रति ग्राम:&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.goldRate} gm</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                वजन (ग्राम):&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.weight}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">माप:&nbsp;</h1>
              <div className="text-xs md:text-sm">{row.size}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                प्रमाण:&nbsp;
              </h1>
              <div className="pr-2 text-xs md:text-sm">{row.quantity}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                एकूण फाइन आवश्यक (ग्राम):&nbsp;
              </h1>
              <div className=" pr-2 text-xs md:text-sm">{row.fineRequired}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                ग्राहकपासून आलेला फाइन (ग्राम):&nbsp;
              </h1>
              <div className=" pr-2 text-xs md:text-sm">{row.receivedFine}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                रक्कम भरावी लागेल (₹):&nbsp;
              </h1>
              <div className="pr-2 text-xs md:text-sm">{row.remainingCash}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                ग्राहकपासून मिळालेला रक्कम (₹):&nbsp;
              </h1>
              <div className="pr-2 text-xs md:text-sm">{row.receivedCash}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                तयार करण्याचे रक्कम (₹):&nbsp;
              </h1>
              <div className="pr-2 text-xs md:text-sm">{row.makingCharges}</div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                बाकी रक्कम (₹):&nbsp;
              </h1>
              <div className="pr-2 text-xs md:text-sm">
                {row.balancePending}
              </div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                ऑर्डर दिल्याची तारीख:&nbsp;
              </h1>
              <div className="pr-2 text-xs md:text-sm">
                {row.dateOfOrderPlaced}
              </div>
            </div>
            <div className="flex">
              <h1 className="text-xs md:text-sm font-semibold">
                स्टेटस:&nbsp;
              </h1>
              <div className="text-xs md:text-sm">{row.status}</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            <div
              onClick={handleWorkerSelection}
              class={`relative inline-block cursor-pointer text-left mb-2 h-9`}
            >
              <div
                class={`inline-flex items-center justify-center text-xs h-9 font-semibold px-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm bg-white text-[#595858] hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600 ${
                  workerName === "" && error ? "border-2 border-red-500" : ""
                }`}
              >
                {workerName || "कामगार निवडा"}
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
                <div class="origin-top-right absolute z-10 left-0 mt-2 w-[220px] max-h-[120px] overflow-y-scroll rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  {workersNameList.map((workersName) => (
                    <div key={workersName.id} class="py-1">
                      <div
                        href="#"
                        onClick={() =>
                          handleWorkerNameClick(
                            workersName.worker_name,
                            workersName.id
                          )
                        }
                        class="block px-4 py-2 text-xs font-semibold cursor-pointer text-[#595858] hover:bg-indigo-100"
                      >
                        {workersName.worker_name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                type="number"
                className={`w-full h-9 py-2 px-8 text-xs border rounded-xl outline-none border-[#9C9C9C] text-[#111010] ${
                  issueWeight === "" && error ? "border-2 border-red-500" : ""
                }`}
                value={issueWeight}
                onChange={(e) => setIssueWeight(e.target.value)}
                placeholder="दीलेला वजन (ग्राम)"
              />
            </div>
            <div className="mb-4 flex justify-center items-center">
              <label
                htmlFor="startDate"
                className={`w-full flex items-center justify-between cursor-pointer text-xs h-9 py-2 px-3 border rounded-xl outline-none border-[#9C9C9C] text-[#111010] ${
                  startDate === "" && error ? "border-2 border-red-500" : ""
                }`}
              >
                प्रारंभची तारीख
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  className="ml-1 border border-black rounded-md px-1 text-[#595858] text-xs font-semibold cursor-pointer"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-4 flex justify-center items-center">
              <label
                htmlFor="endDate"
                className={`w-full flex items-center justify-between cursor-pointer text-xs h-9 py-2 px-3 border rounded-xl outline-none border-[#9C9C9C] text-[#111010] ${
                  endDate === "" && error ? "border-2 border-red-500" : ""
                }`}
              >
                शेवटची तारीख
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  min={startDate}
                  className="ml-1 border border-black rounded-md px-1 text-[#595858] text-xs font-semibold cursor-pointer"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-row space-x-2 m-2">
            <button
              type="submit"
              className="w-full mt-2 rounded-xl bg-[#DF8E51] text-white py-2 transition duration-300"
            >
              आवेदन सादर करा
            </button>

            <button
              onClick={handleCancel}
              className="w-full mt-2 rounded-xl bg-[#DF8E51] text-white py-2 transition duration-300"
            >
              रद्द करा
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateManufacturingOrder;
