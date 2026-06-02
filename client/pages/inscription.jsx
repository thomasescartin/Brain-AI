import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/formulaire.css";

export default function Inscription() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/utilisateurs/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            prenom,
            nom,
            email,
            mot_de_passe: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setPrenom("");
      setNom("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  function securiteMDP(password) {
    if (/[<>`"'\\;]/.test(password)) return false;

    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="formulaire">
        {" "}
        <h2>Inscription</h2>
        <div>
          <label>Prénom</label>

          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Prénom"
          />
        </div>
        <div>
          <label>Nom</label>

          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
          />
        </div>
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
        </div>
        <div>
          <label>Confirmation mot de passe</label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmation"
            required
          />
        </div>
        {!securiteMDP(password) && (
          <p>
            Le mot de passe doit contenir : 8 caractères, une majuscule, une
            minuscule et un chiffre.
          </p>
        )}
        {error && <p>{error}</p>}
        <button type="submit" disabled={!securiteMDP(password)}>
          S'inscrire
        </button>
        <p>
          Vous avez déjà un compte ?<Link to="/connexion"> Se connecter</Link>
        </p>
      </div>
    </form>
  );
}
