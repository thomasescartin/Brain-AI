import { Routes, Route } from "react-router-dom";

// Import des pages
import Acceuil from "../pages/acceuil.jsx";
import Explorer from "../pages/explorer.jsx";
import MentionLegales from "../pages/mentionsLegales.jsx";
import Inscription from "../pages/inscription.jsx";
import Connection from "../pages/connexion.jsx";
import Profil from "../pages/profile.jsx";
import Discussion from "../pages/discussions.jsx";
import Header from "../components/header.jsx";
import Footer from "../components/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/mentions" element={<MentionLegales />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connection />} />
        <Route path="/profile" element={<Profil />} />
        <Route path="/discussion" element={<Discussion />} />
      </Routes>
      <Footer />
    </>
  );
}
