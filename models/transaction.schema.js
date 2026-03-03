import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 1,
        },
        type: {
            type: String,
            required: true,
            enum: ["income", "expense"],
            message: "The type must be either 'income' or 'expense'",
        },
        category: {
            type: String,
            required: () => this.type === "expense",
        },
        date: Date,
    },
    { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
