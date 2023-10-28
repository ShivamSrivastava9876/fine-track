import Layout from "@/components/Layout";
import ProductTypeButtons from "@/components/ProductTypeButtons";
import ProductTypeTables from "@/components/ProductTypeTables";
import AddProductType from "@/components/AddProductType"
import { useState } from "react";

const Products = () => {
  const [addProductType, setAddProductType] = useState(false);

  return (
    <Layout>
      <div className="p-8">
        <ProductTypeButtons addProductType={addProductType} setAddProductType={setAddProductType}/>
        <ProductTypeTables />
        {addProductType && <AddProductType addProductType={addProductType} setAddProductType={setAddProductType}/>}
      </div>
    </Layout>
  );
};

export default Products;

