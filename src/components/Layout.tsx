import React, { ReactNode } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex bg-gray-100">
        <div className="w-1/4 bg-[#3E301A] h-screen">
          <SideBar />
        </div>
        <div className="w-3/4">
          <Header />
          <div className="content">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
