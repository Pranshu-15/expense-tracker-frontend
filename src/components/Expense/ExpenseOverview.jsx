import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const ExpenseOverview = ({ transactions, onAddExpense, loading = false }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(transactions);
    console.log("ExpenseOverview - chart data prepared:", result);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="">
            <h5 className="text-lg">Expense Overview</h5>
            <p className="text-xs text-gray-400 mt-0.5">
              Track your spending over time and analyze your expenses
            </p>
          </div>
          <button className="add-btn" onClick={onAddExpense}>
            <LuPlus className="text-lg" />
            Add Expense
          </button>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : chartData.length > 0 ? (
            <CustomBarChart data={chartData} />
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              <div className="text-center">
                <p>
                  No expense data available. Add some expense entries to see the
                  chart.
                </p>
                <p className="text-xs mt-2">
                  Debug: Transactions count: {transactions?.length || 0}
                </p>
                <p className="text-xs">Chart data count: {chartData.length}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpenseOverview;
