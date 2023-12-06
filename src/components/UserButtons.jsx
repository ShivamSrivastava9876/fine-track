// components/UserComponent.js
import { ReactNode, useState } from "react";
import Image from "next/image";
import SearchIcon from "../../public/assets/Icons/searchIcon.svg";
import { useDispatch } from "react-redux";
import { searchUserAsync, userDetailsAsync } from "@/redux/slice/user/userSlice";
import { Link as ScrollLink } from 'react-scroll';
import Link from "next/link";

const UserComponent = ({
  addUser,
  setAddUser,
}) => {

  const dispatch = useDispatch();
  const [searchParameter, setSearchParameter] = useState("");

  const handleAddUser = () => {
    setAddUser(!addUser);
  };

  const handleUserSearch = (e) => {
    e.preventDefault();
    console.log("search is working", searchParameter)
    dispatch(searchUserAsync(searchParameter)).then((result) => {
      if (searchUserAsync.fulfilled.match(result)) {
        // dispatch(searchUserAsync(searchParameter))
        // setSearchParameter("");
      }
    })
  }

  const handleSearchParameter = (searchParameter) => {
    setSearchParameter(searchParameter);
  }

  return (
    <div className="flex items-center justify-between flex-wrap w-full mb-8">
      {/* User Title */}
      <h1 className="text-2xl mx-2 m-2 font-bold">Users</h1>

      <div className="flex flex-row flex-wrap">
        {/* Right-hand side Buttons */}
        <div className="flex items-center mx-2 space-x-4 relative">
          {/* Button 1 */}
          {/* <button className="flex items-center px-4 py-2 bg-white text-[#344054] rounded-xl border border-[#D0D5DD] shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
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
          Filters
        </button> */}

          {/* Button 2 */}
          <Link
            href="#addUser">
            {/* to="addUser"
            smooth={true}
            duration={500}> */}
            <button
              className={`flex items-center px-4 py-2 bg-[#DB8A4D] text-white rounded-full shadow transition-transform duration-300 transform ${addUser ? 'invisible' : ''
                }`}
              onClick={handleAddUser}
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add user
            </button>
          </Link>
        </div>

        {/* Right-hand side Search Box */}
        <form onSubmit={(e) => handleUserSearch(e)} className="flex items-center w-80 border-2 m-2 border-solid border-gray-300 rounded-full px-4 py-2">
          <input
            type="search"
            placeholder="Search"
            value={searchParameter}
            onChange={(e) => handleSearchParameter(e.target.value)}
            className="w-full h-full outline-none bg-transparent text-blue-gray-700"
          />
          <div className="ml-2">
            <Image
              onClick={handleUserSearch}
              src={SearchIcon}
              alt="search-icon"
              className="cursor-pointer"
            />
          </div>
          {/* <input type="submit"></input> */}
        </form>
      </div>
    </div>
  );
};

export default UserComponent;
