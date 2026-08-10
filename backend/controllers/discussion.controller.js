import * as discussion from "../models/discussion.model.js";

// Création d'une discussion
export const creationDiscussion = async (req, res) => {
  try {
    const id_utilisateur = req.user.id;

    const { titre, contenue } = req.body;

    // Validation
    if (!titre || !contenue) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires.",
      });
    }

    // Vérification du titre
    const discussionExistante = await discussion.trouverDiscussionParTitre(
      titre
    );

    if (discussionExistante) {
      return res.status(409).json({
        message: "Discussion déjà existante.",
      });
    }

    const idDiscussion = await discussion.creerDiscussion(
      titre,
      contenue,
      id_utilisateur
    );

    res.status(201).json({
      message: "Discussion créée.",
      id_discussion: idDiscussion,
    });
  } catch (error) {
    console.error("Erreur d'enregistrement :", error.message);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

// Affichage d'une discussion
export const afficherDiscussion = async (req, res) => {
  try {
    const { id_discussion } = req.params;

    const discussionExistante = await discussion.trouverDiscussion(
      id_discussion
    );

    if (!discussionExistante) {
      return res.status(404).json({
        message: "Discussion inexistante.",
      });
    }

    res.status(200).json(discussionExistante);
  } catch (error) {
    console.error("Erreur d'affichage :", error.message);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

// Modifier une discussion
export const modifDiscussion = async (req, res) => {
  try {
    const { id_discussion } = req.params;

    const { titre, contenue } = req.body;

    if (!titre || !contenue) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires.",
      });
    }

    const modification = await discussion.modifierDiscussion(
      id_discussion,
      titre,
      contenue
    );

    if (!modification) {
      return res.status(404).json({
        message: "Discussion non trouvée.",
      });
    }

    res.json({
      message: "Discussion modifiée.",
    });
  } catch (error) {
    console.error("Erreur modification :", error.message);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

// Supprimer une discussion
export const supprDiscussion = async (req, res) => {
  try {
    const { id_discussion } = req.params;

    const suppression = await discussion.supprimerDiscussion(id_discussion);

    if (!suppression) {
      return res.status(404).json({
        message: "Discussion non trouvée.",
      });
    }

    res.json({
      message: "Discussion supprimée.",
    });
  } catch (error) {
    console.error("Erreur suppression :", error.message);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

// Liste des discussions
export const tableauDiscussions = async (req, res) => {
  try {
    const discussions = await discussion.toutesDiscussions();

    res.status(200).json(discussions);
  } catch (error) {
    console.error("ERREUR DISCUSSION :", error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};
