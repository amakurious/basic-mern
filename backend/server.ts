import express from "express";
import { errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./config/db";
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");

connectDB();

const app = express();

app.use(cors());

// https://stackoverflow.com/a/51844327/9725586
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.urlencoded({ extended: true }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server started on port", port);
});
