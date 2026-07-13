import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../style/formulaire.css";

export default function Profil() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("amateur");
  const [avatar, setAvatar] = useState("");

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
      setAvatar(data.photo_utilisateur);
      setRole(data.id_role === 1 ? "amateur" : "professionnel");

      console.log(data);
    };

    fetchProfile();
  }, []);

  // Image
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    reader.readAsDataURL(file);
  };

  //  Modification du profil
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

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
        mot_de_passe: password,
        id_role: role === "amateur" ? 2 : 4,
        photo_utilisateur: avatar,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Profil mis à jour !");
  };

  //  Deconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/connexion");
  };

  if (!user) return <p>Chargement...</p>;

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
