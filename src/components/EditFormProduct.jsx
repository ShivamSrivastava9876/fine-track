import { useState, useEffect } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync, getCategoryList } from "@/redux/slice/category/categorySlice";
import { getProductTypeAsync, getProductTypeList, getSelectedProductTypeAsync } from "@/redux/slice/productType/productTypeSlice";
import { FiImage } from 'react-icons/fi';
import AddIcon from "../../public/assets/Icons/add.svg";
import Image from "next/image";

const EditFormProduct = ({ size, setSize, length, setLength, files, setFiles, productImage, row, handleCategoryClick, handleUpdateProduct, openProductType, description, setDescription, productType, setProductType, category, setCategory, quantity, setQuantity, price, setPrice, puritySpc, setPuritySpc, grossWeight, setGrossWeight, image, setImage, stoneWeight, setStoneWeight, subModel, setSubModel, model, setModel, productName, setProductName, productId, setProductId, huId, setHuId, openCategory, handleCategory, handleProductType, handleProductTypeClick, isOpen, handleCancel }) => {
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
        const filesLength = selectedFile.length;

        setFiles(filesLength)
        setImage(selectedFile);
    }

    //Handling add weight
    const [inputTextWeight, setInputTextWeight] = useState('');
    const [weightArray, setWeightArray] = useState(row.grossWeight && typeof row.grossWeight === 'string' ? row.grossWeight.split(',') : []);
    const addInputWeight = (e) => {
        e.preventDefault();
        if (inputTextWeight.trim() !== '') {
            setWeightArray([...weightArray, inputTextWeight]);
            setGrossWeight([...weightArray, inputTextWeight]);
            setInputTextWeight('');
        }
    };
    const deleteInputWeight = (e, index) => {
        e.preventDefault();
        const updatedList = [...weightArray];
        updatedList.splice(index, 1);
        setWeightArray(updatedList);
        setGrossWeight(updatedList);
    };
    //**
    //Handling add stone weight
    // const [inputTextStoneWeight, setInputTextStoneWeight] = useState('');
    // const [stoneWeightArray, setStoneWeightArray] = useState(row.stoneWeight?.split(','));
    // const addInputStoneWeight = (e) => {
    //     e.preventDefault();
    //     if (inputTextStoneWeight.trim() !== '') {
    //         setStoneWeightArray([...stoneWeightArray, inputTextStoneWeight]);
    //         setStoneWeight([...stoneWeightArray, inputTextStoneWeight]);
    //         setInputTextStoneWeight('');
    //     }
    // };
    // const deleteInputStoneWeight = (e, index) => {
    //     e.preventDefault();
    //     const updatedList = [...stoneWeightArray];
    //     updatedList.splice(index, 1);
    //     setStoneWeightArray(updatedList);
    //     setStoneWeight(updatedList);
    // };
    //**
    //Input box size handling
    const [inputTextSize, setInputTextSize] = useState('');
    const [sizeArray, setSizeArray] = useState(row.size && typeof row.size === 'string' ? row.size.split(',') : []);
    const addInputSize = (e) => {
        e.preventDefault();
        if (inputTextSize.trim() !== '') {
            setSizeArray([...sizeArray, inputTextSize]);
            setSize([...sizeArray, inputTextSize]);
            setInputTextSize('');
        }
    };

    const deleteInputSize = (e, index) => {
        e.preventDefault();
        const updatedList = [...sizeArray];
        updatedList.splice(index, 1);
        setSizeArray(updatedList);
        setSize(updatedList);
    };
    // **
    //Input box length handling
    const [inputTextLength, setInputTextLength] = useState('');
    const [lengthArray, setLengthArray] = useState(row.length && typeof row.length === 'string' ? row.length.split(',') : []);

    const addInputLength = (e) => {
        e.preventDefault();
        if (inputTextLength.trim() !== '') {
            setLengthArray([...lengthArray, inputTextLength]);
            setLength([...lengthArray, inputTextLength]);
            setInputTextLength('');
        }
    };

    const deleteInputLength = (e, index) => {
        e.preventDefault();
        const updatedList = [...lengthArray];
        updatedList.splice(index, 1);
        setLengthArray(updatedList);
        setLength(updatedList);
    };
    // **

    return (
        <div>
            <div className={`fixed inset-0 z-40 bg-black opacity-10 backdrop-blur-md transition-opacity ${modalClasses}`}></div>
            <div className="flex justify-center items-center fixed bottom-2 top-2 right-5 left-5 z-50">

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateProduct(e, row.HuId, row.productId, row.model, row.subModel, row.product, row.stoneWeight, row.grossWeight, row.size, row.length, row.puritySpc, row.price, row.quantity, row.description, row.category, row.productType, row.image);
                    }}
                    className="p-8 rounded shadow-md flex flex-col justify-start overflow-y-scroll no-scrollbar h-full w-auto bg-white border border-blue-500"
                >
                    <div className="my-2 bg-white">
                        <h2 className="mx-2 my-3 text-2xl font-bold">
                            Edit product
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div class="relative cursor-pointer inline-block text-left mb-2 h-10 z-50">
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
                                placeholder="Hu ID"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.productId}
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                placeholder="Product ID"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.model}
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                placeholder="Model"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.subModel}
                                value={subModel}
                                onChange={(e) => setSubModel(e.target.value)}
                                placeholder="Sub model"
                            />
                        </div>
                        
                        <div className="mb-4 ">

                            <input
                                type="text"
                                value={inputTextWeight}
                                onChange={(e) => setInputTextWeight(e.target.value)}
                                placeholder="Weight"
                                className={`py-2 px-8 border rounded-tl-xl w-4/5`}
                            />
                            <button onClick={(e) => addInputWeight(e)} className="p-2 rounded-full hover:bg-[#f8af77] text-white">
                                <Image src={AddIcon} alt="dashboard-icon" />
                            </button>
                            <div className="top-full left-0 right-0 md:w-21.375 overflow-x-auto p-2 bg-gray-100 rounded">
                                {weightArray?.map((text, index) => (
                                    <span key={index} className="inline-block bg-gray-200 p-2 rounded-md m-1">
                                        {text}
                                        <button
                                            className="ml-2 text-red-500"
                                            onClick={(e) => deleteInputWeight(e, index)}
                                        >
                                            &#10006;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* {row.productType.toLowerCase() === 'chain' && <div className="mb-4 ">
                            <input
                                type="text"
                                value={inputTextStoneWeight}
                                onChange={(e) => setInputTextStoneWeight(e.target.value)}
                                placeholder="Stone weight"
                                className={`py-2 px-8 border rounded-tl-xl w-4/5`}
                            />
                            <button onClick={(e) => addInputStoneWeight(e)} className="p-2 rounded-full hover:bg-[#f8af77] text-white">
                                <Image src={AddIcon} alt="dashboard-icon" />
                            </button>
                            <div className="top-full left-0 right-0 md:w-21.375 overflow-x-auto p-2 bg-gray-100 rounded">
                                {stoneWeightArray?.map((text, index) => (
                                    <span key={index} className="inline-block bg-gray-200 p-2 rounded-md m-1">
                                        {text}
                                        <button
                                            className="ml-2 text-red-500"
                                            onClick={(e) => deleteInputStoneWeight(e, index)}
                                        >
                                            &#10006;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>} */}

                        {(row.productType.toLowerCase() === 'necklace' || row.productType.toLowerCase() === 'ring' || row.productType.toLowerCase() === 'bangle') && <div className="mb-4 ">
                            <input
                                type="text"
                                value={inputTextSize}
                                onChange={(e) => setInputTextSize(e.target.value)}
                                placeholder="Size"
                                className={`py-2 px-8 border rounded-tl-xl w-4/5`}
                            />
                            <button onClick={(e) => addInputSize(e)} className="p-2 rounded-full hover:bg-[#f8af77] text-white">
                                <Image src={AddIcon} alt="dashboard-icon" />
                            </button>
                            <div className="top-full left-0 right-0 md:w-21.375 overflow-x-auto p-2 bg-gray-100 rounded">
                                {sizeArray?.map((text, index) => (
                                    <span key={index} className="inline-block bg-gray-200 p-2 rounded-md m-1">
                                        {text}
                                        <button
                                            className="ml-2 text-red-500"
                                            onClick={(e) => deleteInputSize(e, index)}
                                        >
                                            &#10006;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>}

                        {(row.productType.toLowerCase() === 'bracelet' || row.productType.toLowerCase() === 'chain') && <div className="mb-4 ">
                            <input
                                type="text"
                                value={inputTextLength}
                                onChange={(e) => setInputTextLength(e.target.value)}
                                placeholder="Length"
                                className={`py-2 px-8 border rounded-tl-xl w-4/5`}
                            />
                            <button onClick={(e) => addInputLength(e)} className="p-2 rounded-full hover:bg-[#f8af77] text-white">
                                <Image src={AddIcon} alt="dashboard-icon" />
                            </button>
                            <div className="top-full left-0 right-0 md:w-21.375 overflow-x-auto p-2 bg-gray-100 rounded">
                                {lengthArray?.map((text, index) => (
                                    <span key={index} className="inline-block bg-gray-200 p-2 rounded-md m-1">
                                        {text}
                                        <button
                                            className="ml-2 text-red-500"
                                            onClick={(e) => deleteInputLength(e, index)}
                                        >
                                            &#10006;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>}

                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.product}
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="Product name"
                            />
                        </div>
                        
                        <div className="mb-4 flex justify-center items-center">
                            <label htmlFor="fileInput" className="w-full flex items-center cursor-pointer h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]">
                                <FiImage className="mr-2" /> {files !== '' ? `${files} images` : 'Click here to update images'}
                                <input
                                    type="file"
                                    id="fileInput"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>


                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.puritySpc}
                                value={puritySpc}
                                onChange={(e) => setPuritySpc(e.target.value)}
                                placeholder="Purity spc"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.price}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
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
                                placeholder="Quantity"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="w-full h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                                defaultValue={row.description}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
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
