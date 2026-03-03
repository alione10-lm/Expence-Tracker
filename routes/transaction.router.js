//post transaction

import express from "express";
import {
    addTransaction,
    calculateBalance,
    getTransactions,
} from "../controllers/transaction.controller.js";

const router = express.Router();

//get transaction
router.get("/transactions", getTransactions);

// add transaction
router.post("/transactions", addTransaction);

//get balance
router.get("/transactions/balance", calculateBalance);

// router.get("/transactions/status")

export default router;
