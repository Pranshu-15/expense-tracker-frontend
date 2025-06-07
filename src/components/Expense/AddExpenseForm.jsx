import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
    paidVia: "",
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <>
      <div>
        <EmojiPickerPopup
          icon={expense.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />

        <Input
          value={expense.category}
          onChange={({ target }) => handleChange("category", target.value)}
          label="Expense Category"
          placeholder="Food, Rent, Groceries, etc"
          type="text"
        />
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <select
            value={expense.paidVia}
            onChange={({ target }) => handleChange("paidVia", target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select payment method</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
          </select>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="add-btn add-btn-fill"
            onClick={() => onAddExpense(expense)}
          >
            Add Expense
          </button>
        </div>
      </div>
    </>
  );
};

export default AddExpenseForm;
