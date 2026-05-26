import { dateConnexion } from "../models/connexion.model.js";

//Création d'une date de connexion
export const creationConnexion = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    await dateConnexion(id_utilisateur);
    res.status(201).json({ message: "Connexion créée." });
  } catch (error) {
    console.error("Erreur d'enregistrement", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
