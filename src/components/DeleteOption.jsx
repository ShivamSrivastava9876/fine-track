import React from 'react'
import Button from "@mui/material/Button";

const DeleteOption = ({handleDeleteCancel, handleDelete, isOpen, rowId, deleteDetails}) => {
    const modalClasses = isOpen ? 'block' : 'hidden';

    return (
        <div>
            <div className={`fixed inset-0 z-40 bg-black opacity-40 backdrop-blur-md transition-opacity ${modalClasses}`}></div>
            <div className='flex flex-col justify-between items-center fixed inset-60 z-50 bg-white border border-blue-500 rounded p-4 mx-auto w-1/3'>
                <div className='text-lg font-semibold text-center text-black mb-4'>Are you sure you want to delete this {deleteDetails.title} ?</div>
                <div className="space-x-2 m-4">
                    <Button onClick={() => handleDelete(rowId)} className="bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                        Yes
                    </Button>
                    <Button onClick={handleDeleteCancel} className="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteOption;