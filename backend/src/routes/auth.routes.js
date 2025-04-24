const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const express = require('express');
const { Register, Login, RefreshToken } = require("../controllers/authController");
const router = express.Router();
dotenv.config();

router.post("/register", Register);
router.post("/login", Login);

router.post("/refresh", RefreshToken);

module.exports = router;