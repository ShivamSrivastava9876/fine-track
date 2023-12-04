import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import {
  createUserAsync,
  userDetailsAsync,
} from "@/redux/slice/user/userSlice";

const AddUser = ({ addUser, setAddUser }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setMessage("");
      dispatch(
        createUserAsync({
          first_name: firstName,
          last_name: lastName,
          email: email,
          mobile: mobileNo,
          password: password,
        })
      ).then((result) => {
        // Check if createUserAsync was successful
        if (createUserAsync.fulfilled.match(result)) {
          // Dispatch userDetailsAsync only if user creation is successful
          dispatch(userDetailsAsync());

          // Clearing the form fields by updating state variables to empty values
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setConfirmPassword("");
        }
      });
    } else {
      setMessage("Password does not match");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleClose = () => {
    setAddUser(!addUser);
  };

  return (
    <div className="flex justify-center m-8 relative">

      <form
        onSubmit={handleAddUser}
        className="p-8 shadow-md flex flex-col items-center justify-center rounded-2xl w-34.125 bg-white"
      >
        <button
          className="absolute top-2 right-0 md:right-0 md:p-0.5 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
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
        <div className="mb-4 space-y-1">
          <h2 className=" text-[#0a0a0a] text-center font-normal text-base text-16px w-161">
            User Details
          </h2>
        </div>
        <div className="mb-4 w-21.375 h-3.3125">
          <input
            type="text"
            className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
          />
        </div>
        <div className="mb-4 w-21.375 h-3.3125">
          <input
            type="text"
            className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
          />
        </div>
        <div className="mb-4 w-21.375 h-3.3125">
          <input
            type="text"
            className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="mb-4 w-21.375 h-3.3125">
          <input
            type="text"
            className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            placeholder="Mobile number"
          />
        </div>
        <div className="mb-4 w-21.375 h-3.3125 relative">
          <input
            type={passwordVisible ? "text" : "password"}
            className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <div className="mb-4 w-21.375 h-3.3125 relative">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
          <button
            type="button"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none"
            onClick={toggleConfirmPasswordVisibility}
          >
            {confirmPasswordVisible ? (
              <EyeOffIcon className="w-6 h-6 text-gray-400" />
            ) : (
              <EyeIcon className="w-6 h-6 text-gray-400" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-21.375 h-3.3125 rounded-xl bg-[#DF8E51] text-white py-2 transition duration-300"
        >
          Add
        </button>
        {message === "Password does not match" && (
          <span className="text-red-500">Password does not match</span>
        )}
      </form>
    </div>
  );
};

export default AddUser;
