import Layout from "@/components/Layout";
import OrderTables from "@/components/OrderTables";
import OrderButtons from "@/components/OrderButtons";
import CreateCustomerOrder from "@/components/CreateCustomerOrder";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Orders = () => {
  const [createOrder, setCreateOrder] = useState(false);
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
        <OrderButtons createOrder={createOrder} setCreateOrder={setCreateOrder} />
        <OrderTables />
        {createOrder && <CreateCustomerOrder createOrder={createOrder} setCreateOrder={setCreateOrder} />}
      </div>
    </Layout>
  );
};

export default Orders;

