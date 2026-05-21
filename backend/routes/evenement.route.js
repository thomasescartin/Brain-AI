import express from "express";
import {
  creationEvenement,
  afficherEvenement,
  modifEvenement,
  supprEvenement,
} from "../controllers/evenement.controller.js";

const evenementRoute = express.Router();

//Routes d'affichage de l'évènement
evenementRoute.post("/creation", creationEvenement);
evenementRoute.post("/affichage", afficherEvenement);

//Route de gestion de l'évènement
evenementRoute.put("/modificationEvent", modifEvenement);
evenementRoute.delete("/supprimmer", supprEvenement);

export default evenementRoute;
