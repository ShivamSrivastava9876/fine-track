import Layout from "@/components/Layout";
import CancelledOrderTables from "@/components/CancelledOrderTables";
import OrderButtons from "@/components/CancelledOrderButtons";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Orders = () => {
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
        <OrderButtons />
        <CancelledOrderTables />
      </div>
    </Layout>
  );
};

export default Orders;

