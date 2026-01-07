import mongoose from "mongoose";
import Expense from "../models/expense.model.js";
import {
  createExpenseService,
  deleteExpenseService,
  fetchExpenseService,
  filterExpenseService,
  updateExpenseService,
} from "../services/expense.service.js";
// create expense:
const createExpense = async (req, res, next) => {
  try {
    const expenseApiResult = await createExpenseService(req.body);
    if (expenseApiResult && expenseApiResult.message) {
      return res.status(400).json({
        message: expenseApiResult.message,
      });
    }
    return res.status(201).json({
      message: "Expense Created Successfully",
      data: {
        _id: expenseApiResult._id,
        expenseName: expenseApiResult.expenseName,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// fetch all expense:
const fetchExpense = async (req, res, next) => {
  try {
    const ExpenseData = await fetchExpenseService();
    return res.status(200).json(ExpenseData);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// update expense:
const updateExpense = async (req, res, next) => {
  try {
    const updatedData = await updateExpenseService(req.body, req.params.id);
    if (updatedData.message) {
      return res.status(404).json({
        message: updatedData.message,
      });
    }
    return res.status(200).json({
      message: "Expense Updated Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// delete expense:
const deleteExpense = async (req, res, next) => {
  try {
    const deletedData = await deleteExpenseService(req.params.id);
    if (deletedData.message) {
      return res.status(404).json({
        message: deletedData.message,
      });
    }
    return res.status(200).json({
      message: "Expense Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// filter expense:
const filterExpense = async (req, res, nex) => {
  try {
    console.log(req.query);
    const filteredData = await filterExpenseService(req.query);
    if (filteredData.message) {
      return res.status(404).json({
        message: filteredData.message,
      });
    }
    return res.status(200).json(filteredData);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// getTotalSpentPerCategory:
const getTotalSpentPerCategory = async (req, res, next) => {
  try {
    const totalSpentPerCategory = await Expense.aggregate([
      {
        $match: {
          isDone: true,
        },
      },
      {
        $group: {
          _id: "$category",
          totalSpent: {
            $sum: "$price",
          },
        },
      },
      {
        $lookup: {
          from: "categories",
          foreignField: "_id",
          localField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          Category: "$categoryDetails.category",
          totalSpent: 1,
        },
      },
    ]);

    return res.status(200).json(totalSpentPerCategory);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createExpense,
  fetchExpense,
  updateExpense,
  deleteExpense,
  filterExpense,
  getTotalSpentPerCategory,
};
