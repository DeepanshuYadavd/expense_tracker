import { emailAlreadyExistHelper } from "../helpers/auth.helper.js";
import { signinRepo, signupRepo } from "../repository/auth.rep.js";

//  signup service:
export const signupService = async (userData) => {
  const { userName, email, password } = userData;
  // all fields are required:
  if (!(userName && email && password)) {
    return {
      message: "All fields are required",
    };
  }
  // email already exist:
  const user = await emailAlreadyExistHelper(email);
  if (user) {
    return {
      message: "User already exist with this email",
    };
  }

  //   create user:
  const newUser = await signupRepo(userData);
  // remove password filed before sending:
  const { password: pwd, ...newUserData } = newUser.toObject();
  return newUserData;
};

// signin service:
export const signinService = async (userData) => {
  const { email, password } = userData;
  // all fields are required:
  if (!(email && password)) {
    return {
      message: "All fields are required",
    };
  }
  //  find email:
  const user = await signinRepo(email);
  if (!user) {
    return {
      message: "Incorrect email",
    };
  }

  return user;
};
