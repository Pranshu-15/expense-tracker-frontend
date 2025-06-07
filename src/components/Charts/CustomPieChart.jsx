import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data &&
              data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={<CustomLegend />}
            verticalAlign="bottom"
            height={50}
          />
          {showTextAnchor && label && totalAmount && (
            <g>
              <text
                x="50%"
                y="40%"
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fill: "#666",
                  fontSize: "14px",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {label}
              </text>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fill: "#333",
                  fontSize: "24px",
                  fontWeight: "600",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {totalAmount}
              </text>
            </g>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
