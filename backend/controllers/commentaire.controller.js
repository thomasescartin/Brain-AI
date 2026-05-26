import * as commentaire from "../models/commentaire.model.js";

// Création d'un commentaire
export const creationCommentaire = async (req, res) => {
  try {
    const { id_commentaire, id_utilisateur, id_discussion } = req.params;
    const { contenue } = req.body;
    // Validation du commentaire
    if (!contenue) {
      return res.status(400).json({ message: "Un texte est obligatoire." });
    }
    //Vérifier si le commentaire existe déjà
    const commentaireExistant = await commentaire.trouverCommentaire(
      id_commentaire
    );
    if (commentaireExistant) {
      return res.status(409).json({ message: "Commentaire déjà existant." });
    }
    await commentaire.creerCommentaire(contenue, id_utilisateur, id_discussion);
    res.status(201).json({ message: "Commentaire crée." });
  } catch (error) {
    console.error("Erreur d'enregistrement :", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

//Afficher un commentaire
export const afficherCommentaire = async (req, res) => {
  try {
    const { id_commentaire } = req.params;
    //Vérifier si le commantaire existe déjà
    const commentaireExistant = await commentaire.trouverCommentaire(
      id_commentaire
    );
    if (!commentaireExistant) {
      return res.status(404).json({ message: "Commentaire introuvable." });
    }
    //Retrouver le commantaire
    res.status(200).json(commentaireExistant);
  } catch (error) {
    console.error("Erreur d'affichage :", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

//Modifier un commentaire
export const modifCommentaire = async (req, res) => {
  try {
    const { id_commentaire } = req.params;
    const modification = await commentaire.modifierCommentaire(
      req.body.contenue,
      id_commentaire
    );
    //Vérification de la modification d'un commentaire
    if (!modification) {
      return res.status(404).json({ message: "Commentaire non modifié." });
    }
    res.json({ message: "Commentaire modifié." });
  } catch (error) {
    console.error("Erreur de modification :", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

//Supprimer un commentaire
export const supprCommentaire = async (req, res) => {
  try {
    const { id_commentaire } = req.params;
    const supprimer = await commentaire.supprimerCommentaire(id_commentaire);
    //Vérifier si le commentaire est bien présent
    if (!supprimer) {
      return res.status(404).json({ message: "Commentaire non trouvé." });
    }
    res.json({ message: "Commentaire supprimé." });
  } catch (error) {
    console.error("Erreur de suppression :", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
