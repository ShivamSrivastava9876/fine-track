import Layout from "@/components/Layout";
import DashboardData from "@/components/DashboardData";
import DashboardButtons from "@/components/DashboardButtons";
import DashboardTables from "@/components/DashboardTables";
import { useState } from "react";

const Dashboard = () => {

  return (
    <Layout>
      <div className="p-8">
        <DashboardData />
        <DashboardButtons />
        <DashboardTables />
      </div>
    </Layout>
  );
};

export default Dashboard;

