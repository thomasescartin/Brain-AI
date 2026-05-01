import mysql from "mysql2/promise";
import "dotenv/config";

// Création d'un pool pour réutiliser les connexions et gérer plusieurs connexions à la fois.
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
