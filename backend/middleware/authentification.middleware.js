import jwt from "jsonwebtoken";
import "dotenv/config";

export const authentificationMiddleware = (res, req, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Accès refusé" });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};
