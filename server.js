// External Modules
import express from "express";
import dotenv from "dotenv";

// Internal Modules
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transaction.router.js";

const PORT = process.env.PORT || 5000;

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// GET -->  localhost:5000/api/transactions
// POST -->  localhost:5000/api/transactions
app.use("/api", transactionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
