import React from "react";

const CustomLegend = ({ payload }) => {
  if (!payload?.length) return null;
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs" style={{ color: "var(--text-2)" }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
