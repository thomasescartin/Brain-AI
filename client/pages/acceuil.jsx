import { Link } from "react-router-dom";
// import "./acceuilStyle.css";

export default function Acceuil() {
  return (
    <>
      <header>
        <div>
          <img src="" alt="Image du logo" />

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

      <section id="explorer">
        <Link to="/categorie">
          <button>Explorer</button>
        </Link>

        <div>
          <h3>Vous ne savez pas par où commencer ?</h3>
          <p>Retrouvez ici nos différentes catégories</p>
          <div>
            <img src="" alt="" />
          </div>
        </div>
      </section>

      <section id="forum">
        <div>
          <h3>
            Rencontrez des pros de l'IA.
            <br />
            Partagez avec des passionnés.
          </h3>
          <div>
            <img src="" alt="" />
          </div>
        </div>

        <Link to="/forum">
          <button>Forum</button>
        </Link>
      </section>

      <section id="evenement">
        <div>
          <h3>Envie de participer à un évènement ?</h3>
          <p>Enregistrez-vous en dessous !</p>

          <Link to="/evenement">
            <button>Evénement</button>
          </Link>
        </div>

        <div>
          <img src="" alt="" />
        </div>
      </section>

      <section id="projet">
        <div>
          <h3>Participez à un projet.</h3>
          <p>Rejoignez nos projets open-source.</p>
          <div>
            <img src="" alt="" />
          </div>
        </div>

        <Link to="/projet">
          <button>Projet</button>
        </Link>
      </section>
    </>
  );
}
