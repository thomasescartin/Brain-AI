import { db } from "../config/db";

// Trouver un utilisateur avec son émail
export const TrouverUtilisateur = async (email) => {
  const [sql] = await db.query(
    "SELECT * FROM utilisateurs WHERE id_utilisateurs = ? email = ?",
    [email]
  );
  return sql[0];
};

//Créer un utilisateur
export const CreerUtilisateur = async (email, mot_de_passe) => {
  const [sql] = await db.query(
    "INSERT INTO utilisateurs (email, mot_de_passe) VALUES (?,?)",
    [email, mot_de_passe]
  );
  return sql.insertId;
};

//Mettre à jour un utilisateur
export const ModifUtilisateur = async (
  id_utilisateur,
  prenom,
  nom,
  email,
  mot_de_passe,
  photo_utilisateur,
  role
) => {
  const [sql] = await db.query(
    "UPDATE utilisateurs SET prenom = ?, nom = ?, email = ?, mot_de_passe = ?, photo_utilisateur = ?, role = ? WHERE id_utilisateur = ?",
    [id_utilisateur, prenom, nom, email, mot_de_passe, photo_utilisateur, role]
  );
  return sql.affectedRows;
};

//Supprimer un utilisateur
export const SupprimmerUtilisateur = async (id_utilisateur) => {
  const [sql] = await db.query(
    "DELETE FROM utilisateurs WHERE id_utilisateur = ?",
    [id_utilisateur]
  );
  return sql.affectedRows;
};
