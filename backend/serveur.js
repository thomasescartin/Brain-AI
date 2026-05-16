import utilisateurRoute from "./routes/utilisateur.route";
import cors from "cors";
import "dotenv/config";
import express from "express";

const PORT = process.env.PORT;

const app = express.json();
app.use(cors());

app.use("/api/utilisateurs", utilisateurRoute);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur ${PORT} `);
});
