import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className="text-sm" style={{ color: "var(--text-2)" }}>
        {content}
      </p>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="text-sm font-medium text-white px-5 py-2 rounded-xl transition-all duration-200"
          style={{
            background: "var(--red)",
            boxShadow: "0 4px 16px var(--red-dim)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
