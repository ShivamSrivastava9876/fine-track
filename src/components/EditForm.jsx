import React, { useState } from 'react';
import Button from "@mui/material/Button";
import { FiImage } from 'react-icons/fi';

const EditForm = ({ row, handleUpdateCategory, isOpen, handleCancel, category, setCategory, image, setImage }) => {
    const modalClasses = isOpen ? 'block' : 'hidden';
    const [newImage, setNewImage] = useState(false);

    //To save new image
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        setNewImage(!newImage);
    }

    return (
        // <div>
        //     {/* Backdrop with blur effect */}
        //     <div className={`fixed inset-0 z-40 bg-black opacity-40 backdrop-blur-md transition-opacity ${modalClasses}`}></div>

        //     <div className='flex flex-col justify-between items-center fixed inset-60 z-50 bg-white border border-blue-500 rounded p-4 mx-auto w-1/3'>
        //         <h2 className='flex items-center m-4 text-2xl font-bold'>Update {title}</h2>

        //         {edits.map((edit) => {
        //             return (
        //                 <div className='flex m-4'>
        //                     <div className='flex items-center mx-1 w-1/4 text-right pr-3 text-blue-500'>{edit.name}</div>
        //                     <input
        //                         type="text"
        //                         className="border border-blue-500 px-2 py-1 w-3/4 rounded focus:ring focus:ring-blue-200"
        //                         value={edited}
        //                         onChange={handleCategoryChange}
        //                     />
        //                 </div>

        //             )
        //         })}

        //         <div className="space-x-2 m-4">
        //             <Button onClick={handleSave} className="bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
        //                 Save
        //             </Button>
        //             <Button onClick={handleCancel} className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
        //                 Cancel
        //             </Button>
        //         </div>
        //     </div>
        // </div>

        <div>
            <div className={`fixed inset-0 z-40 bg-black opacity-10 backdrop-blur-md transition-opacity ${modalClasses}`}></div>
            <div className="flex justify-center items-center min-h-screen fixed inset-10 z-50">

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateCategory(row.category);
                    }}
                    className="p-8 rounded shadow-md flex flex-col justify-center w-35rem h-28rem bg-white border border-blue-500"
                >
                    <div className="mb-4 space-y-1">
                        <h2 className=" flex items-center m-4 text-2xl font-bold">
                            Edit category
                        </h2>
                    </div>
                    <div className="mb-2 h-10">
                        <input
                            type="text"
                            className="w-full py-2 px-8 h-10 flex flex-row items-center justify-center border rounded-xl outline-none border-[#9C9C9C] text-[#111010]"
                            defaultValue={row.category}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Category name"
                        />
                    </div>

                    <div className="mb-4 flex justify-center items-center">
                        <label htmlFor="fileInput" className="w-full flex items-center cursor-pointer h-9 py-2 px-8 border rounded-xl outline-none border-[#9C9C9C] text-[#111010]">
                            <FiImage className="mr-2" /> {newImage ? 'Image updated' : 'Click here to update image'}
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
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

            </div>
        </div>
    )
}

export default EditForm;