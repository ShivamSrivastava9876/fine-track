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
        <div className="bg-[#3E301A] min-h-screen w-16.3125 h-64.25">
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
