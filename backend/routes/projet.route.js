import express from "express";
import {
  creationProjet,
  afficherProjet,
  modifProjet,
  supprProjet,
  tableauProjets,
} from "../controllers/projet.controller.js";

import { authentificationMiddleware } from "../middleware/authentification.middleware.js";

const projetRoute = express.Router();

// Lecture
projetRoute.get("/", authentificationMiddleware, tableauProjets);
projetRoute.get("/:id_projet", authentificationMiddleware, afficherProjet);

// Création
projetRoute.post("/", authentificationMiddleware, creationProjet);

// Modification
projetRoute.put("/:id_projet", authentificationMiddleware, modifProjet);

// Suppression
projetRoute.delete("/:id_projet", authentificationMiddleware, supprProjet);

export default projetRoute;
