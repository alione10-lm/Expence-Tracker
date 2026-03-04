import { body, validationResult } from "express-validator";

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
            "The category must specified in the expenses transactions"
        ),
];

export const transactionValidator = (req, res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        return res.status(400).json({ errors: validation.errors });
    }

    next();
};
