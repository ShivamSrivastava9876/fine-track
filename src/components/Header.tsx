import ProfilePhoto from "../../public/assets/profile-photo.jpg";
import Image from "next/image";
import SearchIcon from "../../public/assets/Icons/searchIcon.svg";

const Header = () => {
  return (
    <div className="w-full bg-white h-20 p-4 flex justify-center items-center shadow-md">
      <div className="text-2xl font-bold text-black">
        <h2>नमस्कार प्रशासक</h2>
      </div>

      {/* <div className="flex w-2/5 justify-end">
        <div className="flex justify-center items-center rounded-full">
          <Image
            src={ProfilePhoto}
            alt="profile-photo"
            className="rounded-full w-50 h-50"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Header;
