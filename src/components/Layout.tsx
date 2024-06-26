import React, { ReactNode } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=" bg-gray-100">
      <div className="flex min-h-screen">
        <div className="min-h-screen bg-[#3E301A] w-16.3125">
          <SideBar />
        </div>
        <div className="w-full bg-gray-100">
          <Header />
          <div className="content flex flex-col justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
