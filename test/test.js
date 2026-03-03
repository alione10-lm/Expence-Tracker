import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      min: 1,
      required: true,
    },
    date: Date,
  },

  { timestamps: true },
);

export default mongoose.model("Transaction", TransactionSchema);
