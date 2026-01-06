import User from "../models/auth.model.js";

// check email exist or not:
export const emailAlreadyExistHelper = async (email) => {
  return await User.findOne({ email });
};
