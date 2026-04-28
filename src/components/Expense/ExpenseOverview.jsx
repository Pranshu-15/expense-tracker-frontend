import React, { useState, useEffect } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const ExpenseOverview = ({ transactions, loading = false }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(prepareExpenseBarChartData(transactions));
  }, [transactions]);

  const totalExpense = transactions?.reduce((s, t) => s + t.amount, 0) || 0;

  return (
    <div className="card h-full" style={{ borderTop: "3px solid var(--red)" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h5 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>
            Expense Overview
          </h5>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
            Spending across all categories
          </p>
        </div>
        <div
          className="px-3 py-1 rounded-xl text-xs font-semibold"
          style={{ background: "var(--red-dim)", color: "var(--red)" }}
        >
          ₹{totalExpense.toLocaleString("en-IN")} total
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4">
        {loading ? (
          <div className="flex items-center justify-center h-[280px]">
            <div
              className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "var(--red)", borderTopColor: "transparent" }}
            />
          </div>
        ) : chartData.length > 0 ? (
          <CustomBarChart data={chartData} color="#e53e6a" />
        ) : (
          <div className="flex flex-col items-center justify-center h-[280px] gap-3">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: "var(--red-dim)" }}
            >
              💸
            </div>
            <p className="text-sm text-center" style={{ color: "var(--text-3)" }}>
              No expense data yet.<br />Add some entries to see the chart.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseOverview;
