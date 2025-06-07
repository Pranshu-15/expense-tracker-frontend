import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareIncomeBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const IncomeOverview = ({ transactions, onAddIncome, loading = false }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    console.log("IncomeOverview - chart data prepared:", result);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="">
            <h5 className="text-lg">Income Overview</h5>
            <p className="text-xs text-gray-400 mt-0.5">
              Track your earnings over time and analyze your income
            </p>
          </div>
          <button className="add-btn" onClick={onAddIncome}>
            <LuPlus className="text-lg" />
            Add Income
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
                  No income data available. Add some income entries to see the
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

export default IncomeOverview;
