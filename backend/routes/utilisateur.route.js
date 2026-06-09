import express from "express";
import {
  register,
  login,
  modifEmail,
  supprimmerCompte,
  me,
} from "../controllers/utilisateurs.controller.js";
import { authentificationMiddleware } from "../middleware/authentification.middleware.js";

const utilisateurRoute = express.Router();

//Routes d'authentification
utilisateurRoute.post("/register", register);
utilisateurRoute.post("/login", login);

//Routes Utilisateurs
utilisateurRoute.put("/update", authentificationMiddleware, modifEmail);
utilisateurRoute.delete("/delete", supprimmerCompte);
utilisateurRoute.get("/me", authentificationMiddleware, me);

export default utilisateurRoute;
