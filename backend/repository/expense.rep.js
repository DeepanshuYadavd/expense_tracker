import Expense from "../models/expense.model.js";

// createExpense:
export const createExpenseRepo = async (expenseData) => {
  return await Expense.create(expenseData);
};

// fetchExpense:
export const fetchExpenseRepo = async () => {
  return await Expense.find()
    .populate([
      {
        path: "category",
      },
      {
        path: "user",
      },
    ])
    .sort({ createdAt: -1 });
};

// updateExpense:
export const updateExpenseRepo = async (data, id) => {
  const updatedData = await Expense.findByIdAndUpdate(id, data);
  if (!updatedData) {
    return {
      message: "Expense is Missing",
    };
  }
  return updatedData;
};

// delete expense :
export const deleteExpenseRepo = async (id) => {
  const deletedData = await Expense.findByIdAndDelete(id);
  if (!deletedData) {
    return {
      message: "Expense not Found",
    };
  }
  return deletedData;
};

// filter expense repo:
export const filterExpenseRepo = async (query) => {
  return await Expense.find(query)
    .populate([
      {
        path: "category",
      },
      {
        path: "user",
      },
    ])
    .sort({ createdAt: -1 });
};
