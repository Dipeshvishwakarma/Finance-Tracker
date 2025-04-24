const Transaction = require('../models/Transaction');

async function addTransaction(req, res) {
    const { title, amount, type, date, category, notes } = req.body;

    const transaction = new Transaction({
        userId: req.user.userId,
        title,
        amount,
        type,
        date,
        category,
        notes,
    });

    await transaction.save();
    res.status(201).json(transaction);
}

async function editTransaction(req, res) {
    const transaction = await Transaction.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.userId },
        req.body,
        { new: true }
    );

    if (!transaction) return res.status(404).json({ message: "Transaction not found!" });
    res.json(transaction);
}
async function deleteTransaction(req, res) {
    const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!transaction) return res.status(404).json({ message: "Transaction not found!" });
    res.json({ message: "Transaction deleted successfully!" });
}
async function fetchTransaction(req, res) {
    const { type, category, startDate, endDate, search, page = 1 } = req.query;
    const ITEMS_PER_PAGE = 10;

    const filters = { userId: req.user.userId };
    if (type) filters.type = type;
    if (category) filters.category = category;
    if (startDate || endDate) filters.date = { $gte: new Date(startDate) , $lte: new Date(endDate) };
    if (search) filters.title = { $regex: search, $options: "i" };

    const transactions = await Transaction.find(filters)
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);

    const total = await Transaction.countDocuments(filters);

    res.json({ transactions, total });
}
async function getSummary(req, res) {
    try {
        const summary = await Transaction.aggregate([
            {
                $group: {
                    _id: "$type",
                    totalAmount: { $sum: "$amount" },
                },
            },
        ]);
      
        let totalIncome = 0;
        let totalExpense = 0;

        summary.forEach((group) => {
            if (group._id === "Income") totalIncome += group.totalAmount;
            if (group._id === "Expense") totalExpense += group.totalAmount;
        });

        const balance = totalIncome - totalExpense;

        res.json({ totalIncome, totalExpense, balance });
    } catch (error) {
        console.error("Error fetching summary:", error);
        throw error;
    }
}
module.exports = { addTransaction, editTransaction, deleteTransaction, fetchTransaction, getSummary }