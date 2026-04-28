import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "var(--bg-base)" }}
      >
        <Navbar activeMenu={activeMenu} />
        <div className="flex items-center justify-center flex-1">
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
            />
            <p className="text-sm" style={{ color: "var(--text-3)" }}>
              Loading…
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "var(--bg-base)" }}
      >
        <Navbar activeMenu={activeMenu} />
        <div className="flex items-center justify-center flex-1">
          <p style={{ color: "var(--text-3)" }}>Please log in to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-base)" }}>
      <Navbar activeMenu={activeMenu} />
      <div className="flex flex-1">
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <main className="flex-1 p-5 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
