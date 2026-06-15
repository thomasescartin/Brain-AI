import { db } from "../config/db.js";

// Trouver la discussions
export const trouverDiscussion = async (id_discussion) => {
  const [sql] = await db.query(
    "SELECT * FROM discussions WHERE id_discussion = ?",
    [id_discussion]
  );
  return sql[0];
};

// Créer la discussion
export const creerDiscussion = async (titre, contenue, id_utilisateur) => {
  const [sql] = await db.query(
    "INSERT INTO discussions (titre, contenue, id_utilisateur) VALUES (?, ?, ?)",
    [titre, contenue, id_utilisateur]
  );
  return sql.insertId;
};

//Modifier une discussion
export const modifierDiscussion = async (titre, contenue, id_discussion) => {
  const [sql] = await db.query(
    "UPDATE discussions SET titre = ?, contenue = ? WHERE id_discussion = ?",
    [titre, contenue, id_discussion]
  );
  return sql.affectedRows;
};

//Supprimmer une discussion
export const supprimerDiscussion = async (id_discussion) => {
  const [sql] = await db.query(
    "DELETE FROM discussions WHERE id_discussion = ?",
    [id_discussion]
  );
  return sql.affectedRows;
};

export const toutesDiscussions = async () => {
  const [rows] = await db.query("SELECT * FROM discussions");
  return rows;
};
