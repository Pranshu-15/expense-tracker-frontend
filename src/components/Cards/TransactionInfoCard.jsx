import React from "react";
import {
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuUtensils,
  LuCreditCard,
  LuWallet,
  LuSmartphone,
  LuBanknote,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  paidVia,
  hideDeleteBtn,
  onDelete,
}) => {
  const isIncome = type === "income";

  const getPaidViaIcon = (method) => {
    switch (method) {
      case "Credit Card": return <LuCreditCard size={12} />;
      case "Debit Card":  return <LuCreditCard size={12} />;
      case "UPI":         return <LuSmartphone size={12} />;
      case "Cash":        return <LuBanknote size={12} />;
      default:            return <LuWallet size={12} />;
    }
  };

  const isEmoji = (str) =>
    typeof str === "string" &&
    str.length <= 4 &&
    /[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]/u.test(str);

  return (
    <div
      className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
      style={{
        borderBottom: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-dim)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl text-lg"
        style={{
          background: isIncome ? "var(--green-dim)" : "var(--red-dim)",
          color: isIncome ? "var(--green)" : "var(--red)",
        }}
      >
        {icon ? (
          isEmoji(icon) ? (
            <span>{icon}</span>
          ) : (
            <img src={icon} alt={title} className="w-5 h-5" />
          )
        ) : (
          <LuUtensils size={16} />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium truncate"
          style={{ color: "var(--text-1)" }}
        >
          {title}
        </p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <p className="text-xs" style={{ color: "var(--text-3)" }}>
            {date}
          </p>
          {type === "expense" && paidVia && (
            <>
              <span style={{ color: "var(--border)" }}>•</span>
              <span
                className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full"
                style={{
                  background: "var(--accent-dim)",
                  color: "var(--accent)",
                }}
              >
                {getPaidViaIcon(paidVia)}
                {paidVia}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Amount + delete */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {!hideDeleteBtn && onDelete && (
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all duration-200"
            style={{ color: "var(--red)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--red-dim)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <LuTrash2 size={15} />
          </button>
        )}

        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
          style={{
            background: isIncome ? "var(--green-dim)" : "var(--red-dim)",
            color: isIncome ? "var(--green)" : "var(--red)",
          }}
        >
          {isIncome ? "+" : "-"} ₹{amount}
          {isIncome ? <LuTrendingUp size={12} /> : <LuTrendingDown size={12} />}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
