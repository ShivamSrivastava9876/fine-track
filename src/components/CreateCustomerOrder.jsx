import {
  getCategoriesAsync,
  getCategoryList,
} from "@/redux/slice/category/categorySlice";
import {
  createProductAsync,
  getProductAsync,
} from "@/redux/slice/product/productSlice";
import { getProductTypeList } from "@/redux/slice/productType/productTypeSlice";
import {
  getManugfacturingProductListAsync,
  getManufacturingProductList,
  getManugfacturingUserListAsync,
  getManufacturingUserList,
  createManugfacturingOrderAsync,
  getManufacturingOrderListAsync,
} from "../redux/slice/manufacturing/manufacturingSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiImage } from "react-icons/fi";
import {
  createOrderAsync,
  getOrderListAsync,
  updatePreviousBalanceOfCustomerAsync,
} from "@/redux/slice/order/orderSlice";
import { selectUserData, userDetailsAsync } from "@/redux/slice/user/userSlice";

const CreateCustomerOrder = ({ createOrder, setCreateOrder }) => {
  const dispatch = useDispatch();

  const [goldRate, setGoldRate] = useState("");
  const [user, setUser] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [product, setProduct] = useState("");
  const [prevBalanceFine, setPrevBalanceFine] = useState("");
  const [updatedPrevBalanceFine, setUpdatedPrevBalanceFine] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalFine, setTotalFine] = useState("");
  const [receivedFineFromCustomer, setReceivedFineFromCustomer] = useState("");
  const [totalFineFromCustomer, setTotalFineFromCustomer] = useState("");
  const [remainingCash, setRemainingCash] = useState("");
  const [receivedCashFromCustomer, setReceivedCashFromCustomer] = useState("");
  const [makingCharges, setMakingCharges] = useState("");
  const [balancePending, setBalancePending] = useState("");
  const [remark, setRemark] = useState("");

  const [error, setError] = useState(false);
  const [formatError, setFormatError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openProductList, setOpenProductList] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  useEffect(() => {
    if (weight !== "" && quantity !== "") {
      let calculatedTotalFine = parseFloat(weight) * parseFloat(quantity);
      console.log("calculatedTotalFine", calculatedTotalFine);
      setTotalFine(calculatedTotalFine);
    } else {
      setTotalFine("");
    }
  }, [weight, quantity]);

  useEffect(() => {
    if (
      totalFine !== "" &&
      receivedFineFromCustomer !== "" &&
      goldRate !== "" &&
      prevBalanceFine !== ""
    ) {
      let calculatedFineFromCustomer =
        parseFloat(receivedFineFromCustomer) + parseFloat(prevBalanceFine);
      console.log("calculatedFineFromCustomer", calculatedFineFromCustomer);
      if (parseFloat(totalFine) < parseFloat(calculatedFineFromCustomer)) {
        let calculatedPrevBalanceFine =
          parseFloat(calculatedFineFromCustomer) - parseFloat(totalFine);
        setUpdatedPrevBalanceFine(calculatedPrevBalanceFine);
        setTotalFineFromCustomer(totalFine);
      } else {
        let calculatedRemainingCashRequired =
          (parseFloat(totalFine) - parseFloat(calculatedFineFromCustomer)) *
          parseFloat(goldRate);
        setRemainingCash(calculatedRemainingCashRequired);
        setUpdatedPrevBalanceFine("0");
      }
    } else {
      setRemainingCash("");
    }
  }, [totalFine, receivedFineFromCustomer, goldRate, prevBalanceFine]);

  useEffect(() => {
    if (
      remainingCash !== "" &&
      receivedCashFromCustomer !== "" &&
      makingCharges !== ""
    ) {
      let calculatedBalance =
        parseFloat(remainingCash) -
        parseFloat(receivedCashFromCustomer) +
        parseFloat(makingCharges);
      setBalancePending(calculatedBalance);
    } else {
      setBalancePending("");
    }
  }, [remainingCash, receivedCashFromCustomer, makingCharges]);

  useEffect(() => {
    dispatch(getManugfacturingProductListAsync());
    dispatch(userDetailsAsync());
  }, [dispatch]);
  const productList = useSelector(getManufacturingProductList);
  const userList = useSelector(selectUserData)[0];

  const handleClose = () => {
    setCreateOrder(!createOrder);
  };

  const handleManufacturingOrderSubmit = (e) => {
    if (
      product !== "" &&
      user !== "" &&
      goldRate !== "" &&
      weight !== "" &&
      quantity !== "" &&
      totalFine !== "" &&
      receivedFineFromCustomer !== "" &&
      remainingCash !== "" &&
      receivedCashFromCustomer !== "" &&
      makingCharges !== "" &&
      balancePending !== ""
    ) {
      e.preventDefault();

      //creating order of customer
      dispatch(
        createOrderAsync({
          customer: user,
          product: product,
          today_gold_rate: goldRate,
          metal_weight: weight,
          size: size,
          fine_required: totalFine,
          received_fine: receivedFineFromCustomer,
          received_cash: receivedCashFromCustomer,
          remainig_cash_required: remainingCash,
          making_charges: makingCharges,
          pending_balance: balancePending,
          quantity,
          remark,
          previous_balance_fine: prevBalanceFine,
        })
      ).then((result) => {
        if (createOrderAsync.fulfilled.match(result)) {
          dispatch(getOrderListAsync());
          setProduct("");
          setUser("");
          setGoldRate("");
          setPrevBalanceFine("");
          setUpdatedPrevBalanceFine("");
          setWeight("");
          setSize("");
          setQuantity("");
          setTotalFine("");
          setReceivedFineFromCustomer("");
          setTotalFineFromCustomer("");
          setRemainingCash("");
          setReceivedCashFromCustomer("");
          setMakingCharges("");
          setBalancePending("");
          setRemark("");

          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        }
      });

      dispatch(
        updatePreviousBalanceOfCustomerAsync({
          balance_fine: updatedPrevBalanceFine,
          customerId,
        })
      ).then((result) => {
        if (createOrderAsync.fulfilled.match(result)) {
          setUpdatedPrevBalanceFine("");
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

  const handleProductList = () => {
    setOpenProductList(!openProductList);
    setOpenUser(false);
  };

  const handleProductClick = (option) => {
    setProduct(option);
    setOpenProductList(!openProductList);
  };

  const handleUser = () => {
    setOpenProductList(false);
    setOpenUser(!openUser);
  };

  const handleUserClick = (option, balance, customerId) => {
    setUser(option);
    setPrevBalanceFine(balance);
    setCustomerId(customerId);
    setOpenUser(!openUser);
  };

  const hideError = () => {
    setError(false);
  };

  const hideFormatError = () => {
    setFormatError(false);
  };

  const hideSuccess = () => {
    setSuccess(false);
  };

  return (
    <>
      {error && (
        <div
          // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
          className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
          role="alert"
          style={{ zIndex: 1000 }}
        >
          <strong className="font-bold">
            Error! Please fill all required fields
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
          <strong className="font-bold">Order added successfully</strong>
          <button
            onClick={hideSuccess}
            className="relative top-0.5 bottom-0 left-1"
          >
            <span className="text-green-500 text-2xl">×</span>
          </button>
        </div>
      )}
      <div
        id="createCustomerOrder"
        className="relative flex flex-col items-center rounded shadow-md w-full h-34.3125 bg-white mt-1.375"
      >
        <button
          className="absolute top-2 right-1 p-0.5 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
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
        <div
          id="formTitle"
          className="w-52 h-4 m-4 font-bold text-base text-center text-25"
        >
          Create customer order
        </div>
        <div id="formFields" className="">
          <form
            onSubmit={handleManufacturingOrderSubmit}
            className="p-8 flex flex-col items-center w-35rem h-28rem bg-white"
          >
            <div id="textFields" className="grid md:grid-cols-2 gap-4">
              <div
                onClick={handleProductList}
                class={`relative inline-block cursor-pointer text-left mb-2 ${
                  product === "" && error ? "border-2 border-red-500" : ""
                }`}
              >
                <div class="inline-flex items-center justify-center px-4 py-2 text-xs md:text-sm font-semibold w-full h-3.3125 rounded-xl border border-gray-300 shadow-sm bg-white text-[#595858] hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                  {product || "Select product"}
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

                {openProductList && (
                  <div class="origin-top-right absolute z-30 right-16 mt-2 w-[220px] max-h-[150px] overflow-y-scroll rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    {productList.map((product) => (
                      <div key={product.product_name} class="py-1">
                        <div
                          href="#"
                          onClick={() =>
                            handleProductClick(product.product_name)
                          }
                          class="block px-4 py-2 text-xs md:text-sm font-semibold cursor-pointer text-[#595858] hover:bg-indigo-100"
                        >
                          {product.product_name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                onClick={handleUser}
                class={`relative inline-block cursor-pointer text-left mb-2 ${
                  user === "" && error ? "border-2 border-red-500" : ""
                }`}
              >
                <div class="inline-flex items-center justify-center text-xs md:text-sm font-semibold px-4 py-2 w-full h-3.3125 rounded-xl border border-gray-300 shadow-sm bg-white text-[#595858] hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                  {user || "Select customer"}
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
                          onClick={() =>
                            handleUserClick(
                              user.email,
                              user.balance_fine,
                              user.id
                            )
                          }
                          class="block px-4 py-2 text-xs md:text-sm font-semibold cursor-pointer text-[#595858] hover:bg-indigo-100"
                        >
                          {user.email}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                className={`mb-4 md:w-21.375 ${
                  prevBalanceFine === "" && error
                    ? "border-2 border-red-500"
                    : ""
                }`}
              >
                <input
                  type="number"
                  disabled={true}
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={prevBalanceFine}
                  onChange={(e) => setPrevBalanceFine(e.target.value)}
                  placeholder="Previous balance fine"
                />
              </div>

              <div
                className={`mb-4 md:w-21.375 ${
                  goldRate === "" && error ? "border-2 border-red-500" : ""
                }`}
              >
                <input
                  type="number"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={goldRate}
                  onChange={(e) => setGoldRate(e.target.value)}
                  placeholder="Today's 24k gold rate per gm"
                />
              </div>

              <div
                className={`mb-4 md:w-21.375 ${
                  weight === "" && error ? "border-2 border-red-500" : ""
                }`}
              >
                <input
                  type="number"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#595858]"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Weight (gm)"
                />
              </div>

              <div className={`mb-4 md:w-21.375`}>
                <input
                  type="number"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#595858]"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="Size"
                />
              </div>

              <div
                className={`mb-4 md:w-21.375 ${
                  quantity === "" && error ? "border-2 border-red-500" : ""
                }`}
              >
                <input
                  type="number"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#595858]"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                />
              </div>

              <div
                className={`mb-4 md:w-21.375 ${
                  totalFine === "" && error ? "border-2 border-red-500" : ""
                }`}
              >
                <input
                  type="number"
                  disabled={true}
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#595858]"
                  value={totalFine}
                  onChange={(e) => setTotalFine(e.target.value)}
                  placeholder="Total fine required"
                />
              </div>

              <div
                className={`mb-4 md:w-21.375 ${
                  receivedFineFromCustomer === "" && error
                    ? "border-2 border-red-500"
                    : ""
                }`}
              >
                <input
                  type="number"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#595858]"
                  value={receivedFineFromCustomer}
                  onChange={(e) => setReceivedFineFromCustomer(e.target.value)}
                  placeholder="Received fine from customer"
                />
              </div>

              <div
                className={`mb-4 md:w-21.375 ${
                  remainingCash === "" && error ? "border-2 border-red-500" : ""
                }`}
              >
                <input
                  type="number"
                  disabled={true}
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#595858]"
                  value={remainingCash}
                  onChange={(e) => setRemainingCash(e.target.value)}
                  placeholder="Remaining cash"
                />
              </div>

              <div
                className={`mb-4 md:w-21.375 ${
                  receivedCashFromCustomer === "" && error
                    ? "border-2 border-red-500"
                    : ""
                }`}
              >
                <input
                  type="number"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#595858]"
                  value={receivedCashFromCustomer}
                  onChange={(e) => setReceivedCashFromCustomer(e.target.value)}
                  placeholder="Received cash from customer"
                />
              </div>

              <div
                className={`mb-4 md:w-21.375 ${
                  makingCharges === "" && error ? "border-2 border-red-500" : ""
                }`}
              >
                <input
                  type="number"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#595858]"
                  value={makingCharges}
                  onChange={(e) => setMakingCharges(e.target.value)}
                  placeholder="Making charges"
                />
              </div>

              <div
                className={`mb-4 md:w-21.375 ${
                  balancePending === "" && error
                    ? "border-2 border-red-500"
                    : ""
                }`}
              >
                <input
                  type="number"
                  disabled={true}
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#595858]"
                  value={balancePending}
                  onChange={(e) => setBalancePending(e.target.value)}
                  placeholder="Balance pending"
                />
              </div>

              <div className={`mb-4 md:w-21.375`}>
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#595858]"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Remark"
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

export default CreateCustomerOrder;
