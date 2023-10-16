import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

const Home = () => {
  return (
    <div className="flex bg-gray-100">
      <div className="w-1/4 bg-gray-800 h-screen ">
        <SideBar />
      </div>
      <div className="w-full">
        <Header />
      </div>
    </div>
  );
};

export default Home;
