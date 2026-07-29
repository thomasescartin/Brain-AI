import { db } from "../config/db.js";

// Recherche par ID
export const trouverProjetParId = async (id_projet) => {
  const [rows] = await db.query("SELECT * FROM projets WHERE id_projet = ?", [
    id_projet,
  ]);

  return rows[0];
};

// Recherche par titre
export const trouverProjetParTitre = async (titre) => {
  const [rows] = await db.query("SELECT * FROM projets WHERE titre = ?", [
    titre,
  ]);

  return rows[0];
};

// Création
export const creerProjet = async (
  titre,
  description,
  technologies,
  id_utilisateur
) => {
  const [result] = await db.query(
    `INSERT INTO projets
    (
      titre,
      description,
      technologies,
      id_utilisateur
    )
    VALUES (?, ?, ?, ?)`,
    [titre, description, technologies, id_utilisateur]
  );

  return result.insertId;
};

// Modification
export const modifierProjet = async (
  id_projet,
  titre,
  description,
  technologies
) => {
  const [result] = await db.query(
    `UPDATE projets
     SET
        titre = ?,
        description = ?,
        technologies = ? 
     WHERE id_projet = ?`,
    [titre, description, technologies, id_projet]
  );

  return result.affectedRows;
};

// Suppression
export const supprimerProjet = async (id_projet) => {
  const [result] = await db.query("DELETE FROM projets WHERE id_projet = ?", [
    id_projet,
  ]);

  return result.affectedRows;
};

// Tous les projets
export const tousLesProjets = async () => {
  const [rows] = await db.query(`
    SELECT
      p.*,
      u.prenom,
      u.nom
    FROM projets p
    JOIN utilisateurs u
      ON p.id_utilisateur = u.id_utilisateur
    ORDER BY p.date_creation DESC
  `);

  return rows;
};
