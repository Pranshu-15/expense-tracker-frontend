import React from "react";
import moment from "moment";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card h-full flex flex-col" style={{ borderTop: "3px solid var(--red)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h5 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>
            Expense Entries
          </h5>
          {transactions?.length > 0 && (
            <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
              {transactions.length} {transactions.length === 1 ? "entry" : "entries"}
            </p>
          )}
        </div>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload size={13} /> Export
        </button>
      </div>

      {/* List */}
      <div
        className="flex flex-col gap-0.5 overflow-y-auto flex-1 pr-0.5"
        style={{ maxHeight: "420px" }}
      >
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            paidVia={expense.paidVia}
            onDelete={() => onDelete(expense._id)}
          />
        ))}
        {!transactions?.length && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: "var(--red-dim)" }}
            >
              📤
            </div>
            <p className="text-sm" style={{ color: "var(--text-3)" }}>
              No expense entries yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
