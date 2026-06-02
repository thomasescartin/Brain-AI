import * as utilisateurs from "../models/utilisateur.model.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import "dotenv/config";

// INSCRIPTION
export const register = async (req, res) => {
  try {
    const { prenom, nom, email, mot_de_passe } = req.body;

    const utilisateurExistant = await utilisateurs.trouverUtilisateur(email);
    if (utilisateurExistant) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    const mot_de_passe_hash = await argon2.hash(mot_de_passe);

    await utilisateurs.creerUtilisateur(prenom, nom, email, mot_de_passe_hash);

    res.status(201).json({ message: "Compte créé" });
  } catch (error) {
    console.error("Erreur register :", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    const utilisateur = await utilisateurs.trouverUtilisateur(email);

    if (!utilisateur) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe invalide" });
    }

    const MDPValide = await argon2.verify(
      utilisateur.mot_de_passe,
      mot_de_passe
    );

    if (!MDPValide) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe invalide" });
    }

    const token = jwt.sign(
      {
        id: utilisateur.id_utilisateur,
        email: utilisateur.email,
        role: utilisateur.id_role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    return res.json({
      message: "Connexion réussie",
      token,
    });
  } catch (error) {
    console.error("Erreur login :", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// UPDATE UTILISATEUR
export const modifEmail = async (req, res) => {
  try {
    const { prenom, nom, email, mot_de_passe, photo_utilisateur, id_role } =
      req.body;

    const mot_de_passe_hash = mot_de_passe
      ? await argon2.hash(mot_de_passe)
      : undefined;

    const modification = await utilisateurs.modifierUtilisateur(
      req.user.id,
      prenom,
      nom,
      email,
      mot_de_passe_hash,
      photo_utilisateur,
      id_role
    );

    if (!modification) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur mis à jour" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE
export const supprimmerCompte = async (req, res) => {
  try {
    const supprimmer = await utilisateurs.supprimerUtilisateur(req.user.id);

    if (!supprimmer) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Compte supprimé" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
