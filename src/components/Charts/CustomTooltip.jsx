import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-3 py-2 text-xs shadow-lg"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-strong)",
        color: "var(--text-1)",
      }}
    >
      <p className="font-semibold mb-1" style={{ color: "var(--accent)" }}>
        {payload[0].name}
      </p>
      <p style={{ color: "var(--text-2)" }}>
        Amount:{" "}
        <span className="font-bold" style={{ color: "var(--text-1)" }}>
          ₹{payload[0].value}
        </span>
      </p>
    </div>
  );
};

export default CustomTooltip;
