import React from "react";
import Image from "next/image";
import UserIcon from "../../public/assets/Icons/user_icon.svg";
import Link from "next/link";

const DashboardData = () => {
  return (
    <div className="mt-2 mb-8">
      <h1 className="my-2 font-bold">Dashboard</h1>
      <div id="dashboardDataFields" className="grid grid-cols-4 gap-4">
        <Link href="/users"
          id="totalUsers"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={UserIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">Total users</span>
            <span id="data" className="font-bold ">
              560K
            </span>
          </div>
        </Link>
        <div
          id="newOrders"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={UserIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">New orders</span>
            <span id="data" className="font-bold ">
              60
            </span>
          </div>
        </div>
        <div
          id="confirmOrders"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={UserIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">Confirm Orders</span>
            <span id="data" className="font-bold ">
              560K
            </span>
          </div>
        </div>
        <div
          id="pickupOrder"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={UserIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">Pickup order</span>
            <span id="data" className="font-bold ">
              60
            </span>
          </div>
        </div>

        <div
          id="onTheWay"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={UserIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">On the way</span>
            <span id="data" className="font-bold ">
              560K
            </span>
          </div>
        </div>
        <div
          id="deliverdOrder"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={UserIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">Deliverd orders</span>
            <span id="data" className="font-bold ">
              560K
            </span>
          </div>
        </div>
        <div
          id="cancelledOrders"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={UserIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">Cancelled orders</span>
            <span id="data" className="font-bold ">
              560K
            </span>
          </div>
        </div>
        <div
          id="pendingOrders"
          className="flex w-17.0125 h-24 px-4 py-2 bg-white border border-gray-300 rounded-2xl focus:outline-none outline-none hover:bg-gray-100"
        >
          <div id="img" className="flex justify-center w-1/3">
            <Image src={UserIcon} alt="user-icon" className="w-8" />
          </div>
          <div id="details" className="flex flex-col mx-2 my-2">
            <span className="">Pending orders</span>
            <span id="data" className="font-bold ">
              560K
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardData;
