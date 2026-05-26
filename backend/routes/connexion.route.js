import express from "express";
import { creationConnexion } from "../controllers/connexion.controller.js";

const connexionRoute = express.Router();

connexionRoute.post("/", creationConnexion);

export default connexionRoute;
