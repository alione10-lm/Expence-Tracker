//post transaction

import express from "express";
import {
    addTransaction,
    calculateBalance,
    getMonthlyStats,
    getTransactions,
} from "../controllers/transaction.controller.js";

const router = express.Router();

//get transaction
router.get("/transactions", getTransactions);

// add transaction
router.post("/transactions", addTransaction);

//get balance
router.get("/transactions/balance", calculateBalance);

// get stats
router.get("/transactions/stats", getMonthlyStats);
// router.get("/transactions/status")

export default router;
