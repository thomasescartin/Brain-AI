import * as projet from "../models/projet.model.js";

// Création d'un projet
export const creationProjet = async (req, res) => {
  try {
    const { titre, description, technologies, image_projet } = req.body;

    if (!titre || !description) {
      return res.status(400).json({
        message: "Le titre et la description sont obligatoires.",
      });
    }

    const projetExistant = await projet.trouverProjetParTitre(titre);

    if (projetExistant) {
      return res.status(409).json({
        message: "Ce projet existe déjà.",
      });
    }

    const idProjet = await projet.creerProjet(
      titre,
      description,
      technologies,
      image_projet,
      req.user.id
    );

    res.status(201).json({
      message: "Projet créé avec succès.",
      id_projet: idProjet,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

// Affichage d'un projet
export const afficherProjet = async (req, res) => {
  try {
    const { id_projet } = req.params;

    const projetTrouve = await projet.trouverProjetParId(id_projet);

    if (!projetTrouve) {
      return res.status(404).json({
        message: "Projet introuvable.",
      });
    }

    res.json(projetTrouve);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

// Modification
export const modifProjet = async (req, res) => {
  try {
    const { id_projet } = req.params;

    const { titre, description, technologies, image_projet } = req.body;

    const modification = await projet.modifierProjet(
      id_projet,
      titre,
      description,
      technologies,
      image_projet
    );

    if (!modification) {
      return res.status(404).json({
        message: "Projet non trouvé.",
      });
    }

    res.json({
      message: "Projet modifié.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

// Suppression
export const supprProjet = async (req, res) => {
  try {
    const { id_projet } = req.params;

    const suppression = await projet.supprimerProjet(id_projet);

    if (!suppression) {
      return res.status(404).json({
        message: "Projet introuvable.",
      });
    }

    res.json({
      message: "Projet supprimé.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

// Liste des projets
export const tableauProjets = async (req, res) => {
  try {
    const projets = await projet.tousLesProjets();

    res.json(projets);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};
