const jwt = require("jsonwebtoken");

const isLogin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Access Denied: You are not logged in" });
  }

  try {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err1) {
      try {
        decoded = jwt.verify(token, process.env.ADMIN_JWT_CODE);
      } catch (err2) {
        throw new Error("Invalid token from both secrets");
      }
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = isLogin;
