import express from "express";
import {
  register,
  login,
  modifEmail,
  supprimmerCompte,
} from "../controllers/utilisateurs.controller.js";

const utilisateurRoute = express.Router();

//Routes d'authentification
utilisateurRoute.post("/register", register);
utilisateurRoute.post("/login", login);

//Routes Utilisateurs
utilisateurRoute.put("/update", modifEmail);
utilisateurRoute.delete("/delete", supprimmerCompte);

export default utilisateurRoute;
