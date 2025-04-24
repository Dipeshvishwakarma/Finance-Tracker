const express = require("express");
const authRoutes = require("./auth.routes.js");
const transactionRoutes = require("./transaction.routes.js");

const router = express.Router();

router.use("/auth", authRoutes);         
router.use("/transactions", transactionRoutes);  

module.exports = router;
