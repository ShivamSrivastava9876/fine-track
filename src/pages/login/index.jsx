import { useEffect, useState } from "react";
import Logo from "../../../public/assets/LOGO.png";
import AndroidLogo from "../../../public/assets/android_logo.png";
import { useSelector, useDispatch } from "react-redux";
import { apkDownloadAsync, loginUserAsync, selectApkLink, selectErrorMessage } from "../../redux/slice/login/loginSlice";
import { selectUser } from "../../redux/slice/login/loginSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useMediaQuery } from "react-responsive";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const errorMessage = useSelector(selectErrorMessage);
  const [usernameEntered, setUsernameEntered] = useState("");
  const [passwordEntered, setPasswordEntered] = useState("");
  const [showErrorBox, setShowErrorBox] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const apk = useSelector(selectApkLink);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const hideError = () => {

  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      loginUserAsync({ username: usernameEntered, password: passwordEntered })
    ).then((result) => {
      // Check if createUserAsync was successful
      if (loginUserAsync.fulfilled.match(result)) {
        router.push('/dashboard')
      }
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-[#3E301A]">
      {/* error */}
      {errorMessage && (<div
        className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="ml-2"> {errorMessage}</span>
        {/* <button
          onClick={hideError}
          className="relative top-0.5 bottom-0 left-1"
        >
          <span className="text-red-500 text-2xl">×</span>
        </button> */}
      </div>)}
      <div className="flex items-center justify-center w-[134px] h-[230px] mx-auto mt-4">
        <Image
          src={Logo}
          alt="logo"
          objectFit="contain"
          objectPosition="center"
        // layout="fill"
        />
      </div>

      <form
        onSubmit={handleLogin}
        className="p-8 rounded md:w-[555px]   "
      >
        <div className="mb-4 space-y-1">
          <h2 className=" text-[#F3D46F] font-normal text-base">ACCOUNT</h2>
        </div>
        <div className="mb-2 md:h-3.3125 relative">
          <input
            type="text"
            className="w-full h-full py-2 px-8 border border-[#9C9C9C] rounded-xl outline-none
            bg-[#3E301A] text-[#F3D46F]"
            value={usernameEntered}
            onChange={(e) => setUsernameEntered(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="mb-2 md:h-3.3125 relative">
          <input
            type={passwordVisible ? "text" : "password"}
            className="w-full h-full py-2 px-8 border border-[#9C9C9C] rounded-xl outline-none
            bg-[#3E301A] text-[#F3D46F]"
            value={passwordEntered}
            onChange={(e) => setPasswordEntered(e.target.value)}
            placeholder="Password"
          />
          <button
            type="button"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <EyeOffIcon className="w-6 h-6 text-gray-400" />
            ) : (
              <EyeIcon className="w-6 h-6 text-gray-400" />
            )}
          </button>
        </div>
        {/* <div className="flex justify-end items-center mb-4 ">
          <Link href="#" className="text-[#ffffff] text-sm hover:underline ">
            Forgot Password?
          </Link>
        </div> */}
        <button
          type="submit"
          className="w-full mt-4 hover:bg-[#96653d] bg-[#DF8E51] text-white py-2 rounded  transition duration-300"
        >
          Login
        </button>
      </form>
      <Link href="/termsAndConditions" id="termsAndConditions" className="absolute bottom-4 text-[#F3D46F] text-sm">
        <div>Terms and conditions*</div>
      </Link>
      {apk && <Link href={apk} className="fixed bottom-4 right-5 h-20 w-20 md:w-21.375 rounded-full hover:bg-slate-900 bg-black text-white flex items-center justify-center">
        <div className="flex items-center justify-center md:ml-2 mb-4 md:w-1/4 h-4/5 mx-auto mt-4">
          <Image
            src={AndroidLogo}
            alt="logo"
            objectFit="contain"
            objectPosition="center"
            className="h-full"
          // layout="fill"
          />
        </div>
        {!isMobile && <div className="md:w-3/4 flex justify-center m-1 ml-4 font-medium text-white">
          <h1>Click here to download the mangalam jewellers android app</h1>
        </div>}
      </Link>}


    </div>
  );
};

export default Login;
