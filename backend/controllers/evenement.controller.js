import * as evenement from "../models/evenement.model.js";

// Création d'un évènement
export const creationEvenement = async (req, res) => {
  try {
    const { titre, description, lieu, date_evenement } = req.body;

    if (!titre || !description || !lieu || !date_evenement) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires.",
      });
    }

    const evenementExistant = await evenement.trouverEvenementParTitre(titre);

    if (evenementExistant) {
      return res.status(409).json({
        message: "Cet évènement existe déjà.",
      });
    }

    const idEvenement = await evenement.creerEvenement(
      titre,
      description,
      lieu,
      date_evenement,
      req.user.id
    );

    res.status(201).json({
      message: "Évènement créé avec succès.",
      id_evenement: idEvenement,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

// Affichage d'un évènement
export const afficherEvenement = async (req, res) => {
  try {
    const { id_evenement } = req.params;

    const event = await evenement.trouverEvenementParId(id_evenement);

    if (!event) {
      return res.status(404).json({
        message: "Évènement introuvable.",
      });
    }

    res.json(event);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

// Modification
export const modifEvenement = async (req, res) => {
  try {
    const { id_evenement } = req.params;

    const { titre, description, lieu, date_evenement } = req.body;

    const modification = await evenement.modifierEvenement(
      id_evenement,
      titre,
      description,
      lieu,
      date_evenement
    );

    if (!modification) {
      return res.status(404).json({
        message: "Évènement introuvable.",
      });
    }

    res.json({
      message: "Évènement modifié.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

// Suppression
export const supprEvenement = async (req, res) => {
  try {
    const { id_evenement } = req.params;

    const suppression = await evenement.supprimerEvenement(id_evenement);

    if (!suppression) {
      return res.status(404).json({
        message: "Évènement introuvable.",
      });
    }

    res.json({
      message: "Évènement supprimé.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

// Liste complète
export const tableauEvenements = async (req, res) => {
  try {
    const evenements = await evenement.tousLesEvenements();

    res.json(evenements);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};
