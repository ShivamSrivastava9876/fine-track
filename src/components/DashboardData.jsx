import React, {useEffect} from "react";
import Image from "next/image";
import UserIcon from "../../public/assets/Icons/user_icon.svg";
import OrderIcon from "../../public/assets/Icons/order-ascendingBlack.svg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData, getDashboardDetailsAsync } from "@/redux/slice/order/orderSlice";

const DashboardData = () => {
  const dispatch = useDispatch();

  const dashboardDetails = useSelector(getDashboardData);

  useEffect(() => {
    dispatch(getDashboardDetailsAsync())
  }, [dispatch])

  return (
    <div className="mt-2 mb-8">
      <h1 className="text-2xl mx-2 my-2 font-bold">Dashboard</h1>
      <div id="dashboardDataFields" className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link href="/users"
          id="totalUsers"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={UserIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">Total users</span>
            <span id="data" className="font-bold">
              {dashboardDetails?.all_users}
            </span>
          </div>
        </Link>

        <div
          id="newOrders"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={OrderIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">New orders</span>
            <span id="data" className="font-bold ">
              {dashboardDetails?.new_orders}
            </span>
          </div>
        </div>

        <Link
          href="/confirmOrders"
          id="confirmOrders"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={OrderIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">Confirm orders</span>
            <span id="data" className="font-bold ">
            {dashboardDetails?.confirm_order}
            </span>
          </div>
        </Link>
        
        <Link
        href="/deliveredOrders"
          id="deliverdOrder"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={OrderIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">Deliverd orders</span>
            <span id="data" className="font-bold ">
            {dashboardDetails?.delivered_order}
            </span>
          </div>
        </Link>

        <Link
        href="/cancelledOrders"
          id="cancelledOrders"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={OrderIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">Cancelled orders</span>
            <span id="data" className="font-bold ">
            {dashboardDetails?.cancelled_order}
            </span>
          </div>
        </Link>

        <Link
        href="/declinedOrders"
          id="declinedOrders"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={OrderIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">Declined orders</span>
            <span id="data" className="font-bold ">
            {dashboardDetails?.decline_order}
            </span>
          </div>
        </Link>

        <Link
        href="/liveManufacturingOrders"
          id="manufacturingOrders"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={OrderIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">Manufacturing orders</span>
            <span id="data" className="font-bold ">
            {dashboardDetails?.manufacring_count}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardData;
