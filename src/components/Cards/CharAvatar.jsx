import React from "react";
import { getInitials } from "../../utils/helper";

const CharAvatar = ({ fullName, width = "w-12", height = "h-12", style = "" }) => {
  return (
    <div
      className={`${width} ${height} ${style} flex items-center justify-center rounded-full font-semibold`}
      style={{
        background: "var(--accent-dim)",
        color: "var(--accent)",
        border: "2px solid var(--border-strong)",
      }}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
