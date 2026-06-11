import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: "Trop de tentatives, réessayez dans une minutes.",
});
