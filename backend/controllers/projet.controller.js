import * as projet from "../models/projet.model.js";

// Création du projet
export const creationProjet = async (req, res) => {
  try {
    const { titre, date_projet } = req.body;
    //Validation du projet
    if (!titre || !date_projet) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }
    //Vérification si le projet existe déjà
    const projetExistant = await projet.trouverProjet(titre);
    if (projetExistant) {
      return res.status(409).json({ message: "Projet déjà existant." });
    }
    await projet.creerProjet(titre, date_projet);
    res.status(200).json({ message: "Projet créé" });
  } catch (error) {
    console.error("Erreur d'enregistrement :", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Affichage du projet
export const afficherProjet = async (req, res) => {
  try {
    const { id_projet } = req.params;
    //Vérifier si le projet existe déjà
    const projetExistant = await projet.trouverProjet(id_projet);
    if (!projetExistant) {
      return res.status(404).json({ message: "Projet introuvable" });
    }
    //Retrouver le projet
    res.status(200).json(projetExistant);
  } catch (error) {
    console.error("Erreur d'affichage", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

//Modifier le projet
export const modifProjet = async (req, res) => {
  const { id_projet } = req.params;
  const modification = await projet.modifierProjet(
    id_projet,
    req.body.titre,
    req.body.date_projet
  );
  if (!modification) {
    return res.status(400).json({ message: "Projet non modifié." });
  }
  res.json({ message: "Projet modifié." });
};

//Supprimmer le projet
export const supprProjet = async (req, res) => {
  const { id_projet } = req.params;
  const supprimmer = await projet.supprimmerProjet(id_projet);
  if (!supprimmer) {
    return res.status(404).json({ message: "Projet non trouvé." });
  }
  res.json({ message: "Projet supprimé." });
};
