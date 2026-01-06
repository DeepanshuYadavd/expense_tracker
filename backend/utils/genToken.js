import jwt from "jsonwebtoken";
//  generate token :
export const generate = {
  accessToken: (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
  },
  refreshToken: (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  },
};

export default generate;
