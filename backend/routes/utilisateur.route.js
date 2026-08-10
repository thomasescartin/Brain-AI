import express from "express";
import {
  register,
  login,
  modifEmail,
  supprimmerCompte,
  me,
  modifierPhoto,
} from "../controllers/utilisateurs.controller.js";
import { authentificationMiddleware } from "../middleware/authentification.middleware.js";
import { rateLimiter } from "../middleware/ratelimiter.middleware.js";
import { uploadAvatar } from "../middleware/upload.middlware.js";

const utilisateurRoute = express.Router();

//Routes d'authentification
utilisateurRoute.post("/register", register);
utilisateurRoute.post("/login", rateLimiter, login);

//Routes Utilisateurs
utilisateurRoute.put("/update", authentificationMiddleware, modifEmail);
utilisateurRoute.put(
  "/photo",
  authentificationMiddleware,
  uploadAvatar.single("photo"),
  modifierPhoto
);
utilisateurRoute.delete(
  "/delete",
  authentificationMiddleware,
  supprimmerCompte
);
utilisateurRoute.get("/me", authentificationMiddleware, me);

export default utilisateurRoute;
