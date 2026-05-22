import { db } from "../config/db.js";

//Trouver le commentaire
export const trouverCommentaire = async (id_commentaire) => {
  const [sql] = await db.query(
    "SELECT * FROM commentaires WHERe id_commentaire = ?",
    [id_commentaire]
  );
  return sql[0];
};

// Créer un commentaire
export const creerCommentaire = async (
  contenu,
  date_commentaire,
  id_utilisateur,
  id_discussion
) => {
  const [sql] = await db.query(
    " INSERT INTO commentaires (contenue, date_commentaire, id_utilisateur, id_discussion) Values (?, ?, ?, ?)",
    [contenu, date_commentaire, id_utilisateur, id_discussion]
  );
  return sql.insertId;
};

//Modifier un commentaire
export const modifierCommentaire = async (contenue, id_commentaire) => {
  const [sql] = await db.query(
    "UPDATE commentaires SET contenue = ? WHERE id_commentaire = ?",
    [contenue, id_commentaire]
  );
  return sql.affectedRows;
};

// Supprimer un commentaire
export const supprimerCommentaire = async (id_commentaire) => {
  const [sql] = await db.query(
    "DELETE FROM commentaires WHERE id_commentaire = ?",
    [id_commentaire]
  );
  return sql.affectedRows;
};
