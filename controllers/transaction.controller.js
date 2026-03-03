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

const calculateBalance = async (req, res) => {
    try {
        const result = await Transaction.aggregate([
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
                        },
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                "$amount",
                                0,
                            ],
                        },
                    },
                },
            },
        ]);

        if (!result.length) {
            res.status(200).json({ balace: 0 });
        }

        const { totalIncome, totalExpense } = result[0];

        res.status(200).json({
            balance: totalIncome - totalExpense,
            totalIncome,
            totalExpense,
        });
    } catch (err) {
        res.status(500).json({ message: "failed to calculate balance ! " });
    }
};

export { addTransaction, getTransactions, calculateBalance };
