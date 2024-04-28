import Layout from "@/components/Layout";
import OrderButtons from "@/components/ConfirmOrderButtons";
import ProductReportTable from "@/components/ProductReportTable";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProductReports = () => {
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
        <ProductReportTable />
      </div>
    </Layout>
  );
};

export default ProductReports;

