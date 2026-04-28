import React, { useState, useEffect } from "react";
import { prepareIncomeBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const IncomeOverview = ({ transactions, loading = false }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(prepareIncomeBarChartData(transactions));
  }, [transactions]);

  const totalIncome = transactions?.reduce((s, t) => s + t.amount, 0) || 0;

  return (
    <div className="card h-full" style={{ borderTop: "3px solid var(--green)" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h5 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>
            Income Overview
          </h5>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
            Earnings across all sources
          </p>
        </div>
        <div
          className="px-3 py-1 rounded-xl text-xs font-semibold"
          style={{ background: "var(--green-dim)", color: "var(--green)" }}
        >
          ₹{totalIncome.toLocaleString("en-IN")} total
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4">
        {loading ? (
          <div className="flex items-center justify-center h-[280px]">
            <div
              className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "var(--green)", borderTopColor: "transparent" }}
            />
          </div>
        ) : chartData.length > 0 ? (
          <CustomBarChart data={chartData} color="#059669" />
        ) : (
          <div
            className="flex flex-col items-center justify-center h-[280px] gap-3"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: "var(--green-dim)" }}
            >
              💰
            </div>
            <p className="text-sm text-center" style={{ color: "var(--text-3)" }}>
              No income data yet.<br />Add some entries to see the chart.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;
