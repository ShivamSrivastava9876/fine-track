import Layout from "@/components/Layout";
import CategoryButtons from "@/components/CategoryButtons";
import CategoryTables from "@/components/CategoryTables";
import AddCategory from "@/components/AddCategory"
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Products = () => {
  const [addCategory, setAddCategory] = useState(false);
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
        <CategoryButtons addCategory={addCategory} setAddCategory={setAddCategory}/>
        <CategoryTables />
        {addCategory && <AddCategory addCategory={addCategory} setAddCategory={setAddCategory}/>}
      </div>
    </Layout>
  );
};

export default Products;

