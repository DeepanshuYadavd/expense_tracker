import mongoose from "mongoose";
import Category from "../models/category.model.js";

export const CreateCategoryRepo = async (category) => {
  return await Category.create({
    category,
  });
};

export const fetchCategoryRepo = async (category) => {
  return await Category.findOne({
    category,
  });
};
