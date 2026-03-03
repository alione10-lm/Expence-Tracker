//post transaction

import express from "express";
import {
    addTransaction,
    getTransactions,
} from "../controllers/transaction.controller.js";

const router = express.Router();

//get transaction
router.get("/transactions", getTransactions);

// add transaction
router.post("/transactions", addTransaction);

//get status

// router.get("/transactions/status")

export default router;
