import express from "express";
import { errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./config/db";
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server started on port", port);
});
