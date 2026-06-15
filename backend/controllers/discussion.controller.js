import * as discussion from "../models/discussion.model.js";

//Création de la discussion
export const creationDiscussion = async (req, res) => {
  try {
    const id_utilisateur = req.user.id;
    const { titre, contenue } = req.body;
    //Validation de la discussion
    if (!titre || !contenue) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires." });
    }
    //Vérification si la discussion existe déjà
    const discussionExistante = await discussion.trouverDiscussion(titre);
    if (discussionExistante) {
      return res.status(409).json({ message: "Discussion déjà existante." });
    }
    await discussion.creerDiscussion(titre, contenue, id_utilisateur);
    res.status(201).json({ message: "Discussion créée." });
  } catch (error) {
    console.error("Erreur d'enregistrement:", error.message);
    res.status(500).json({ message: "Erreur serveur." });
    console.log("USER :", req.user);
    console.log("ID USER :", req.user?.id);
    console.log("BODY :", req.body);
    console.log("DISCUSSIONS :", discussions);
    console.log("INSERT ID :", insertId);
  }
};

// Affichage de la discussion
export const afficherDiscussion = async (req, res) => {
  try {
    const { id_discussion } = req.params;
    //Vérifier si la discussion existe déjà
    const discussionExistante = await discussion.trouverDiscussion(
      id_discussion
    );
    if (!discussionExistante) {
      return res.status(404).json({ message: "Discussion inexistante." });
    }
    //Retrouver la discussion
    res.status(200).json(discussionExistante);
  } catch (error) {
    console.error("Erreur d'affichage.", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

//Modifier la discussion
export const modifDiscussion = async (req, res) => {
  try {
    const { id_discussion } = req.params;
    const modification = await discussion.modifierDiscussion(
      id_discussion,
      req.body.titre,
      req.body.contenue
    );
    if (!modification) {
      return res.status(400).json({ message: "Discussion non modifiée." });
    }
    res.json({ message: "Discussion modifiée." });
  } catch (error) {
    console.error("Erreur modification :", error.message);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

//Supprimer la discussion
export const supprDiscussion = async (req, res) => {
  try {
    const { id_discussion } = req.params;
    const supprimer = await discussion.supprimerDiscussion(id_discussion);
    if (!supprimer) {
      res.status(400).json({ message: "Discussion non trouvée." });
    }
    res.json({ message: "Discussion suprimée." });
  } catch (error) {
    console.error("Erreur suppression :", error.message);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

export const tableauDIscussions = async (req, res) => {
  try {
    const discut = await discussion.toutesDiscussions();
    if (!discut) {
      return res.json(404).json({ message: "Discussion introuvable" });
    }
    res.json(discut);
  } catch (error) {
    console.error("ERREUR DISCUSSION :", error); // 🔥 IMPORTANT
    res.status(500).json({ message: "Erreur serveur" });
  }
};
