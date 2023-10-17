import Layout from "@/components/Layout";
import UserTables from "@/components/UserTables";

const Users = () => {
  return (
    <Layout>
      <div className="p-8">
        <UserTables />
      </div>
    </Layout>
  );
};

export default Users;
