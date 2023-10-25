import React, { useState } from "react";

const AddProduct = ({ addProduct, setAddProduct }) => {
  const [huId, setHuId] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [stoneWeight, setStoneWeight] = useState("");
  const [addImage, setAddImage] = useState("");
  const [grossWeight, setGrossWeight] = useState("");
  const [puritySpc, setPuritySpc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");


  const handleClose = () => {
    setAddProduct(!addProduct);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    //write logic here
  };

  return (
    <div
      id="addProduct"
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
      <div id="formTitle" className="w-52 h-4 m-4 text-center text-25">
        Product details
      </div>
      <div id="formFields" className="">
        <form
          onSubmit={handleProductSubmit}
          className="p-8 flex flex-col items-center w-35rem h-28rem bg-white"
        >
          <div id="textFields" className="grid grid-cols-2 gap-4">
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={huId}
                onChange={(e) => setHuId(e.target.value)}
                placeholder="HU id"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Product id"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product name"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={stoneWeight}
                onChange={(e) => setStoneWeight(e.target.value)}
                placeholder="Stone weight"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                //add image upload function
                value={addImage}
                onChange={(e) => setAddImage(e.target.value)}
                placeholder="Add image"
              />
            </div>

            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={grossWeight}
                onChange={(e) => setGrossWeight(e.target.value)}
                placeholder="Gross weight"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={puritySpc}
                onChange={(e) => setPuritySpc(e.target.value)}
                placeholder="Purity spc"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <div className="mb-4 ">
              <input
                type="text"
                className="w-full h-3.3125 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
              />
            </div>
          </div>

          <button
            type="submit"
            className="rounded-xl bg-[#DF8E51] h-3.3125 w-21.375 m-4 text-white py-2 transition duration-300"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
