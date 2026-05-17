import utilisateurRoute from "./routes/utilisateur.route.js";
import cors from "cors";
import "dotenv/config";
import express from "express";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/utilisateurs", utilisateurRoute);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:5000 `);
});
