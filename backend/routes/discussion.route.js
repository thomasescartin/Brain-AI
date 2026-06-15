import express from "express";
import {
  creationDiscussion,
  afficherDiscussion,
  modifDiscussion,
  supprDiscussion,
  tableauDIscussions,
} from "../controllers/discussion.controller.js";
import { authentificationMiddleware } from "../middleware/authentification.middleware.js";

const discussionRoute = express.Router();

//Routes d'affichage d'une discussion
discussionRoute.post("/", authentificationMiddleware, creationDiscussion);
discussionRoute.post("/:id_discussion", afficherDiscussion);

//Route de gestion des discussion
discussionRoute.put(
  "/:id_discussion",
  authentificationMiddleware,
  modifDiscussion
);
discussionRoute.delete("/:id_discussion", supprDiscussion);
discussionRoute.get("/", tableauDIscussions);

export default discussionRoute;
