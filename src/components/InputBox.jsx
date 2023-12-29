import React from 'react';

const InputBox = ({ text, onDelete }) => {
  return (
    <div className="flex items-center bg-gray-200 p-2 rounded-md m-1">
      <div className="flex-grow">{text}</div>
      <button className="text-red-500" onClick={onDelete}>
        &#10006;
      </button>
    </div>
  );
};

export default InputBox;