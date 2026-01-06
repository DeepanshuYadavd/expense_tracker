import {
  createExpenseRepo,
  deleteExpenseRepo,
  fetchExpenseRepo,
  filterExpenseRepo,
  updateExpenseRepo,
} from "../repository/expense.rep.js";
import {
  createCategoryService,
  fetchCategoryService,
} from "./category.services.js";

// create expense service:
export const createExpenseService = async (expenseData) => {
  const { expenseName, price, category, user } = expenseData;
  if (!expenseName || !price || !category || !user) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const existingCategory = await fetchCategoryService(category);

  let newCategory;
  if (!existingCategory) {
    newCategory = await createCategoryService(category);
  }
  const newExpenseData = {
    expenseName,
    price,
    category: !existingCategory ? newCategory._id : existingCategory._id,
    user,
  };

  return await createExpenseRepo(newExpenseData);
};

// fetch expense service:
export const fetchExpenseService = async () => {
  const allExpenses = await fetchExpenseRepo();
  if (!allExpenses || allExpenses.length === 0) {
    return {
      message: "No Expense Is Available",
    };
  }

  const price_to_be_paid = allExpenses.reduce((price, item) => {
    if (item.isDone) {
      return price;
    } else {
      return price + Number(item.price);
    }
  }, 0);

  return {
    allExpenses,
    price_to_be_paid,
  };
};

// update expense data:
export const updateExpenseService = async (data, id) => {
  if (!id) {
    return {
      message: "Something went Wrong",
    };
  }
  const { expenseName, price, category, user, isDone } = data;
  if (!expenseName || !price || !category || !user) {
    return {
      message: "All fields are required",
    };
  }
  const existingCategory = await fetchCategoryService(category);

  let newCategory;
  if (!existingCategory) {
    newCategory = await createCategoryService(category);
  }
  const newExpenseData = {
    expenseName,
    price,
    category: !existingCategory ? newCategory._id : existingCategory._id,
    user,
    isDone,
  };

  return await updateExpenseRepo(newExpenseData, id);
};

// delete expense data:
export const deleteExpenseService = async (id) => {
  if (!id) {
    return {
      message: "Something went Wrong",
    };
  }
  return await deleteExpenseRepo(id);
};

// filter expense data:
export const filterExpenseService = async (query) => {
  let newQuery = { ...query, isDone: query.isDone === "true" ? true : false };
  const filteredExpense = await filterExpenseRepo(newQuery);
  if (!filteredExpense || filteredExpense.length === 0) {
    return {
      message: "Expense not Available",
    };
  }
  return filteredExpense;
};
