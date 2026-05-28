import { Routes, Route } from "react-router-dom";

// Import des pages
import Acceuil from "../pages/acceuil.jsx";
import Explorer from "../pages/explorer.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Acceuil />} />
      <Route path="/explorer" element={<Explorer />} />
    </Routes>
  );
}
