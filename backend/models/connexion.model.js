import { db } from "../config/db.js";

//Créer une date de connexion d'un utilisateur
export const dateConnexion = async (id_utilisateur) => {
  const [sql] = await db.query(
    "INSERT INTO connexion (id_utilisateur) VALUES (?)",
    [id_utilisateur]
  );
  return sql.insertId;
};
