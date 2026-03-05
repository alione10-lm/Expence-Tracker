// External Modules
import express from "express";

// Internal Modules
import {
    addTransaction,
    calculateBalance,
    getMonthlyStats,
    getTransactions,
} from "../controllers/transaction.controller.js";
import {
    transactionsValidationRules,
    transactionValidator,
    balanceCheck,
} from "../middleware/transaction.middleware.js";

//post transaction

const router = express.Router();

//get transaction
router.get("/transactions", getTransactions);

// add transaction
router.post(
    "/transactions",
    transactionsValidationRules,
    transactionValidator,
    balanceCheck,
    addTransaction
);

//get balance
router.get("/transactions/balance", calculateBalance);

// get stats
router.get("/transactions/stats", getMonthlyStats);
// router.get("/transactions/status")

export default router;
