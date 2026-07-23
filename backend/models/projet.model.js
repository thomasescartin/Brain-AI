import { db } from "../config/db.js";

// Trouver un Projet
export const trouverProjet = async (id_projet) => {
  const [sql] = await db.query("SELECT * FROM projets WHERE id_projet = ?", [
    id_projet,
  ]);
  return sql[0];
};

//Créer un projet
export const creerProjet = async (titre, date_projet) => {
  const [sql] = await db.query(
    "INSERT INTO projets (titre, date_projet) VALUES (?, ?)",
    [titre, date_projet]
  );
  return sql.insertId;
};

//Modifier un projet
export const modifierProjet = async (id_projet, titre, date_projet) => {
  const [sql] = await db.query(
    "UPDATE projets SET titre = ?, date_projet = ? WHERE id_projet= ?",
    [id_projet, titre, date_projet]
  );
  return sql.affectedRows;
};

//Suuprimmer un projet
export const supprimmerProjet = async (id_projet) => {
  const [sql] = await db.query("DELETE FROM projets WHERE id_projet = ?", [
    id_projet,
  ]);
  return sql.affectedRows;
};

export const tousLesProjets = async () => {
  const [rows] = await db.query("SELECT * FROM projets");

  return rows;
};
