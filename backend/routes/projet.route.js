import express from "express";
import {
  creationProjet,
  afficherProjet,
  modifProjet,
  supprProjet,
} from "../controllers/projet.controller.js";

const projetRoute = express.Router();

//Routes d'affichage du projet
projetRoute.post("/", creationProjet);
projetRoute.post("/id_projet", afficherProjet);

// Routes de gestion du projet
projetRoute.put("/id_projet", modifProjet);
projetRoute.delete("/id_projet", supprProjet);

export default projetRoute;
