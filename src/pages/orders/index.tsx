import Layout from "@/components/Layout";
import OrderTables from "@/components/OrderTables";
import OrderButtons from "@/components/OrderButtons";
import { useState } from "react";

const Orders = () => {
  const [addProduct, setAddProduct] = useState(false);

  return (
    <Layout>
      <div className="p-8">
        <OrderButtons />
        <OrderTables />
      </div>
    </Layout>
  );
};

export default Orders;

