import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function auth(req, res, next) {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ msg: "No token, auth denied" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
}
