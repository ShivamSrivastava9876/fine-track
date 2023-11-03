import { useState } from "react";
import Logo from "../../../public/assets/LOGO.png";
import { useSelector, useDispatch } from "react-redux";
import { loginUserAsync, selectErrorMessage } from "../../redux/slice/login/loginSlice";
import { selectUser } from "../../redux/slice/login/loginSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const errorMessage = useSelector(selectErrorMessage);
  const [usernameEntered, setUsernameEntered] = useState("");
  const [passwordEntered, setPasswordEntered] = useState("");
  const [showErrorBox, setShowErrorBox] = useState(false);

  const hideError = () => {
    
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(usernameEntered, passwordEntered);
    dispatch(
      loginUserAsync({ username: usernameEntered, password: passwordEntered })
    ).then((result) => {
      // Check if createUserAsync was successful
      if (loginUserAsync.fulfilled.match(result)) {
        router.push('/dashboard')
      }
    });
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
        <button
          onClick={hideError}
          className="relative top-0.5 bottom-0 left-1"
        >
          <span className="text-red-500 text-2xl">×</span>
        </button>
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
        className="p-8 rounded shadow-md w-[555px]   "
      >
        <div className="mb-4 space-y-1">
          <h2 className=" text-[#F3D46F] font-normal text-base">ACCOUNT</h2>
        </div>
        <div className="mb-4  ">
          <input
            type="text"
            className="w-full py-2 px-8 border border-[#9C9C9C] rounded-xl outline-none
            bg-[#3E301A] text-[#F3D46F]"
            value={usernameEntered}
            onChange={(e) => setUsernameEntered(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="mb-2 ">
          <input
            type="passwordEntered"
            className="w-full py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] bg-[#3E301A] text-white"
            value={passwordEntered}
            onChange={(e) => setPasswordEntered(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="flex justify-end items-center mb-4 ">
          <Link href="#" className="text-[#ffffff] text-sm hover:underline ">
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-[#DF8E51] text-white py-2 rounded  transition duration-300"
        >
          Login
        </button>
      </form>


    </div>
  );
};

export default Login;
