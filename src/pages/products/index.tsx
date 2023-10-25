import Layout from "@/components/Layout";
import ProductButtons from "@/components/ProductButtons";
import ProductTables from "@/components/ProductTables";
import AddProduct from "@/components/AddProduct"
import { useState } from "react";

const Products = () => {
  const [addProduct, setAddProduct] = useState(false);

  return (
    <Layout>
      <div className="p-8">
        <ProductButtons addProduct={addProduct} setAddProduct={setAddProduct}/>
        <ProductTables />
        {addProduct && <AddProduct addProduct={addProduct} setAddProduct={setAddProduct}/>}
      </div>
    </Layout>
  );
};

export default Products;

