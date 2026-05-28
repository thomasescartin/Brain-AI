import { Link } from "react-router-dom";
import "../style/explorerStyle.css";
export default function Explorer() {
  return (
    <>
      <header>
        <div>
          <img src="" alt="Image du logo" />S
          <Link to="/mentions">A propos</Link>
        </div>
        <div>
          <Link to="/connexion">
            <button>Se connecter</button>
          </Link>

          <Link to="/inscription">
            <button>S'enregistrer</button>
          </Link>
        </div>
      </header>
      <main className="categories">
        <div className="category-card">
          <Link to="/forum">Forum</Link>
          <p>Posez vos questions ou répondez à celles des autres.</p>
        </div>

        <div className="category-card">
          <Link to="/evenement">Evénements</Link>
          <p>Retrouvez tous les événements et conférences proposés.</p>
        </div>

        <div className="category-card">
          <Link to="/projet">Projets</Link>
          <p>Découvrez des projets open-source et collaboratifs.</p>
        </div>
      </main>
    </>
  );
}
