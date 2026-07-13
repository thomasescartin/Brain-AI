import { Link } from "react-router-dom";
import "../style/acceuilStyle.css";
import logo from "../src/assets/logo.png";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <img src={logo} alt="Brain_AI" className="hero-logo" />

          <h1>Bienvenue sur Brain_AI</h1>

          <p>
            Le réseau social dédié aux passionnés, étudiants et professionnels
            de l'intelligence artificielle.
          </p>

          {!token ? (
            <div className="hero-buttons">
              <Link to="/inscription" className="btn-primary">
                Rejoindre la communauté
              </Link>

              <Link to="/connexion" className="btn-secondary">
                Se connecter
              </Link>
            </div>
          ) : (
            <Link to="/discussion" className="btn-primary">
              Accéder aux discussions
            </Link>
          )}
        </div>
      </section>

      <section className="about">
        <h2>Pourquoi Brain_AI ?</h2>

        <p>
          Brain_AI est un réseau social dédié à l'intelligence artificielle. Son
          objectif est de rassembler étudiants, développeurs, chercheurs et
          professionnels afin de favoriser le partage de connaissances, la
          collaboration sur des projets innovants et la découverte d'évènements
          liés à l'IA.
        </p>
      </section>

      {/* Fonctionnalités */}

      <section className="features">
        <div className="feature-card">
          <h2>💬 Discussions</h2>

          <p>
            Échangez avec la communauté autour de l'IA, du Machine Learning, du
            Deep Learning ou encore de la cybersécurité.
          </p>
          <Link to="/discussion" className="feature-card"></Link>
        </div>

        <div className="feature-card">
          <h2>🚀 Projets</h2>

          <p>
            Présentez vos projets, trouvez des collaborateurs et découvrez les
            réalisations de la communauté.
          </p>
          <Link to="/projet" className="feature-card"></Link>
        </div>

        <div className="feature-card">
          <h2>📅 Évènements</h2>

          <p>
            Retrouvez les conférences, hackathons, formations et meetups
            consacrés à l'intelligence artificielle.
          </p>
          <Link to="/evenements" className="feature-card"></Link>
        </div>
      </section>
      <section className="join">
        <h2>Prêt à rejoindre la communauté ?</h2>

        <p>Inscrivez-vous gratuitement et commencez à partager vos idées.</p>

        <Link to="/inscription" className="btn-primary">
          Créer un compte
        </Link>
      </section>
    </main>
  );
}
