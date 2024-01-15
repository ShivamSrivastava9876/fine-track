import Layout from "@/components/Layout";
import WorkerButtons from "@/components/WorkerButtons";
import WorkerTable from "@/components/WorkerTable";
import AddWorker from "@/components/AddWorker"
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Products = () => {
  const [addWorker, setAddWorker] = useState(false);
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
        <WorkerButtons addWorker={addWorker} setAddWorker={setAddWorker}/>
        <WorkerTable />
        {addWorker && <AddWorker addWorker={addWorker} setAddWorker={setAddWorker}/>}
      </div>
    </Layout>
  );
};

export default Products;

