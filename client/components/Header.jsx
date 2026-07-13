import { Link } from "react-router-dom";
import "../style/header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Brain_AI" />

        <h1>Brain_AI</h1>
      </div>

      <nav>
        <Link to="/">Accueil</Link>

        <Link to="/discussion">Discussions</Link>

        <Link to="/projets">Projets</Link>

        <Link to="/evenements">Evènements</Link>

        <Link to="/profile">Profil</Link>
      </nav>
    </header>
  );
}
