import { Routes, Route } from "react-router-dom";

// Import des pages
import Acceuil from "../pages/acceuil.jsx";
import Explorer from "../pages/explorer.jsx";
import MentionLegales from "../pages/mentionsLegales.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Acceuil />} />
      <Route path="/explorer" element={<Explorer />} />
      <Route path="/mentions" element={<MentionLegales />} />
    </Routes>
  );
}
