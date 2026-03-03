import Transaction from "../models/transaction.schema.js";

const addTransaction = async (req, res) => {
    try {
        const { type, title, date, amount, category } = req.body;

        const transaction = await Transaction.create({
            type,
            title,
            amount,
            category,
            date,
        });

        res.status(201).json({
            success: true,
            data: transaction,
        });
    } catch (error) {
        console.log(error.message);

        res.status(400).json("failed to create transaction !");
    }
};

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        res.status(200).json({
            success: true,
            data: transactions,
        });
    } catch (err) {
        res.status(500).json({
            message: "failed to load transactions !",
        });
    }
};

export { addTransaction, getTransactions };
