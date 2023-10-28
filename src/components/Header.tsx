import ProfilePhoto from "../../public/assets/profile-photo.jpg";
import Image from "next/image";
import SearchIcon from "../../public/assets/Icons/searchIcon.svg";

const Header = () => {
  return (
    <div className="w-full bg-white h-20 p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-medium text-black">
        <h2>Hello John!</h2>
      </div>

      <div className="flex items-center w-96 border-2 border-solid border-gray-300 rounded-full px-4 py-2">
        <input
          type="search"
          placeholder="Search"
          className="w-full h-full outline-none bg-transparent text-blue-gray-700"
        />
        <div className="ml-2">
          <Image
            src={SearchIcon}
            alt="search-icon"
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="rounded-full">
        <Image
          src={ProfilePhoto}
          alt="profile-photo"
          className="rounded-full "
        />
      </div>
    </div>
  );
};

export default Header;
