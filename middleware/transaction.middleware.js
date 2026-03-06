import { body, validationResult } from "express-validator";
import Transaction from "../models/transaction.schema.js";

export const transactionsValidationRules = [
    body("title").notEmpty().withMessage("The transaction title is required"),
    body("amount")
        .notEmpty()
        .withMessage("The transaction amount is required")
        .isInt({ min: 1 })
        .withMessage("The transaction amount must greater than '0'"),
    body("type")
        .notEmpty()
        .withMessage("The transaction type is required")
        .isIn(["income", "expense"])
        .withMessage("The type must be either 'income' or 'expense'"),
    body("category")
        .if((value, { req }) => req.body.type === "expense")
        .notEmpty()
        .withMessage(
            "The category must specified in the expenses transactions",
        ),
];

export const transactionValidator = (req, res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        return res.status(400).json({ errors: validation.errors });
    }

    next();
};

export const balanceCheck = async (req, res, next) => {
    if (req.body.type == "income") {
        return next();
    }

    try {
        const incomes = await Transaction.aggregate([
            { $match: { type: "income" } },
            {
                $group: {
                    _id: null,
                    totalSum: { $sum: "$amount" },
                },
            },
        ]);
        const expenses = await Transaction.aggregate([
            { $match: { type: "expense" } },
            {
                $group: {
                    _id: null,
                    totalSum: { $sum: "$amount" },
                },
            },
        ]);

        const incomesTotal = incomes[0]?.totalSum || 0;
        const expenseTotal = expenses[0]?.totalSum || 0;

        if (incomesTotal - expenseTotal < 0) {
            res.status(400).json({
                error: "The transaction cannot be processed because the balance will become negative",
            });
        } else {
            next();
        }
    } catch (e) {
        console.log(e.message);
        return res
            .status(500)
            .json({ error: "An internal error occured, try again!" });
    }
};
