import { db } from "../config/db.js";

// Trouver un utilisateur par email
export const trouverUtilisateur = async (email) => {
  const [rows] = await db.query("SELECT * FROM utilisateurs WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

// Créer un utilisateur
export const creerUtilisateur = async (prenom, nom, email, mot_de_passe) => {
  const [result] = await db.query(
    `INSERT INTO utilisateurs (prenom, nom, email, mot_de_passe)
     VALUES (?, ?, ?, ?)`,
    [prenom, nom, email, mot_de_passe]
  );

  return result.insertId;
};

// Mettre à jour un utilisateur
export const modifierUtilisateur = async (
  id_utilisateur,
  prenom,
  nom,
  email,
  mot_de_passe,
  photo_utilisateur,
  id_role
) => {
  const [result] = await db.query(
    `UPDATE utilisateurs 
     SET prenom = ?, 
         nom = ?, 
         email = ?, 
         mot_de_passe = ?, 
         photo_utilisateur = ?, 
         id_role = ?
     WHERE id_utilisateur = ?`,
    [
      prenom,
      nom,
      email,
      mot_de_passe,
      photo_utilisateur,
      id_role,
      id_utilisateur,
    ]
  );

  return result.affectedRows;
};

// Supprimer un utilisateur
export const supprimerUtilisateur = async (id_utilisateur) => {
  const [result] = await db.query(
    "DELETE FROM utilisateurs WHERE id_utilisateur = ?",
    [id_utilisateur]
  );

  return result.affectedRows;
};
