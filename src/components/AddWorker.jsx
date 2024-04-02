import { createWorkerAsync, getWorkerAsync, getWorkerError } from "@/redux/slice/worker/workerSlice";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiImage } from 'react-icons/fi';
import InputBox from './InputBox';
import AddIcon from "../../public/assets/Icons/add.svg";
import Image from "next/image";

const AddProduct = ({ addWorker, setAddWorker }) => {
  const dispatch = useDispatch();
  const workerListError = useSelector(getWorkerError);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState(false);
  const [workerErrorMessage, setWorkerErrorMessage] = useState(false);
  const [errorAfterSubmit, setErrorAfterSubmit] = useState(null);
  const [success, setSuccess] = useState(false);

  const [isInitialRender, setIsInitialRender] = useState(false);

  const handleClose = () => {
    setAddWorker(!addWorker);
  };

  useEffect(() => {
    const updatedError = workerListError?.error
    setErrorAfterSubmit(updatedError);
  }, [workerListError])

  useEffect(() => {
    if (isInitialRender) {
      // This block will not run during the initial render
      if (workerListError === null) {
        dispatch(getWorkerAsync());
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobile("");
        setZipcode("");
        setCity("");
        setState("");
        setCountry("");
        setAddress("");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        setWorkerErrorMessage(true);
        setTimeout(() => {
          setWorkerErrorMessage(false);
        }, 7000);
      }
    } else {
      // Mark the end of the initial render
      setIsInitialRender(true);
    }
  }, [workerListError]);

  const handleWorkerSubmit = (e) => {
    if (firstName !== "" && lastName !== "" && email !== "" && mobile !== "" && zipcode !== "" && city !== "" && state !== "" && country !== "" && address !== "") {
      e.preventDefault();

      dispatch(createWorkerAsync({ first_name: firstName, last_name: lastName, email, mobile, zipcode, city, state, country, address, is_active: true }))
      // .then((result) => {
      // if (createWorkerAsync.fulfilled.match(result)) {

      //   if (workerListError === null) {
      //     dispatch(getWorkerAsync());
      //     setFirstName("");
      //     // setLastName("");
      //     // setEmail("");
      //     // setMobile("");
      //     // setZipcode("");
      //     // setCity("");
      //     // setState("");
      //     // setCountry("");
      //     // setAddress("");

      //     setSuccess(true);
      //     setTimeout(() => {
      //       setSuccess(false);
      //     }, 3000)
      //   }
      //   else {
      //     setWorkerErrorMessage(true);
      //     setTimeout(() => {
      //       setWorkerErrorMessage(false);
      //     }, 4000)
      //   }
      // }
      // })

    }

    else {
      e.preventDefault();
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }

  }

  const hideError = () => {
    setError(false);
    setWorkerErrorMessage(false);
  }

  const hideSuccess = () => {
    setSuccess(false);
  }

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
      {workerErrorMessage && (
        <div
          className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
          role="alert"
          style={{ zIndex: 1000 }}
        >
          <div className="flex-grow">
            {Object.entries(errorAfterSubmit).map(([fieldName, errors]) => (
              errors.map((error, index) => (
                <div key={`${fieldName}_${index}`} className="mb-1">
                  <strong className="font-bold">{`Error: ${error}`}</strong>
                </div>
              ))
            ))}
          </div>
          <button
            onClick={hideError}
            className="relative top-0.5 bottom-0 left-1"
          >
            <span className="text-red-500 text-2xl">×</span>
          </button>
        </div>
      )}
      {success && <div
        // className="bg-red-100 flex justify-between items-center border border-red-400 text-red-700 px-4 py-3 rounded relative"
        className="bg-green-100 flex justify-between items-center border border-green-400 text-green-700 px-4 py-3 rounded fixed top-0 left-0 right-0"
        role="success"
        style={{ zIndex: 1001 }}
      >
        <strong className="font-bold">Worker added successfully</strong>
        <button
          onClick={hideSuccess}
          className="relative top-0.5 bottom-0 left-1"
        >
          <span className="text-green-500 text-2xl">×</span>
        </button>
      </div>}
      <div
        id="addWorker"
        className="relative flex flex-col items-center rounded shadow-md w-full h-34.3125 bg-white mt-1.375"
      >
        <button
          className="absolute top-2 right-2 p-0.5 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
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
        <div id="formTitle" className="w-52 h-4 m-4 font-bold text-base text-center text-25">
          Add worker
        </div>
        <div id="formFields" className="">
          <form
            onSubmit={handleWorkerSubmit}
            className="p-8 flex flex-col items-center w-35rem h-28rem bg-white"
          >
            <div id="textFields" className="grid md:grid-cols-2 gap-4">

              <div className={`mb-4 md:w-21.375 ${firstName === '' && error ? 'border-2 border-red-500' : ''}`}>
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                />
              </div>

              <div className={`mb-4 md:w-21.375 ${lastName === '' && error ? 'border-2 border-red-500' : ''}`}>
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                />
              </div>

              <div className={`mb-4 md:w-21.375 ${email === '' && error ? 'border-2 border-red-500' : ''}`}>
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>

              <div className={`mb-4 md:w-21.375 ${mobile === '' && error ? 'border-2 border-red-500' : ''}`}>
                <input
                  type="number"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Mobile"
                />
              </div>

              <div className={`mb-4 md:w-21.375 ${address === '' && error ? 'border-2 border-red-500' : ''}`}>
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
              </div>

              <div className={`mb-4 md:w-21.375 ${city === '' && error ? 'border-2 border-red-500' : ''}`}>
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </div>

              <div className={`mb-4 md:w-21.375 ${state === '' && error ? 'border-2 border-red-500' : ''}`}>
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                />
              </div>

              <div className={`mb-4 md:w-21.375 ${country === '' && error ? 'border-2 border-red-500' : ''}`}>
                <input
                  type="text"
                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                />
              </div>

              <div className={`mb-4 md:w-21.375 ${zipcode === '' && error ? 'border-2 border-red-500' : ''}`}>
                <input
                  type="number"

                  className="w-full h-3.3125 py-2 px-8 text-xs md:text-sm font-semibold border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  placeholder="PIN code"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#DF8E51] h-3.3125 w-10.0625 md:w-21.375 m-4 text-white py-2 transition duration-300"
            >
              Add
            </button>
          </form>
        </div >
      </div >
    </>
  );
};

export default AddProduct;
