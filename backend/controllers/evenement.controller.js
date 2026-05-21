import * as evenement from "../models/evenement.model.js";

// Création de l'évènement
export const creationEvenement = async (req, res) => {
  try {
    const { titre, date_evenement, contenue } = req.body;
    //Vérification de validité
    if (!titre || !date_evenement || !contenue) {
      return res.status(400).json({
        message: "Tous les champs sont requis",
      });
    }
    // Vérifier si l'évènement existe déjà
    const evenementExistant = await evenement.trouverEvenement(titre);
    if (evenementExistant) {
      return res.status(409).json({ message: "Evènement déjà existant" });
    }
    await evenement.creerEvenement(titre, date_evenement, contenue);
    res.status(201).json({ message: "Evènement créé." });
  } catch (error) {
    console.error(" Erreur d'enregistrement :", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

//Afficher l'évènement
export const afficherEvenement = async (req, res) => {
  try {
    const { id_evenement } = req.params;
    // Vérifier si l'évènement existe déjà
    const evenementExistant = await evenement.trouverEvenement(id_evenement);
    if (!evenementExistant) {
      return res.status(404).json({ message: "Evènement inexistant" });
    }
    // Retrouver l'évènement
    res.status(200).json(evenementExistant);
  } catch (error) {
    console.error("Erreur d'affichage :", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

//Mofifier l'évènement
export const modifEvenement = async (req, res) => {
  const { id_evenement } = req.params;
  const modification = await evenement.modifierEvenement(
    id_evenement,
    req.body.titre,
    req.body.date_evenement,
    req.body.contenue
  );
  if (!modification) {
    return res.status(400).json({ message: "Evènement non modifier." });
  }
  res.json({ message: "Evènement mis à jour." });
};

//Supprimmer l'évènement
export const supprEvenement = async (req, res) => {
  const supprimmer = await evenement.supprEvenement(req.evenement.id_evenement);

  if (!supprimmer) {
    return res.status(404).json({ message: "Evènement non trouvé." });
  }

  res.json({ message: "Evènement supprimé." });
};
