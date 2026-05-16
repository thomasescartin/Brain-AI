import express from "express";
import {
  register,
  login,
  modifEmail,
  supprimmerCompte,
} from "../controllers/utilisateurs.controller";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.put("update", modifEmail);
route.delete("/delete", supprimmerCompte);

export default route;
