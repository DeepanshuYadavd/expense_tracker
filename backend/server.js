// import
import app from "./app.js";
import dotenv from "dotenv";
import db from "./config/db.js";
// configuration
dotenv.config();

// db
db();

// localhost:
app.listen(process.env.PORT || 5000, () => {
  console.log(`localhost running at ${process.env.PORT}`);
});
