import { db } from "../config/db.js";

// Rechercher un évènement par son ID
export const trouverEvenementParId = async (id_evenement) => {
  const [rows] = await db.query(
    "SELECT * FROM evenements WHERE id_evenement = ?",
    [id_evenement]
  );

  return rows[0];
};

// Rechercher un évènement par son titre
export const trouverEvenementParTitre = async (titre) => {
  const [rows] = await db.query("SELECT * FROM evenements WHERE titre = ?", [
    titre,
  ]);

  return rows[0];
};

// Créer un évènement
export const creerEvenement = async (
  titre,
  description,
  lieu,
  date_evenement,
  id_utilisateur
) => {
  const [result] = await db.query(
    `INSERT INTO evenements
    (
      titre,
      description,
      lieu,
      date_evenement,
      id_utilisateur
    )
    VALUES (?, ?, ?, ?, ?)`,
    [titre, description, lieu, date_evenement, id_utilisateur]
  );

  return result.insertId;
};

// Modifier un évènement
export const modifierEvenement = async (
  id_evenement,
  titre,
  description,
  lieu,
  date_evenement
) => {
  const [result] = await db.query(
    `UPDATE evenements
     SET
        titre = ?,
        description = ?,
        lieu = ?,
        date_evenement = ?
     WHERE id_evenement = ?`,
    [titre, description, lieu, date_evenement, id_evenement]
  );

  return result.affectedRows;
};

// Supprimer un évènement
export const supprimerEvenement = async (id_evenement) => {
  const [result] = await db.query(
    "DELETE FROM evenements WHERE id_evenement = ?",
    [id_evenement]
  );

  return result.affectedRows;
};

// Tous les évènements
export const tousLesEvenements = async () => {
  const [rows] = await db.query(`
    SELECT
      e.*,
      u.prenom,
      u.nom,
      u.photo_utilisateur
    FROM evenements e
    JOIN utilisateurs u
      ON e.id_utilisateur = u.id_utilisateur
    ORDER BY e.date_evenement ASC
  `);

  return rows;
};
