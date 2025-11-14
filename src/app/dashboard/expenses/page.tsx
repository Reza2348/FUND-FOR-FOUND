"use client";

import React, { useState } from "react";
import AddExpenseModal from "@/components/ExpenseModal/ExpenseModal";

interface ExpenseItem {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
}

interface ExpenseDataFromModal {
  description: string;
  amount: string;
  date: string;
  category: string;
}

interface SummaryCardProps {
  title: string;
  value: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

interface EditModalProps {
  expense: ExpenseItem;
  onClose: () => void;
  onSave: (editedExpense: ExpenseItem) => void;
}

const initialExpensesData: ExpenseItem[] = [
  {
    id: 1,
    date: "2025-07-15",
    description: "Grocery shopping",
    category: "Food",
    amount: -55.5,
  },
  {
    id: 2,
    date: "2025-07-14",
    description: "Monthly rent",
    category: "Housing",
    amount: -750.0,
  },
  {
    id: 3,
    date: "2025-07-13",
    description: "Netflix subscription",
    category: "Entertainment",
    amount: -15.99,
  },
  {
    id: 4,
    date: "2025-07-12",
    description: "Salary deposit (Income)",
    category: "Income",
    amount: 3000.0,
  },
];

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  bgColor,
  textColor,
}) => (
  <div
    className={`p-5 rounded-xl shadow-lg ${bgColor} transform hover:scale-[1.02] transition duration-300`}
  >
    <div className="flex justify-between items-center">
      <div
        className={`p-3 rounded-full ${
          bgColor === "bg-white" ? "bg-indigo-100" : "bg-opacity-20"
        } ${textColor}`}
      >
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
    </div>
    <p className={`mt-2 text-3xl font-extrabold ${textColor}`}>{value}</p>
  </div>
);

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "always",
  }).format(amount);
};

const EditModal: React.FC<EditModalProps> = ({ expense, onClose, onSave }) => {
  const [editedItem, setEditedItem] = useState(expense);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSave = () => {
    if (editedItem.description && editedItem.amount !== 0) {
      onSave(editedItem);
      onClose();
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600/40 backdrop-blur-sm"></div>

      <div className="relative bg-white/20 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Edit transaction
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={editedItem.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={editedItem.amount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={editedItem.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Food">Food</option>
              <option value="Housing">Housing</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Income">Income</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={editedItem.date}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpensesData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<ExpenseItem | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  let nextId = Math.max(...expenses.map((e) => e.id), 0) + 1;

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      const updatedExpenses = expenses.filter((e) => e.id !== id);
      setExpenses(updatedExpenses);
    }
  };

  const handleEdit = (expense: ExpenseItem) => {
    setCurrentEditItem(expense);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedExpense: ExpenseItem) => {
    const updatedExpenses = expenses.map((e) =>
      e.id === editedExpense.id ? editedExpense : e
    );
    setExpenses(updatedExpenses);
    setIsEditModalOpen(false);
    setCurrentEditItem(null);
  };

  const handleSaveNewExpense = (newExpenseData: ExpenseDataFromModal) => {
    const amountAsNumber = parseFloat(newExpenseData.amount);

    const finalAmount =
      amountAsNumber * (newExpenseData.category === "Income" ? 1 : -1);

    const newExpense: Omit<ExpenseItem, "id"> = {
      description: newExpenseData.description,
      category: newExpenseData.category,
      date: newExpenseData.date,
      amount: finalAmount,
    };

    const expenseWithId: ExpenseItem = {
      ...newExpense,
      id: nextId++,
    };
    setExpenses((prev) => [...prev, expenseWithId]);
    setIsAddModalOpen(false);
  };

  const totalExpenses: number = expenses
    .filter((e: ExpenseItem) => e.amount < 0)
    .reduce((sum: number, e: ExpenseItem) => sum + e.amount, 0);

  const totalIncome: number = expenses
    .filter((e: ExpenseItem) => e.amount > 0)
    .reduce((sum: number, e: ExpenseItem) => sum + e.amount, 0);

  const balance: number = totalIncome + totalExpenses;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 lg:ml-[34px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
          📊 Costs page
        </h1>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150"
          onClick={() => setIsAddModalOpen(true)}
        >
          ➕ Add new expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Account balance"
          value={formatCurrency(balance)}
          icon="💵"
          bgColor="bg-white"
          textColor={balance >= 0 ? "text-green-600" : "text-red-600"}
        />
        <SummaryCard
          title="Total costs"
          value={formatCurrency(totalExpenses)}
          icon="🔻"
          bgColor="bg-white"
          textColor="text-red-600"
        />
        <SummaryCard
          title="Total income"
          value={formatCurrency(totalIncome)}
          icon="🔺"
          bgColor="bg-white"
          textColor="text-green-600"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Transaction list
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map((expense: ExpenseItem) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {expense.date}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                    {expense.description}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${
                                              expense.amount > 0
                                                ? "bg-green-100 text-green-800"
                                                : "bg-indigo-100 text-indigo-800"
                                            }`}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-6 whitespace-nowrap text-sm font-bold text-right ${
                      expense.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="text-indigo-600 hover:text-indigo-900 ml-3 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {expenses.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No transactions found.
          </p>
        )}
      </div>

      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewExpense}
      />

      {isEditModalOpen && currentEditItem && (
        <EditModal
          expense={currentEditItem}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default ExpensesPage;
