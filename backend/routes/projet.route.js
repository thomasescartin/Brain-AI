import express from "express";
import {
  creationProjet,
  afficherProjet,
  modifProjet,
  supprProjet,
  tableauProjets,
} from "../controllers/projet.controller.js";

const projetRoute = express.Router();

//Routes d'affichage du projet
projetRoute.post("/", creationProjet);
projetRoute.post("/:id_projet", afficherProjet);
projetRoute.get("/", tableauProjets);

// Routes de gestion du projet
projetRoute.put("/:id_projet", modifProjet);
projetRoute.delete("/:id_projet", supprProjet);

export default projetRoute;
