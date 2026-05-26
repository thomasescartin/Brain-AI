import express from "express";
import {
  creationCommentaire,
  afficherCommentaire,
  modifCommentaire,
  supprCommentaire,
} from "../controllers/commentaire.controller.js";

const commentaireRoute = express.Router();

//Routes d'affichage des commentaires
commentaireRoute.post("/", creationCommentaire);
commentaireRoute.post("/:id_commentaire", afficherCommentaire);

//Routes pour la gestion des commentaires
commentaireRoute.put("/:id_commentaire", modifCommentaire);
commentaireRoute.delete("/:id_commentaire", supprCommentaire);

export default commentaireRoute;
