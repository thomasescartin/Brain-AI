import express from "express";

import {
  creationEvenement,
  afficherEvenement,
  modifEvenement,
  supprEvenement,
  tableauEvenements,
} from "../controllers/evenement.controller.js";

import { authentificationMiddleware } from "../middleware/authentification.middleware.js";

const evenementRoute = express.Router();

// Lecture
evenementRoute.get("/", authentificationMiddleware, tableauEvenements);

evenementRoute.get(
  "/:id_evenement",
  authentificationMiddleware,
  afficherEvenement
);

// Création
evenementRoute.post("/", authentificationMiddleware, creationEvenement);

// Modification
evenementRoute.put(
  "/:id_evenement",
  authentificationMiddleware,
  modifEvenement
);

// Suppression
evenementRoute.delete(
  "/:id_evenement",
  authentificationMiddleware,
  supprEvenement
);

export default evenementRoute;
