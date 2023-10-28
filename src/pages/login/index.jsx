import { useState } from "react";
import Logo from "../../../public/assets/LOGO.png";
import { useSelector, useDispatch } from 'react-redux';
import { loginUserAsync } from '../../redux/slice/login/loginSlice';
import { selectUser } from '../../redux/slice/login/loginSlice';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [usernameEntered, setUsernameEntered] = useState("");
  const [passwordEntered, setPasswordEntered] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(usernameEntered, passwordEntered);
    dispatch(loginUserAsync({username: usernameEntered, password: passwordEntered}))
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#3E301A]">
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
            placeholder="User Name"
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
