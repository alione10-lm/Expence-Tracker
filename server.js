import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { addTransaction } from "./controllers/transaction.controller.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());

app.post("/", addTransaction);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
