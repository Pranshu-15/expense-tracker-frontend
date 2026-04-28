import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#ff4060", "#ff9040", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(
      data?.map((item) => ({ name: item?.source, amount: item?.amount })) || []
    );
  }, [data]);

  return (
    <div className="card" style={{ borderTop: "3px solid var(--green)" }}>
      <h5 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>
        Last 60 Days Income
      </h5>
      <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
        Income breakdown by source
      </p>
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
