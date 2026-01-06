import {
  CreateCategoryRepo,
  fetchCategoryRepo,
} from "../repository/category.rep.js";

export const createCategoryService = async (category) => {
  if (category) {
    return await CreateCategoryRepo(category);
  }
};

export const fetchCategoryService = async (category) => {
  if (category) {
    return await fetchCategoryRepo(category);
  }
};
