const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["Income", "Expense"], required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  notes: { type: String },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
