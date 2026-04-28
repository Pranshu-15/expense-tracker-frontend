import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuSun, LuMoon } from "react-icons/lu";
import { useTheme } from "../../context/ThemeContext";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { isDark, toggle } = useTheme();

  return (
    <div
      className="nav-bar flex items-center justify-between py-4 px-6 sticky top-0 z-30"
      style={{ minHeight: 62 }}
    >
      <div className="flex items-center gap-4">
        <button
          className="block lg:hidden"
          style={{ color: "var(--text-1)" }}
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "var(--accent)" }}
          >
            ET
          </div>
          <h2
            className="text-base font-semibold tracking-tight"
            style={{ color: "var(--text-1)" }}
          >
            Expense Tracker
          </h2>
        </div>
      </div>

      <button
        onClick={toggle}
        className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: "var(--accent-dim)",
          border: "1px solid var(--border)",
          color: isDark ? "#f5c518" : "var(--accent)",
        }}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <LuSun className="text-lg" /> : <LuMoon className="text-lg" />}
      </button>

      {openSideMenu && (
        <div className="fixed top-[62px] left-0 z-40">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
