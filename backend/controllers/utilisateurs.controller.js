import * as utilisateurs from "../models/utilisateur.model";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import "dotenv/config";

// inscription

export const register = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await utilisateurs.TrouverUtilisateur(email);
    if (utilisateurExistant) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    // hash du mdp
    const mot_de_passe_hasher = await argon2.hash(mot_de_passe);

    // création de l'utilisateur
    await utilisateurs.CreerUtilisateur(email, mot_de_passe_hasher);

    res.status(201).json({ message: "Compte crée" });
  } catch (error) {
    console.error(" Erreur register :", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// connexion utilisateur

export const login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // vérifier l'utilisateur
    const utilisateur = await utilisateurs.TrouverUtilisateur(email);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe invalide" });
    }

    // vérifier le mdp
    const MDPValide = await argon2.verify(
      utilisateur.mot_de_passe_hasher,
      mot_de_passe
    );

    if (!MDPValide) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe invalide" });
    }

    // création du JWT
    const token = jwt.sign(
      {
        id: utilisateur.id_utilisateur,
        email: utilisateur.email,
        role: utilisateur.role,
      },

      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    res.json({ message: "Connexion réussie", token: token });
  } catch (error) {
    console.error("Erreur login :", error.message);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// modification utilisateur
export const modifEmail = async (req, res) => {
  const modification = await utilisateurs.ModifUtilisateur(
    req.user.id_utilisateur,
    req.body.email,
    req.body.mot_de_passe,
    req.body.photo_utilisateur,
    req.body.role
  );
  if (!modification) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  res.json({ message: "Utilisateur mis à jour" });
};

//supprimer le compte
export const supprimmerCompte = async (req, res) => {
  const supprimmer = await utilisateurs.SupprimmerUtilisateur(
    req.user.id_utilisateur
  );

  if (!supprimmer) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  res.json({ message: "Comtpe supprimé" });
};
