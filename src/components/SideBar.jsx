import SidebarLogo from "../../public/assets/LOGO.png";
import Image from "next/image";
import DashboardIcon from "../../public/assets/Icons/dashboard_icon.svg";
import UserIcon from "../../public/assets/Icons/user_icon.svg";
import CategoryIcon from "../../public/assets/Icons/category_icon.svg";
import ProductsIcon from "../../public/assets/Icons/products_icon.svg";
import ReportsIcon from "../../public/assets/Icons/reports_icon.svg";
import LogoutIcon from "../../public/assets/Icons/logout_icon.svg";
import OrderIcon from "../../public/assets/Icons/order-ascending.svg";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUserAsync } from "@/redux/slice/login/loginSlice";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry } from '@fortawesome/free-solid-svg-icons';

import { FiMenu, FiX } from 'react-icons/fi';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const SideBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const modalClasses = isSidebarOpen ? 'block' : 'hidden';

  const handleLogout = () => {

    router.push('/login');
    dispatch(logoutUserAsync());
  }

  const handleReportClick = () => {
    setReportVisible(!reportVisible);
  }

  return (
    <>
      <div className={`fixed inset-0 z-40 bg-whitesmoke opacity-80 backdrop-blur-md transition-opacity ${modalClasses}`}></div>
      <button
        className="md:hidden absolute top-4 left-4 p-2 text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FiX size={24} style={{ color: 'black', position: 'fixed', right: 10, top: 5, zIndex: 1002 }} /> : <FiMenu size={24} style={{ color: 'black' }} />}
      </button>
      <div className={`fixed md:static left-0 z-50 top-0 h-full overflow-y-scroll md:overflow-y-auto bg-[#3E301A] w-16.3125 md:translate-x-0 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* <div className="w-16.3125 h-full bg-[#3E301A] z-50"> */}
        {/* Head Component */}
        {/* <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap"
            rel="stylesheet"

          />
        </Head> */}

        {/* Side bar logo */}
        <div className="flex items-center justify-center w-12 h-24 mx-auto mt-4">
          <Image
            src={SidebarLogo}
            alt="logo"
            objectFit="contain"
            objectPosition="center"
          // layout="fill"
          />
        </div>

        <div className="w-full flex flex-col justify-between mt-8">
          <Link
            href="/dashboard"
            className="flex space-x-6 items-center px-6 py-4 relative transition duration-300 ease-in-out 
            hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
            active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
          >
            <Image src={DashboardIcon} alt="dashboard-icon" />

            <span className=" text-base font-montserrat text-blue-200 font-normal ">
              Dashboard
            </span>
          </Link>
          <Link
            href="/users"
            className="flex space-x-6 items-center px-6 py-4 relative transition duration-300 ease-in-out 
            hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
            active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
          >
            <Image src={UserIcon} alt="user-icon" />

            <span className=" text-base text-blue-200 font-normal">Users</span>
          </Link>
          <Link
            href="/category"
            className="flex space-x-6 items-center px-6 py-4 relative transition duration-300 ease-in-out 
            hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
            active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
          >
            <Image src={CategoryIcon} alt="category-icon" />

            <span className=" text-base text-blue-200 font-normal">
              Categories
            </span>
          </Link>
          <Link
            href="/productType"
            className="flex space-x-6 items-center px-6 py-4 relative transition duration-300 ease-in-out 
            hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
            active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
          >
            <Image src={ProductsIcon} alt="products-icon" />
            <span className=" text-base text-blue-200 font-normal">
              Product type
            </span>
          </Link>
          <Link
            href="/products"
            className="flex space-x-6 items-center px-6 py-4 relative transition duration-300 ease-in-out 
            hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
            active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
          >
            <Image src={ProductsIcon} alt="products-icon" />
            <span className=" text-base text-blue-200 font-normal">
              Products
            </span>
          </Link>

          <Link
            href="/orders"
            className="flex space-x-6 items-center px-6 py-4 relative transition duration-300 ease-in-out 
            hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
            active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
          >
            <Image src={OrderIcon} alt="user-icon" />

            <span className=" text-base text-blue-200 font-normal">Orders</span>
          </Link>

          <Link
            href="/workers"
            className="flex space-x-6 items-center px-6 py-4 relative transition duration-300 ease-in-out 
            hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
            active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
          >
            <Image src={UserIcon} alt="user-icon" />

            <span className=" text-base text-blue-200 font-normal">Workers</span>
          </Link>

          <Link
            href="/manufacturingOrders"
            className="flex space-x-6 items-center px-6 py-4 relative transition duration-300 ease-in-out 
            hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
            active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
          >
            <Image src={OrderIcon} alt="products-icon" />
            {/* <FontAwesomeIcon icon={faIndustry} /> */}
            <span className=" text-base text-blue-200 font-normal">Manufacturing</span>
          </Link>

          <div
            onClick={handleReportClick}
            className="flex space-x-6 items-center px-6 py-4 relative cursor-pointer transition duration-300 ease-in-out 
            hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
            active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
          >
            <Image src={ReportsIcon} alt="product-icon" />

            <span className=" text-base text-blue-200 font-normal">
              Reports

            </span>
            <div className="flex justify-start">
              {reportVisible ? <FiChevronDown className="text-blue-200 transition-transform transform rotate-180" /> : <FiChevronDown className="text-blue-200 transition-transform transform rotate-0" />}
            </div>
          </div>


          {/* Sub reports */}
          <div
            className={`relative transition-max-h duration-500 ease-in-out overflow-hidden ${reportVisible ? "" : "h-0"}`}
          >
            <Link
              href="/manufacturingReports"
              className="flex space-x-6 items-center px-6 py-4 relative cursor-pointer transition duration-300 ease-in-out 
              hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
              active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
            >
              {/* <Image src={ReportsIcon} alt="product-icon" /> */}

              <span className=" text-sm text-blue-200 font-normal">
                Manufacturing reports
              </span>
            </Link>
            <Link
              href="/report"
              className="flex space-x-6 items-center px-6 py-4 relative cursor-pointer transition duration-300 ease-in-out 
              hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
              active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
            >
              {/* <Image src={ReportsIcon} alt="product-icon" /> */}

              <span className=" text-sm text-blue-200 font-normal">
                Order reports
              </span>
            </Link>
            <Link
              href=""
              className="flex space-x-6 items-center px-6 py-4 relative cursor-pointer transition duration-300 ease-in-out 
              hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
              active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
            >
              {/* <Image src={ReportsIcon} alt="product-icon" /> */}

              <span className=" text-sm text-blue-200 font-normal">
                Product reports
              </span>
            </Link>
            <Link
              href=""
              className="flex space-x-6 items-center px-6 py-4 relative cursor-pointer transition duration-300 ease-in-out 
              hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
              active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
            >
              {/* <Image src={ReportsIcon} alt="product-icon" /> */}

              <span className=" text-sm text-blue-200 font-normal">
                User reports
              </span>
            </Link>
            <Link
              href="/workerReports"
              className="flex space-x-6 items-center px-6 py-4 relative cursor-pointer transition duration-300 ease-in-out 
              hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white 
              active:bg-blue-200 active:bg-opacity-20 active:border-l-4 focus:bg-blue-200 focus:bg-opacity-20 focus:border-l-4"
            >
              {/* <Image src={ReportsIcon} alt="product-icon" /> */}

              <span className=" text-sm text-blue-200 font-normal">
                Worker reports
              </span>
            </Link>
          </div>

          <div onClick={handleLogout} className="flex space-x-6 items-center px-6 py-4 relative transition duration-300 ease-in-out hover:bg-blue-200 hover:bg-opacity-20 hover:border-l-4 border-white cursor-pointer ">
            <Image src={LogoutIcon} alt="logout-icon" />

            <span className=" text-base text-blue-200 font-normal">Logout</span>
          </div>
        </div>
      </div>

    </>
  );
};

export default SideBar;
