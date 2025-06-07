import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user, isLoading } = useContext(UserContext);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="">
        <Navbar activeMenu={activeMenu} />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // If not loading and no user, don't render the dashboard content
  if (!user) {
    return (
      <div className="">
        <Navbar activeMenu={activeMenu} />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />
      <div className="flex">
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;