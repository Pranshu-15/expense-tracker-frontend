import React, { useContext, useRef, useEffect } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { gsap } from "gsap";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".menu-item",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.07, duration: 0.4, ease: "power3.out", clearProps: "all" }
      );
    }, menuRef);
    return () => ctx.revert();
  }, []);

  const handleClick = (route) => {
    if (route === "logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
      return;
    }
    navigate(route);
  };

  return (
    <div
      ref={menuRef}
      className="side-bar w-64 h-[calc(100vh-62px)] p-5 sticky top-[62px] z-20 flex flex-col"
    >
      {/* Profile */}
      <div className="flex flex-col items-center gap-3 mt-2 mb-8 menu-item">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover ring-2"
            style={{ ringColor: "var(--accent)" }}
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        <div className="text-center">
          <h5
            className="font-semibold text-sm leading-tight"
            style={{ color: "var(--text-1)" }}
          >
            {user?.fullName || ""}
          </h5>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
            {user?.email || ""}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        className="w-full h-px mb-5 menu-item"
        style={{ background: "var(--border)" }}
      />

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = activeMenu === item.label;
          const isLogout = item.path === "logout";
          return (
            <button
              key={`menu_${index}`}
              className="menu-item w-full flex items-center gap-3 text-sm py-3 px-4 rounded-xl transition-all duration-200 group"
              style={{
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive
                  ? "#fff"
                  : isLogout
                  ? "var(--red)"
                  : "var(--text-2)",
                fontWeight: isActive ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.background = "var(--accent-dim)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
              onClick={() => handleClick(item.path)}
            >
              <item.icon
                className="text-lg flex-shrink-0"
                style={{ color: isActive ? "#fff" : isLogout ? "var(--red)" : "var(--accent)" }}
              />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SideMenu;
