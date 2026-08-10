import express from "express";

import {
  creationDiscussion,
  afficherDiscussion,
  modifDiscussion,
  supprDiscussion,
  tableauDiscussions,
} from "../controllers/discussion.controller.js";

import { authentificationMiddleware } from "../middleware/authentification.middleware.js";

const discussionRoute = express.Router();

// Affichage de toutes les discussions
discussionRoute.get("/", tableauDiscussions);

// Affichage d'une discussion
discussionRoute.get("/:id_discussion", afficherDiscussion);

// Création
discussionRoute.post("/", authentificationMiddleware, creationDiscussion);

// Modification
discussionRoute.put(
  "/:id_discussion",
  authentificationMiddleware,
  modifDiscussion
);

// Suppression
discussionRoute.delete(
  "/:id_discussion",
  authentificationMiddleware,
  supprDiscussion
);

export default discussionRoute;
