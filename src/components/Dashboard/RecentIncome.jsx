import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card" style={{ borderTop: "3px solid var(--green)" }}>
      <div className="flex items-center justify-between mb-5">
        <h5 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>
          Recent Income
        </h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight size={13} />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
        {!transactions?.length && (
          <p className="text-xs text-center py-8" style={{ color: "var(--text-3)" }}>
            No income entries yet
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentIncome;
