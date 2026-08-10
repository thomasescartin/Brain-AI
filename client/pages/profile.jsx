import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../style/profileStyle.css";

export default function Profil() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("amateur");
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  function getPhotoUrl(photo) {
    if (!photo) {
      return "";
    }

    // Prévisualisation locale
    if (photo.startsWith("blob:")) {
      return photo;
    }

    // URL déjà complète
    if (photo.startsWith("http")) {
      return photo;
    }

    // Chemin provenant de MySQL
    return `http://localhost:5000${photo}`;
  }

  //  Affichage du profil
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/utilisateurs/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(token);

      const data = await res.json();

      console.log(data);

      setUser(data);
      setEmail(data.email);
      setAvatar(getPhotoUrl(data.photo_utilisateur));
      setRole(data.id_role === 1 ? "amateur" : "professionnel");

      console.log(data);
    };

    fetchProfile();
  }, []);

  // Image
  function handleAvatarChange(e) {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setAvatarFile(file);

    // Prévisualisation locale
    const preview = URL.createObjectURL(file);

    setAvatar(preview);
  }
  //  Modification du profil
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // =========================
      // MODIFICATION INFORMATIONS
      // =========================

      const res = await fetch("http://localhost:5000/api/utilisateurs/update", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          prenom: user.prenom,
          nom: user.nom,
          email,
          mot_de_passe: password || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // =========================
      // MODIFICATION PHOTO
      // =========================

      if (avatarFile) {
        await envoyerPhoto();
      }

      setPassword("");

      alert("Profil mis à jour !");
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }

  //  Deconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/connexion");
  };

  if (!user) return <p>Chargement...</p>;

  async function envoyerPhoto() {
    if (!avatarFile) {
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("photo", avatarFile);

    const res = await fetch("http://localhost:5000/api/utilisateurs/photo", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    setAvatar(getPhotoUrl(data.photo_utilisateur));
    setAvatarFile(null);
  }

  return (
    <div>
      <header>
        <Link to="/discussion">Forum</Link>
        <button onClick={handleLogout}>Déconnexion</button>
      </header>

      <form onSubmit={handleSubmit}>
        <h2>Mon profil</h2>

        {/* AVATAR */}
        <img
          src={avatar || "https://via.placeholder.com/150"}
          alt="avatar"
          style={{ width: "150px", borderRadius: "50%" }}
        />

        <input type="file" onChange={handleAvatarChange} />
        <p>Prénom : {user.prenom}</p>
        <p>Nom : {user.nom}</p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nouveau mot de passe"
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="amateur">Amateur</option>
          <option value="professionnel">Professionnel</option>
        </select>

        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}
