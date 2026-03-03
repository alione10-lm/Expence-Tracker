//post transaction

import express from "express";
import { getTransactions } from "../controllers/transaction.controller.js";

const router = express.Router();

router.get("/transactions", getTransactions);

//get transaction

// router.get("/transactions")

//get status

// router.get("/transactions/status")

export default router;
