const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/comment.errormiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 3006;
dotenv.config({ path: "./config/config.env" });
const { authPage } = require("./auth");

const authRouter = require("./routes/auth.route");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/api/comments",
  //authPage(["manager", "admin"]),
  require("./routes/comment.routes")
);
app.use("/api/auth", authRouter);

app.use(errorHandler);
app.listen(port, () => console.log(`server started on port ${port}`));
