import "../style/PostCard.css";

import Avatar from "../components/Avatar.jsx";
import Button from "../components/Button.jsx";

export default function PostCard({
  auteur,
  prenom,
  nom,
  photo,
  date,
  titre,
  contenu,
  onEdit,
  onDelete,
  children,
}) {
  return (
    <article className="post-card">
      <header className="post-header">
        <Avatar src={photo} prenom={prenom} nom={nom} size="small" />

        <div className="post-author">
          <h3>{auteur}</h3>

          <span>{date}</span>
        </div>
      </header>

      <div className="post-body">
        <h2>{titre}</h2>

        <p>{contenu}</p>
      </div>

      {children && <div className="post-extra">{children}</div>}

      <footer className="post-footer">
        <Button variant="secondary" onClick={onEdit}>
          Modifier
        </Button>

        <Button variant="danger" onClick={onDelete}>
          Supprimer
        </Button>
      </footer>
    </article>
  );
}
