import Header from "@/components/Header";
import Layout from "@/components/Layout";
import SideBar from "@/components/SideBar";

const Home = () => {
  return (
    <>
      {/* <div className="flex bg-gray-100">
      <div className="w-1/4 bg-gray-800 h-screen ">
        <SideBar />
      </div>
      <div className="w-full">
        <Header />
      </div>
    </div> */}
      <Layout>
        <div>
          <h1>Home Page Content Goes Here</h1>
        </div>
      </Layout>
    </>
  );
};

export default Home;
