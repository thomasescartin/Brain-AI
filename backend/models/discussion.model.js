import { db } from "../config/db.js";

// Trouver une discussion par son ID
export const trouverDiscussion = async (id_discussion) => {
  const [rows] = await db.query(
    "SELECT * FROM discussions WHERE id_discussion = ?",
    [id_discussion]
  );

  return rows[0];
};

// Trouver une discussion par son titre
export const trouverDiscussionParTitre = async (titre) => {
  const [rows] = await db.query("SELECT * FROM discussions WHERE titre = ?", [
    titre,
  ]);

  return rows[0];
};

// Créer une discussion
export const creerDiscussion = async (titre, contenue, id_utilisateur) => {
  const [result] = await db.query(
    `INSERT INTO discussions
    (titre, contenue, id_utilisateur)
    VALUES (?, ?, ?)`,
    [titre, contenue, id_utilisateur]
  );

  return result.insertId;
};

// Modifier une discussion
export const modifierDiscussion = async (id_discussion, titre, contenue) => {
  const [result] = await db.query(
    `UPDATE discussions
     SET titre = ?, contenue = ?
     WHERE id_discussion = ?`,
    [titre, contenue, id_discussion]
  );

  return result.affectedRows;
};

// Supprimer une discussion
export const supprimerDiscussion = async (id_discussion) => {
  const [result] = await db.query(
    "DELETE FROM discussions WHERE id_discussion = ?",
    [id_discussion]
  );

  return result.affectedRows;
};

// Toutes les discussions
export const toutesDiscussions = async () => {
  const [rows] = await db.query(`
    SELECT
      d.*,
      u.prenom,
      u.nom,
      u.photo_utilisateur
    FROM discussions d
    JOIN utilisateurs u
      ON d.id_utilisateur = u.id_utilisateur
    ORDER BY d.date_discussion DESC
  `);

  return rows;
};
