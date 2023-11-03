import Layout from "@/components/Layout";
import UserButtons from "@/components/UserButtons";
import UserTables from "@/components/UserTables";
import AddUser from "@/components/AddUser"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Users = () => {
  const [addUser, setAddUser] = useState(false);
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
        <UserButtons addUser={addUser} setAddUser={setAddUser}/>
        <UserTables />
        {addUser && <AddUser addUser={addUser} setAddUser={setAddUser} />}
      </div>
    </Layout>
  );
};

export default Users;
