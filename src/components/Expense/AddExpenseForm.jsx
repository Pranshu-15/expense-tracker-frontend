import React, { useState, useRef } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuSparkles, LuArrowRight, LuCircleCheck } from "react-icons/lu";
import { gsap } from "gsap";

const EXAMPLES = [
  "spent 500 on groceries via UPI yesterday",
  "paid 1200 for electricity bill by credit card today",
  "₹350 for dinner, cash, last Friday",
];

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "", amount: "", date: "", icon: "", paidVia: "",
  });
  const [nlText, setNlText]               = useState("");
  const [isParsing, setIsParsing]         = useState(false);
  const [parseError, setParseError]       = useState("");
  const [parsedOk, setParsedOk]           = useState(false);
  const [suggestedCategory, setSuggestedCategory] = useState("");
  const [isSuggesting, setIsSuggesting]   = useState(false);
  const fieldsRef = useRef(null);

  const handleChange = (key, value) =>
    setExpense((prev) => ({ ...prev, [key]: value }));

  /* ── Natural-language parse ─────────────────────────── */
  const handleParse = async () => {
    if (!nlText.trim()) return;
    setIsParsing(true);
    setParseError("");
    setParsedOk(false);
    try {
      const { data } = await axiosInstance.post(
        API_PATHS.EXPENSE.PARSE_TRANSACTION,
        { text: nlText },
        { timeout: 30000 }
      );
      setExpense((prev) => ({
        ...prev,
        icon:     data.icon      || prev.icon,
        category: data.category  || prev.category,
        amount:   String(data.amount   || prev.amount),
        date:     data.date      || prev.date,
        paidVia:  data.paidVia   || prev.paidVia,
      }));
      setParsedOk(true);
      // flash the fields section
      if (fieldsRef.current) {
        gsap.fromTo(fieldsRef.current,
          { borderColor: "var(--accent)" },
          { borderColor: "transparent", duration: 1.2, ease: "power2.out" }
        );
      }
    } catch (err) {
      setParseError(
        err.response?.data?.message || "Couldn't parse that. Try rephrasing."
      );
    } finally {
      setIsParsing(false);
    }
  };

  /* ── Emoji → AI category suggestion ────────────────── */
  const handleIconSelect = async (selectedIcon) => {
    handleChange("icon", selectedIcon);
    setSuggestedCategory("");
    setIsSuggesting(true);
    try {
      const { data } = await axiosInstance.post(
        API_PATHS.EXPENSE.SUGGEST_CATEGORY,
        { icon: selectedIcon },
        { timeout: 30000 }
      );
      if (data.category) setSuggestedCategory(data.category);
    } catch {
      // non-critical
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="flex flex-col gap-0">

      {/* ── Smart Entry box ─────────────────────────────── */}
      <div
        className="rounded-2xl p-4 mb-5"
        style={{
          background: "var(--accent-dim)",
          border: "1px solid var(--border-strong)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <LuSparkles size={14} style={{ color: "var(--accent)" }} />
          <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
            Smart Entry
          </span>
          <span className="text-xs" style={{ color: "var(--text-3)" }}>
            — describe your expense in plain English
          </span>
        </div>

        <div className="flex gap-2">
          <input
            value={nlText}
            onChange={(e) => { setNlText(e.target.value); setParsedOk(false); setParseError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleParse()}
            placeholder={EXAMPLES[Math.floor(Math.random() * EXAMPLES.length) % EXAMPLES.length]}
            className="flex-1 text-sm rounded-xl px-3 py-2 outline-none transition-all duration-200"
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              color: "var(--text-1)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-strong)")}
            onBlur={(e)  => (e.target.style.borderColor = "var(--border)")}
          />
          <button
            type="button"
            onClick={handleParse}
            disabled={isParsing || !nlText.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 flex-shrink-0"
            style={{
              background: isParsing || !nlText.trim()
                ? "var(--text-3)"
                : "var(--accent)",
              cursor: isParsing || !nlText.trim() ? "not-allowed" : "pointer",
              boxShadow: nlText.trim() && !isParsing ? "0 4px 16px var(--accent-glow)" : "none",
            }}
          >
            {isParsing ? (
              <span className="w-3 h-3 rounded-full border border-white border-t-transparent animate-spin" />
            ) : parsedOk ? (
              <LuCircleCheck size={13} />
            ) : (
              <LuArrowRight size={13} />
            )}
            {isParsing ? "Parsing…" : parsedOk ? "Parsed!" : "Parse"}
          </button>
        </div>

        {parseError && (
          <p className="text-xs mt-2" style={{ color: "var(--red)" }}>{parseError}</p>
        )}
        {parsedOk && (
          <p className="text-xs mt-2" style={{ color: "var(--green)" }}>
            ✓ Fields filled — review below and click Add Expense.
          </p>
        )}
      </div>

      {/* ── Manual fields ───────────────────────────────── */}
      <div ref={fieldsRef} className="flex flex-col gap-0">
        <EmojiPickerPopup icon={expense.icon} onSelect={handleIconSelect} />

        <Input
          value={expense.category}
          onChange={({ target }) => handleChange("category", target.value)}
          label="Expense Category"
          placeholder="Food, Rent, Groceries, etc"
          type="text"
        />

        {isSuggesting && (
          <p className="text-xs -mt-3 mb-3 flex items-center gap-1.5" style={{ color: "var(--text-3)" }}>
            <span className="w-3 h-3 rounded-full border border-t-transparent animate-spin inline-block" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
            Suggesting category…
          </p>
        )}
        {!isSuggesting && suggestedCategory && (
          <div className="-mt-3 mb-3 flex items-center gap-2">
            <span className="text-xs" style={{ color: "var(--text-3)" }}>AI suggested:</span>
            <button
              type="button"
              onClick={() => { handleChange("category", suggestedCategory); setSuggestedCategory(""); }}
              className="text-xs px-2.5 py-0.5 rounded-full font-medium transition-all duration-200"
              style={{ background: "var(--accent-dim)", color: "var(--accent)", border: "1px solid var(--border-strong)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent-dim)"; e.currentTarget.style.color = "var(--accent)"; }}
            >
              ✦ {suggestedCategory}
            </button>
          </div>
        )}

        <Input
          value={expense.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          label="Amount"
          placeholder="Enter amount spent"
          type="number"
        />
        <Input
          value={expense.date}
          onChange={({ target }) => handleChange("date", target.value)}
          label="Date"
          placeholder="Enter Date"
          type="date"
        />

        <div className="mb-4">
          <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-2)" }}>
            Payment Method
          </label>
          <select
            value={expense.paidVia}
            onChange={({ target }) => handleChange("paidVia", target.value)}
            className="themed-select"
          >
            <option value="">Select payment method</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
          </select>
        </div>

        <div className="flex justify-end mt-2">
          <button
            type="button"
            className="add-btn add-btn-fill"
            onClick={() => onAddExpense(expense)}
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseForm;
