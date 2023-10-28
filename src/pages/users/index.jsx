import Layout from "@/components/Layout";
import UserButtons from "@/components/UserButtons";
import UserTables from "@/components/UserTables";
import AddUser from "@/components/AddUser"
import { useState } from "react";

const Users = () => {
  const [addUser, setAddUser] = useState(false);

  return (
    <Layout>
      <div className="p-8">
        <UserButtons addUser={addUser} setAddUser={setAddUser}/>
        <UserTables />
        {addUser && <AddUser addUser={addUser} setAddUser={setAddUser} />}
      </div>
    </Layout>
  );
};

export default Users;
