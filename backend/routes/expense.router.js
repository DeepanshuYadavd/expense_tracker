import {
  createExpense,
  deleteExpense,
  fetchExpense,
  filterExpense,
  getTotalSpentPerCategory,
  updateExpense,
} from "../controllers/expense.controller.js";
import express from "express";

const router = express.Router();

// crud  expense
router.post("/add", createExpense);
router.get("/", fetchExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

// filter expense:
router.get("/filter", filterExpense);

// get total spent per category:
router.get("/total-spent", getTotalSpentPerCategory);

export default router;
