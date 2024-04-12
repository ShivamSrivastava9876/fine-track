import Layout from "@/components/Layout";
import OrderButtons from "@/components/ConfirmOrderButtons";
import OrderByUserData from "@/components/OrderByUserData";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const OrderByUserReport = () => {
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
        {/* <OrderButtons /> */}
        <OrderByUserData />
      </div>
    </Layout>
  );
};

export default OrderByUserReport;

