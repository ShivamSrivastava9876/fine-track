import React from 'react';
import Button from "@mui/material/Button";

const EditForm = ({ edits, title, handleSave, handleCancel, edited, handleCategoryChange, isOpen }) => {
    const modalClasses = isOpen ? 'block' : 'hidden';

    return (
        <div>
            {/* Backdrop with blur effect */}
            <div className={`fixed inset-0 z-40 bg-black opacity-40 backdrop-blur-md transition-opacity ${modalClasses}`}></div>

            <div className='flex flex-col justify-between items-center fixed inset-60 z-50 bg-white border border-blue-500 rounded p-4 mx-auto w-1/3'>
                <h2 className='flex items-center m-4 text-2xl font-bold'>Update {title}</h2>

                {edits.map((edit) => {
                    return (
                        <div className='flex m-4'>
                            <div className='flex items-center mx-1 w-1/4 text-right pr-3 text-blue-500'>{edit.name}</div>
                            <input
                                type="text"
                                className="border border-blue-500 px-2 py-1 w-3/4 rounded focus:ring focus:ring-blue-200"
                                value={edited}
                                onChange={handleCategoryChange}
                            />
                        </div>
                    )
                })}

                <div className="space-x-2 m-4">
                    <Button onClick={handleSave} className="bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                        Save
                    </Button>
                    <Button onClick={handleCancel} className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EditForm;