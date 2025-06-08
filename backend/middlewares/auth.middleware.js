import jwt from "jsonwebtoken";

// verify token and grant access:
const authentication = (req, res, next) => {
  // if token in cookie || if token in headers of every request::
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  // access token missing then 401 error:
  if (!token) {
    return res.status(401).json({
      message: "Access token missing",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
};

export default authentication;
