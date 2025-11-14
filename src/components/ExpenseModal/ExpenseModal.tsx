import React, { useState } from "react";

interface ExpenseData {
  description: string;
  amount: string;
  date: string;
  category: string;
}

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newExpense: ExpenseData) => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  // 1. **Move useState to the top level**
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "Food",
  });

  // 2. The conditional return now comes after the hook call.
  if (!isOpen) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (
      !expenseData.description ||
      !expenseData.amount ||
      parseFloat(expenseData.amount) === 0
    ) {
      alert("Please enter a description and a non-zero amount.");
      return;
    }
    onSave(expenseData);
    onClose();
    setExpenseData({
      description: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      category: "Food",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* ... rest of the modal JSX ... */}
      <div
        className="absolute inset-0 bg-gray-600/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div
        className="relative bg-white/20 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-white/20 p-5">
          <h3 className="text-xl font-bold text-gray-800">
            ➕ Add new expense
          </h3>
          <button
            className="text-gray-400 hover:text-gray-600 text-3xl transition"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description/title of cost
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={expenseData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              placeholder="Buy coffee, pay monthly rent, etc."
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={expenseData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            >
              <option value="Food">Food</option>
              <option value="Housing">Housing</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Income">Income</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount (USD)
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={expenseData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              placeholder="55.00"
              min="0"
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cost date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={expenseData.date || ""}
              placeholder="11/14/2025"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>
        </div>

        <div className="flex justify-end p-5 border-t border-white/20 bg-white/10 rounded-b-xl space-x-3">
          <button
            className="bg-gray-200/70 hover:bg-gray-300/70 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-indigo-600/80 hover:bg-indigo-700/80 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150"
            onClick={handleSave}
          >
            Cost savings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;
