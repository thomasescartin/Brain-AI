import { db } from "../config/db.js";

export const trouverEvenement = async (id_evenement) => {
  const [sql] = await db.query(
    "SELECT * FROM evenements WHERE id_evenement = ?",
    [id_evenement]
  );
  return sql[0];
};

export const creerEvenement = async (titre, date_evenement, contenue) => {
  const [sql] = await db.query(
    "INSERT INTO evenements (titre, date_evenement, contenue) VALUES (?,?,?)",
    [titre, date_evenement, contenue]
  );
  return sql.insertId;
};

export const modifEvenement = async (titre, date_evenement, contenue) => {
  const [sql] = await db.query(
    "UPDATE evenements SET titre = ?, date_evenement = ?, contenue = ?",
    [titre, date_evenement, contenue]
  );
  return sql.affectedRows;
};

export const supprimmerEvenement = async (id_evenement) => {
  const [sql] = await db.query("DELETE FROM evenement WHERE id_evenement = ?", [
    id_evenement,
  ]);
  return sql.affectedRows;
};
