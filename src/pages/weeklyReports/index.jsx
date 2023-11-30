import Layout from "@/components/Layout";
import OrderButtons from "@/components/ConfirmOrderButtons";
import WeeklyDetailsTable from "@/components/WeeklyDetailsTable";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
        <WeeklyDetailsTable />
      </div>
    </Layout>
  );
};

export default DailyReports;

