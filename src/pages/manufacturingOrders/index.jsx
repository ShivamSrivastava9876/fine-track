import Layout from "@/components/Layout";
import ManufacturingOrderButtons from "@/components/ManufacturingOrderButtons";
import ManufacturingOrderTable from "@/components/ManufacturingOrderTable";
import AddManufacturingOrder from "@/components/AddManufacturingOrder"
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Products = () => {
  const [addProduct, setAddProduct] = useState(false);
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
        <ManufacturingOrderButtons addProduct={addProduct} setAddProduct={setAddProduct}/>
        <ManufacturingOrderTable />
        {addProduct && <AddManufacturingOrder addProduct={addProduct} setAddProduct={setAddProduct}/>}
      </div>
    </Layout>
  );
};

export default Products;

