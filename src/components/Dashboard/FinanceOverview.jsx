import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#ff4060", "#20dfa8"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Balance",  amount: totalBalance  },
    { name: "Expenses", amount: totalExpense  },
    { name: "Income",   amount: totalIncome   },
  ];

  const savingsRate = totalIncome > 0
    ? Math.max(0, Math.round(((totalIncome - totalExpense) / totalIncome) * 100))
    : 0;
  const expenseRate = totalIncome > 0
    ? Math.min(100, Math.round((totalExpense / totalIncome) * 100))
    : 0;

  return (
    <div className="card" style={{ borderTop: "3px solid #875cf5" }}>
      <h5 className="text-base font-semibold mb-1" style={{ color: "var(--text-1)" }}>
        Financial Overview
      </h5>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${totalBalance.toLocaleString("en-IN")}`}
        colors={COLORS}
        showTextAnchor
      />

      {/* Progress bars */}
      <div className="mt-4 flex flex-col gap-3">
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span style={{ color: "var(--text-3)" }}>Expense ratio</span>
            <span className="font-semibold" style={{ color: "var(--red)" }}>{expenseRate}%</span>
          </div>
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--red-dim)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${expenseRate}%`, background: "var(--red)" }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span style={{ color: "var(--text-3)" }}>Savings rate</span>
            <span className="font-semibold" style={{ color: "var(--green)" }}>{savingsRate}%</span>
          </div>
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--green-dim)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${savingsRate}%`, background: "var(--green)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview;
