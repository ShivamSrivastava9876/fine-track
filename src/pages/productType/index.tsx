import Layout from "@/components/Layout";
import ProductTypeButtons from "@/components/ProductTypeButtons";
import ProductTypeTables from "@/components/ProductTypeTables";
import AddProductType from "@/components/AddProductType"
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Products = () => {
  const [addProductType, setAddProductType] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/login'); // Redirect to login page if token is not found
    }
  }, [router]); 

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

