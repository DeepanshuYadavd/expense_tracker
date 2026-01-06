import User from "../models/auth.model.js";

// signup:
export const signupRepo = async (userData) => {
  return await User.create(userData);
};

// signin
export const signinRepo = async (email) => {
  return await User.findOne({ email });
};
