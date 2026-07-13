import { Link } from "react-router-dom";
import "../style/header.css";
import logo from "../src/assets/logo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Brain_AI" />

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
