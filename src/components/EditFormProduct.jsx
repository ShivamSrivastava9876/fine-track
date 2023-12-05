import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import { getProductTypeAsync, getProductTypeList, getSelectedProductTypeAsync } from "@/redux/slice/productType/productTypeSlice";

const EditFormProduct = ({ row, handleCategoryClick, handleUpdateProduct, openProductType, description, setDescription, productType, setProductType, category, setCategory, quantity, setQuantity, price, setPrice, puritySpc, setPuritySpc, grossWeight, setGrossWeight, image, setImage, stoneWeight, setStoneWeight, subModel, setSubModel, model, setModel, productName, setProductName, productId, setProductId, huId, setHuId, openCategory, handleCategory, handleProductType, handleProductTypeClick, isOpen, handleCancel }) => {
    const dispatch = useDispatch();

    const modalClasses = isOpen ? 'block' : 'hidden';

    useEffect(() => {
        dispatch(getCategoriesAsync()).then((result) => {
            if (getCategoriesAsync.fulfilled.match(result) && category !== "") {
                dispatch(getSelectedProductTypeAsync(category))
            }
        })
    }, [dispatch, category])

    const categoryList = useSelector(getCategoryList);
    const productTypeList = useSelector(getProductTypeList);

    //To save new image
    const handleFileChange = (e) => {
        const selectedFile = e.target.files;
        setImage(selectedFile);
    }

    return (
        <div>
            <div className={`fixed inset-0 z-40 bg-black opacity-10 backdrop-blur-md transition-opacity ${modalClasses}`}></div>
            <div className="flex justify-center items-center min-h-screen fixed inset-10 z-50">

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("apna row", row);
                        handleUpdateProduct(e, row.HuId, row.productId, row.model, row.subModel, row.product, row.stoneWeight, row.grossWeight, row.puritySpc, row.price, row.quantity, row.description, row.category, row.productType);
                    }}
                    className="p-8 rounded shadow-md flex flex-col justify-center w-auto h-28rem bg-white border border-blue-500"
                >
                    <div className="mb-4 space-y-1">
                        <h2 className=" flex items-center m-4 text-2xl font-bold">
                            Edit product
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div class="relative cursor-pointer inline-block text-left mb-2 h-10">
                            <div onClick={handleCategory} class="inline-flex items-center justify-center px-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                                {category || row.category || "Select category"}
                                {/* Arrow icon (tailwindcss/heroicons) */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5 ml-2 -mr-1 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>

                            {openCategory && (
                                <div class="origin-top-right absolute right-16 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    {categoryList.map((category) => (
                                        <div key={category.id} class="py-1">
                                            <div
                                                href="#"
                                                onClick={() => handleCategoryClick(category.category_name)}
                                                class="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-indigo-100"
                                            >
                                                {category.category_name}
                                            </div>
                                        </div>))}
                                </div>)}
                        </div>
                        <div onClick={handleProductType} class="relative inline-block cursor-pointer text-left mb-2">
                            <div class="inline-flex items-center justify-center px-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-gray-100 active:text-gray-600">
                                {productType || row.productType || "Select product type"}
                                {/* Arrow icon (tailwindcss/heroicons) */}
                                <svg

                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5 ml-2 -mr-1 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>

                            {openProductType && (
                                <div class="origin-top-right absolute right-16 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">

                                    {productTypeList.map((productType) => (
                                        <div key={productType.id} class="py-1">
                                            <div
                                                href="#"
                                                onClick={() => handleProductTypeClick(productType.product_type)}
                                                class="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-indigo-100"
                                            >
                                                {productType.product_type}
                                            </div>
                                        </div>))}
                                </div>
                            )}
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.HuId}
                                value={huId}
                                onChange={(e) => setHuId(e.target.value)}
                                placeholder={row.HuId}
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.productId}
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                placeholder={row.productId}
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.model}
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                placeholder={row.model}
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.subModel}
                                value={subModel}
                                onChange={(e) => setSubModel(e.target.value)}
                                placeholder={row.subModel}
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.product}
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder={row.product}
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.stoneWeight}
                                value={stoneWeight}
                                onChange={(e) => setStoneWeight(e.target.value)}
                                placeholder={row.stoneWeight}
                            />
                        </div>
                        <div className="mb-2 h-10">
                            <input
                                type="file"
                                multiple
                                className="w-full py-2 px-8 h-10 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                // value={image}
                                onChange={handleFileChange}
                                placeholder="Image"
                            />
                        </div>

                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.grossWeight}
                                value={grossWeight}
                                onChange={(e) => setGrossWeight(e.target.value)}
                                placeholder={row.grossWeight}
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.puritySpc}
                                value={puritySpc}
                                onChange={(e) => setPuritySpc(e.target.value)}
                                placeholder={row.puritySpc}
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.price}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder={row.price}
                            // field named original price is there in the prop of this form but not used yet
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.quantity}
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder={row.quantity}
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.description}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={row.description}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row space-x-2 m-2">
                        <button
                            type="submit"
                            className="w-full mt-2 rounded-xl bg-[#DF8E51] text-white py-2 transition duration-300"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleCancel}
                            className="w-full mt-2 rounded-xl bg-[#DF8E51] text-white py-2 transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

            </div >
        </div >
    );
};

export default EditFormProduct;
