import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card" style={{ borderTop: "3px solid var(--red)" }}>
      <div className="flex items-center justify-between mb-5">
        <h5 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>
          Recent Expenses
        </h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight size={13} />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {transactions?.slice(0, 5)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            paidVia={expense.paidVia}
            hideDeleteBtn
          />
        ))}
        {!transactions?.length && (
          <p className="text-xs text-center py-8" style={{ color: "var(--text-3)" }}>
            No expenses yet
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
