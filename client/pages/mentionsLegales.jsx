import { Link } from "react-router-dom";
import "../style/mentionStyle.css";

export default function MentionLegales() {
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

      <h1>Mentions légales</h1>

      <section>
        <h2>1. Éditeur du site</h2>
        <p>
          Ce réseau social est édité par{" "}
          <strong>[Nom de ta société ou ton nom]</strong>.<br />
          Forme juridique : [Auto-entrepreneur / SAS / SARL …]
          <br />
          Siège social : [Adresse complète]
          <br />
          SIRET : [Numéro]
          <br />
          Responsable de la publication : [Nom et prénom]
          <br />
          Contact : [email de contact]
        </p>
      </section>

      <section>
        <h2>2. Hébergeur</h2>
        <p>
          Le site est hébergé par :<br />
          <strong>[Nom de l’hébergeur]</strong>
          <br />
          Adresse : [Adresse de l’hébergeur]
          <br />
          Téléphone : [Numéro de l’hébergeur]
        </p>
      </section>

      <section>
        <h2>3. Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu du site (textes, images, logos, icônes, vidéos,
          etc.) est protégé par le droit d'auteur. Toute reproduction,
          modification ou diffusion sans autorisation est interdite.
        </p>
      </section>

      <section>
        <h2>4. Conditions d’utilisation</h2>
        <p>
          L’utilisateur s’engage à utiliser le site de manière conforme aux lois
          en vigueur et à ne publier aucun contenu :
        </p>
        <ul>
          <li>violent ou haineux</li>
          <li>discriminatoire</li>
          <li>pornographique ou choquant</li>
          <li>incitant à la haine ou au harcèlement</li>
          <li>portant atteinte à la vie privée d’autres utilisateurs</li>
        </ul>

        <p>
          L’éditeur se réserve le droit de supprimer tout contenu ne respectant
          pas ces règles.
        </p>
      </section>

      <section>
        <h2>5. Données personnelles (RGPD)</h2>
        <p>
          Ce réseau social collecte et traite des données personnelles dans le
          cadre de la création d’un compte utilisateur, de l’accès au réseau
          social et de la publication de contenus.
        </p>

        <h3>Données collectées :</h3>
        <ul>
          <li>nom et prénom</li>
          <li>adresse e-mail</li>
          <li>photo de profil (optionnelle)</li>
          <li>messages, publications et interactions</li>
          <li>données techniques (adresse IP, navigateur, logs)</li>
        </ul>

        <h3>Finalités de la collecte :</h3>
        <ul>
          <li>création et gestion du compte utilisateur</li>
          <li>accès aux fonctionnalités du réseau social</li>
          <li>sécurisation du site</li>
          <li>amélioration de l’expérience utilisateur</li>
        </ul>

        <h3>Durée de conservation :</h3>
        <p>
          Les données sont conservées tant que le compte reste actif.
          L’utilisateur peut demander la suppression de son compte et de toutes
          ses données à tout moment.
        </p>

        <h3>Vos droits :</h3>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li>droit d'accès</li>
          <li>droit de rectification</li>
          <li>droit à l’effacement</li>
          <li>droit à la portabilité</li>
          <li>droit d’opposition</li>
          <li>droit de limitation</li>
        </ul>

        <p>
          Pour toute demande liée à vos données, contactez :<br />
          <strong>[Adresse mail DPO ou du responsable]</strong>
        </p>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>
          Le site utilise des cookies pour assurer son bon fonctionnement et
          améliorer l’expérience utilisateur. Vous pouvez refuser ou modifier
          leur utilisation via votre navigateur.
        </p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>
          Pour toute question concernant ces mentions légales, vous pouvez
          contacter :<br />
          <strong>[email de contact]</strong>
        </p>
      </section>
    </>
  );
}
