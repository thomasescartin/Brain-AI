import express from "express";
import {
  creationCommentaire,
  afficherCommentaire,
  modifCommentaire,
  supprCommentaire,
} from "../controllers/commentaire.controller.js";

const commantaireRoute = express.Router();

//Routes d'affichage des commentaires
commantaireRoute.post("/", creationCommentaire);
commantaireRoute.post("/:id_commentaire", afficherCommentaire);

//Routes pour la gestion des commentaires
commantaireRoute.put("/:id_commentaire", modifCommentaire);
commantaireRoute.delete("/:id_commentaire", supprCommentaire);

export default commantaireRoute;
