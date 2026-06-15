import utilisateurRoute from "./routes/utilisateur.route.js";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import evenementRoute from "./routes/evenement.route.js";
import projetRoute from "./routes/projet.route.js";
import discussionRoute from "./routes/discussion.route.js";
import commentaireRoute from "./routes/commentaire.route.js";
import connexionRoute from "./routes/connexion.route.js";

const PORT = process.env.PORT;

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json());
app.use(cors("http://localhost:5173"));

app.use("/api/utilisateurs", utilisateurRoute);
app.use("/api/evenement", evenementRoute);
app.use("/api/projet", projetRoute);
app.use("/api/discussion", discussionRoute);
app.use("/api/commentaire", commentaireRoute);
app.use("/connexion", connexionRoute);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:5000 `);
});
