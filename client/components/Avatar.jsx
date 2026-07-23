import "../style/Avatar.css";

import avatarDefault from "../src/assets/logo.png";

export default function Avatar({
  src,

  prenom = "",

  nom = "",

  size = "medium",
}) {
  const initials = `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();

  return (
    <div className={`avatar ${size}`}>
      {src ? (
        <img src={src} alt={`${prenom} ${nom}`} />
      ) : (
        <span>{initials || "?"}</span>
      )}
    </div>
  );
}
