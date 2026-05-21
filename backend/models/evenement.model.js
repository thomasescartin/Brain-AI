import { db } from "../config/db.js";

//trouver un évènement
export const trouverEvenement = async (id_evenement) => {
  const [sql] = await db.query(
    "SELECT * FROM evenements WHERE id_evenement = ?",
    [id_evenement]
  );
  return sql[0];
};

// Créer un évènement
export const creerEvenement = async (titre, date_evenement, contenue) => {
  const [sql] = await db.query(
    "INSERT INTO evenements (titre, date_evenement, contenue) VALUES (?,?,?)",
    [titre, date_evenement, contenue]
  );
  return sql.insertId;
};

//Modifier un évènement
export const modifEvenement = async (titre, date_evenement, contenue) => {
  const [sql] = await db.query(
    "UPDATE evenements SET titre = ?, date_evenement = ?, contenue = ?",
    [titre, date_evenement, contenue]
  );
  return sql.affectedRows;
};

//Supprimmer un évènement
export const supprimmerEvenement = async (id_evenement) => {
  const [sql] = await db.query("DELETE FROM evenement WHERE id_evenement = ?", [
    id_evenement,
  ]);
  return sql.affectedRows;
};
