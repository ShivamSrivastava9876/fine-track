import Layout from "@/components/Layout";
import UserButtons from "@/components/UserButtons";
import UserTables from "@/components/UserTables";

const Users = () => {
  return (
    <Layout>
      <div className="p-8">
        <UserButtons />
        <UserTables />
      </div>
    </Layout>
  );
};

export default Users;
