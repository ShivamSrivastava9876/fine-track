"use client"

import Layout from "@/components/Layout";
import DashboardData from "@/components/DashboardData";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
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
        <DashboardData />
      </div>
    </Layout>
  );
};

export default Dashboard;

