import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(prepareExpenseBarChartData(data));
  }, [data]);

  return (
    <div className="card" style={{ borderTop: "3px solid var(--orange)" }}>
      <h5 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>
        Last 30 Days Expenses
      </h5>
      <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
        Spending by category
      </p>
      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
