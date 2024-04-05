import Layout from "@/components/Layout";
import OrderButtons from "@/components/ConfirmOrderButtons";
import DailyManufacturingDetailsTable from "@/components/DailyManufacturingDetailsTable";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DailyManufacturingReports = () => {
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
        <DailyManufacturingDetailsTable />
      </div>
    </Layout>
  );
};

export default DailyManufacturingReports;

