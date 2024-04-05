import Layout from "@/components/Layout";
import OrderButtons from "@/components/ConfirmOrderButtons";
import WorkerReportTable from "@/components/WorkerReportTable";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const WorkerReports = () => {
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
        <WorkerReportTable />
      </div>
    </Layout>
  );
};

export default WorkerReports;

