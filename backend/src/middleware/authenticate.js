const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access token required!" });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
      if (err) return res.status(403).json({ message: "Invalid token!" });
      req.user = userData;
      next();
    });
  };
  
  module.exports = authenticateToken;
  