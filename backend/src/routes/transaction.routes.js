const express = require('express');
const authenticateToken = require('../middleware/authenticate');
const { addTransaction, editTransaction, fetchTransaction, deleteTransaction, getSummary } = require('../controllers/transactionController');
const router = express.Router();

router.post("/", authenticateToken, addTransaction);

router.put("/:id", authenticateToken, editTransaction);

router.delete("/:id", authenticateToken, deleteTransaction);

router.get("/", authenticateToken, fetchTransaction);


// router.get("/", authenticateToken, async (req, res) => {
//   try {
//     const { type, category, startDate, endDate, search, page = 1, limit = 10 } = req.query;
//     const filters = { userId: req.user.userId };

//     if (type) filters.type = type;
//     if (category) filters.category = category;
//     if (startDate || endDate) {
//       filters.date = {};
//       if (startDate) filters.date.$gte = new Date(startDate);
//       if (endDate) filters.date.$lte = new Date(endDate);
//     }
//     if (search) filters.title = { $regex: search, $options: "i" };


//     const ITEMS_PER_PAGE = parseInt(limit, 10);
//     const currentPage = parseInt(page, 10);
//     const skip = (currentPage - 1) * ITEMS_PER_PAGE;

//     const transactions = await Transaction.find(filters)
//       .skip(skip)
//       .limit(ITEMS_PER_PAGE);


//     const total = await Transaction.countDocuments(filters);

//     res.json({
//       transactions,
//       total,
//       totalPages: Math.ceil(total / ITEMS_PER_PAGE),
//       currentPage,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching transactions", error });
//   }
// });

router.get("/summary", authenticateToken, getSummary);


module.exports = router;