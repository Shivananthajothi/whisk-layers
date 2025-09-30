// server/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const header = req.header("Authorization");
  if (!header) return res.status(401).json({ msg: "No token" });
  const token = header.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id || decoded.userId || decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token invalid" });
  }
};
