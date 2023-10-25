// components/UserComponent.js
import { ReactNode } from "react";

interface ProductButtonsProps {
  addProduct: boolean;
  setAddProduct: (value: boolean) => void;
}

const ProductComponent: React.FC<ProductButtonsProps> = ({
  addProduct,
  setAddProduct,
}) => {
  const handleAddProduct = () => {
    setAddProduct(!addProduct);
  };

  return (
    <div className="flex items-center justify-between w-full mb-8">
      {/* Left-hand side Buttons */}
      <div className="flex items-center space-x-4 relative">
        {/* Button 1 */}
        <button className="flex items-center px-4 py-2 bg-white text-[#344054] rounded-xl border border-[#D0D5DD] shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
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
          Filters
        </button>

        {/* Button 2 */}
        <button
          className={`flex items-center px-4 py-2 bg-[#DB8A4D] text-white rounded-xl shadow transition-transform duration-300 transform ${
            addProduct ? "invisible" : ""
          }`}
          onClick={handleAddProduct}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add product
        </button>
      </div>

      {/* User Title */}
      <h1 className="text-2xl mx-4 font-bold">Products</h1>

      {/* Right-hand side Search Box */}
      <input
        type="search"
        placeholder="Search"
        className="px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none w-80 outline-none"
        // style={{ width: "200px" }}
      />
    </div>
  );
};

export default ProductComponent;
