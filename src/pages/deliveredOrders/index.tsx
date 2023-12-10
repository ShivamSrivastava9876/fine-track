import Layout from "@/components/Layout";
import DeliveredOrderTables from "@/components/DeliveredOrderTables";
import OrderButtons from "@/components/DeliveredOrderButtons";
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
        <DeliveredOrderTables />
      </div>
    </Layout>
  );
};

export default Orders;

