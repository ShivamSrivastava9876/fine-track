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
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (password !== "" && confirmPassword !== "" && firstName !== "" && lastName !== "" && mobileNo !== "" && email !== "") {
      if (password === confirmPassword) {
        // setMessage("Password does not match")
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
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 3000)
          }
        });
      }
      else {
        setMessage("Password does not match")
      }
    }
    else {
      e.preventDefault();
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000)
    }
  };

  const hideError = () => {
    setError(false);
  };

  const hideSuccess = () => {
    setSuccess(false);
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
    <>
      {error && <div
        // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
        className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
        role="alert"
        style={{ zIndex: 1000 }}
      >
        <strong className="font-bold">Error! Please fill all required fields</strong>
        <button
          onClick={hideError}
          className="relative top-0.5 bottom-0 left-1"
        >
          <span className="text-red-500 text-2xl">×</span>
        </button>
      </div>}
      {success && <div
        // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
        className="bg-green-100 flex justify-between items-center border border-green-400 text-green-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
        role="success"
        style={{ zIndex: 1001 }}
      >
        <strong className="font-bold">User added successfully</strong>
        <button
          onClick={hideSuccess}
          className="relative top-0.5 bottom-0 left-1"
        >
          <span className="text-green-500 text-2xl">×</span>
        </button>
      </div>}
      <div id="addUser" className="flex justify-center m-8 relative">

        <form
          onSubmit={handleAddUser}
          className="p-8 shadow-md flex flex-col items-center justify-center rounded-2xl w-34.125 bg-white"
        >
          <button
            className="absolute top-1 right-2 md:right-4 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
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
            <h2 className=" text-[#0a0a0a] text-center font-bold text-base text-16px w-161">
              Add user
            </h2>
          </div>
          <div className={`mb-4 md:w-21.375 ${firstName === '' && error ? 'border-2 border-red-500' : ''}`}>
            <input
              type="text"
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
          </div>
          <div className={`mb-4 md:w-21.375 ${lastName === '' && error ? 'border-2 border-red-500' : ''}`}>
            <input
              type="text"
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </div>
          <div className={`mb-4 md:w-21.375 ${email === '' && error ? 'border-2 border-red-500' : ''}`}>
            <input
              type="text"
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className={`mb-4 md:w-21.375 ${mobileNo === '' && error ? 'border-2 border-red-500' : ''}`}>
            <input
              type="text"
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              placeholder="Mobile number"
            />
          </div>
          <div className={`mb-4 md:w-21.375 relative ${password === '' && error ? 'border-2 border-red-500' : ''}`}>
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
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
          <div className={`mb-4 md:w-21.375 relative ${confirmPassword === '' && error ? 'border-2 border-red-500' : ''}`}>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
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
            className="rounded-xl bg-[#DF8E51] h-3.3125 w-10.0625 md:w-21.375 m-4 text-white py-2 transition duration-300"
          >
            Add
          </button>
          {message === "Password does not match" && (
            <span className="text-red-500 font-bold">{message}</span>
          )}
        </form>
      </div>
    </>
  );
};

export default AddUser;
