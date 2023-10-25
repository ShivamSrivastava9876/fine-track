import Layout from "@/components/Layout";
import CategoryButtons from "@/components/CategoryButtons";
import CategoryTables from "@/components/CategoryTables";
import AddCategory from "@/components/AddCategory"
import { useState } from "react";

const Products = () => {
  const [addCategory, setAddCategory] = useState(false);

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

