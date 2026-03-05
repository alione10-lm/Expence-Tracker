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
        let {
            page = 1,
            limit = 10,
            type,
            category,
            maxAmount,
            minAmount,
        } = req.query;

        limit = Number(limit);
        page = Number(page);

        let query = {};

        if (type) {
            query.type = type;
        }
        if (category) {
            query.category = category;
        }

        if (minAmount || maxAmount) {
            query.amount = {};
            if (minAmount) query.amount.$gte = Number(minAmount);
            if (maxAmount) query.amount.$lte = Number(maxAmount);
        }

        const skip = (page - 1) * limit;

        const transactions = await Transaction.find(query)
            .skip(skip)
            .limit(limit);

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

// const getMonthlyStats = async (req, res) => {
//     try {
//         const { month, year } = req.query;

//         console.log(month, year);
//         console.log(new Date(year, month));

//         const startDate = new Date(year, month - 1, 1);
//         const endDate = new Date(year, month, 1);

//         const [{ incomesTotal }] = await Transaction.aggregate([
//             {
//                 $match: {
//                     type: "income",
//                     date: { $gte: startDate, $lt: endDate },
//                 },
//             },
//             {
//                 $group: {
//                     _id: null,
//                     incomesTotal: {
//                         $sum: "$amount",
//                     },
//                 },
//             },
//         ]);

//         const [{ expenseTotal }] = await Transaction.aggregate([
//             {
//                 $match: {
//                     date: { $gte: startDate, $lt: endDate },
//                     type: "expense",
//                 },
//             },
//             {
//                 $group: {
//                     _id: null,
//                     expenseTotal: {
//                         $sum: "$amount",
//                     },
//                 },
//             },
//         ]);

//         res.status(200).json({ incomesTotal, expenseTotal });
//     } catch (error) {
//         res.status(500).json({
//             message: "an error occured while getting stats !",
//             err: error.message,
//         });
//     }
// };

const getMonthlyStats = async (req, res) => {
    try {
        const { month, year } = req.query;

        const startDate = new Date(Number(year), Number(month) - 1, 1);
        const endDate = new Date(Number(year), Number(month), 1);

        const incomeResult = await Transaction.aggregate([
            {
                $match: {
                    type: "income",
                    createdAt: { $gte: startDate, $lt: endDate },
                },
            },
            {
                $group: {
                    _id: null,
                    incomesTotal: { $sum: "$amount" },
                },
            },
        ]);

        const incomesTotal = incomeResult[0]?.incomesTotal || 0;

        const expenseResult = await Transaction.aggregate([
            {
                $match: {
                    type: "expense",
                    createdAt: { $gte: startDate, $lt: endDate },
                },
            },
            {
                $group: {
                    _id: null,
                    expenseTotal: { $sum: "$amount" },
                },
            },
        ]);

        const expenseTotal = expenseResult[0]?.expenseTotal || 0;

        const categories = await Transaction.aggregate([
            {
                $match: {
                    type: "expense",
                    createdAt: { $gte: startDate, $lt: endDate },
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" },
                },
            },
        ]);

        const categoriesWithPercentage = categories.map((cat) => ({
            category: cat._id,
            total: cat.total,
            percentage:
                expenseTotal > 0
                    ? Number(((cat.total / expenseTotal) * 100).toFixed(2))
                    : 0,
        }));

        const monthlyBalance = incomesTotal - expenseTotal;

        res.status(200).json({
            monthlyBalance,
            incomesTotal,
            expenseTotal,
            categoriesWithPercentage,
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while getting stats",
            error: error.message,
        });
    }
};

export { getMonthlyStats, addTransaction, getTransactions, calculateBalance };
