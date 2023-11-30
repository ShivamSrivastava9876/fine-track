import Layout from "@/components/Layout";
import OrderButtons from "@/components/ConfirmOrderButtons";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MonthlyDetailsTables from "../../components/MonthlyDetailsTable";

const DailyReports = () => {
  const [addProduct, setAddProduct] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/login'); // Redirect to login page if token is not found
    }
  }, []); 

  return (
    <Layout>
      <div className="p-8">
        {/* <OrderButtons /> */}
        <MonthlyDetailsTables />
      </div>
    </Layout>
  );
};

export default DailyReports;

