import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import {
  createUserAsync,
  userDetailsAsync,
} from "@/redux/slice/user/userSlice";

const AddUser = ({ addUser, setAddUser }) => {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [alternateContactNo, setAlternateContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [remark, setRemark] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (
      fullName !== "" &&
      businessName !== "" &&
      email !== "" &&
      contactNo !== "" &&
      address !== "" &&
      shippingAddress !== ""
    ) {
      dispatch(
        createUserAsync({
          full_name: fullName,
          bussiness_name: businessName,
          email: email,
          contact_no: contactNo,
          alternate_contact_no: alternateContactNo,
          address: address,
          shipping_address: shippingAddress,
          remark: remark,
        })
      ).then((result) => {
        // Check if createUserAsync was successful
        if (createUserAsync.fulfilled.match(result)) {
          // Dispatch userDetailsAsync only if user creation is successful
          dispatch(userDetailsAsync());

          // Clearing the form fields by updating state variables to empty values
          setFullName("");
          setBusinessName("");
          setEmail("");
          setContactNo("");
          setAlternateContactNo("");
          setAddress("");
          setShippingAddress("");
          setRemark("");
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        }
      });
    } else {
      e.preventDefault();
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
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
      {error && (
        <div
          // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
          className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
          role="alert"
          style={{ zIndex: 1000 }}
        >
          <strong className="font-bold">
          कृपया सर्व आवश्यक फील्ड भरा
          </strong>
          <button
            onClick={hideError}
            className="relative top-0.5 bottom-0 left-1"
          >
            <span className="text-red-500 text-2xl">×</span>
          </button>
        </div>
      )}
      {success && (
        <div
          // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
          className="bg-green-100 flex justify-between items-center border border-green-400 text-green-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
          role="success"
          style={{ zIndex: 1001 }}
        >
          <strong className="font-bold">ग्राहक ऐड झाले</strong>
          <button
            onClick={hideSuccess}
            className="relative top-0.5 bottom-0 left-1"
          >
            <span className="text-green-500 text-2xl">×</span>
          </button>
        </div>
      )}
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
            नवीन ग्राहक ऐड करा  
            </h2>
          </div>
          <div
            className={`mb-4 md:w-21.375 ${
              fullName === "" && error ? "border-2 border-red-500" : ""
            }`}
          >
            <input
              type="text"
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="पूर्ण नाव"
            />
          </div>
          <div
            className={`mb-4 md:w-21.375 ${
              businessName === "" && error ? "border-2 border-red-500" : ""
            }`}
          >
            <input
              type="text"
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="व्यवसायाचे नाव"
            />
          </div>
          <div
            className={`mb-4 md:w-21.375 ${
              email === "" && error ? "border-2 border-red-500" : ""
            }`}
          >
            <input
              type="text"
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ईमेल"
            />
          </div>
          <div
            className={`mb-4 md:w-21.375 ${
              contactNo === "" && error ? "border-2 border-red-500" : ""
            }`}
          >
            <input
              type="text"
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              placeholder="संपर्क क्रमांक"
            />
          </div>
          <div className={`mb-4 md:w-21.375`}>
            <input
              type="text"
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              value={alternateContactNo}
              onChange={(e) => setAlternateContactNo(e.target.value)}
              placeholder="पर्यायी संपर्क क्रमांक"
            />
          </div>
          <div
            className={`mb-4 md:w-21.375 ${
              address === "" && error ? "border-2 border-red-500" : ""
            }`}
          >
            <input
              type="text"
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="पत्ता"
            />
          </div>
          <div
            className={`mb-4 md:w-21.375 ${
              shippingAddress === "" && error ? "border-2 border-red-500" : ""
            }`}
          >
            <input
              type="text"
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="शिपिंग पत्ता"
            />
          </div>
          <div className={`mb-4 md:w-21.375`}>
            <input
              type="text"
              className="w-full h-3.3125 py-2 px-6 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="शेरा"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-[#DF8E51] h-3.3125 w-10.0625 md:w-21.375 m-4 text-white py-2 transition duration-300"
          >
            ऐड करा 
          </button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
