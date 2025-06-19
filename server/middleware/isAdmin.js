const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "Access Denied: No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_CODE);

    if (decoded.role !== "admin") {
      console.log("Not an admin");
      return res.status(403).json({ message: "Access Denied: Not an admin" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    console.error("isAdmin error:", err.message);
    return res.status(401).json({ message: "Invalid or expired admin token" });
  }
};

module.exports = isAdmin;
