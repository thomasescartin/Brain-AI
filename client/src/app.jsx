import { Routes, Route } from "react-router-dom";

// Import des pages
import Acceuil from "../pages/acceuil.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Acceuil />} />
    </Routes>
  );
}
