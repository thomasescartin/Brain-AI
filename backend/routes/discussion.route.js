import express from "express";
import {
  creationDiscussion,
  afficherDiscussion,
  modifDiscussion,
  supprDiscussion,
} from "../controllers/discussion.controller.js";

const discussionRoute = express.Router();

//Routes d'affichage d'une discussion
discussionRoute.post("/:id_utilisateur", creationDiscussion);
discussionRoute.post("/:id_discussion", afficherDiscussion);

//Route de gestion des discussion
discussionRoute.put("/:id_discussion", modifDiscussion);
discussionRoute.delete("/:id_discission", supprDiscussion);

export default discussionRoute;
