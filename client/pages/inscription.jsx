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
    <main className="auth-form">
      <form className="formulaire" onSubmit={handleSubmit}>
        <h2>Inscription</h2>

        <div className="input-group">
          <label htmlFor="prenom">Prénom</label>

          <input
            id="prenom"
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Prénom"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="nom">Nom</label>

          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Mot de passe</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirmation du mot de passe</label>

          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmation"
            required
          />
        </div>

        {!securiteMDP(password) && password.length > 0 && (
          <p className="error">
            Le mot de passe doit contenir au minimum : 8 caractères, une
            majuscule, une minuscule et un chiffre.
          </p>
        )}

        {error && <p className="error">{error}</p>}

        <button
          type="submit"
          className="btn primary"
          disabled={!securiteMDP(password)}
        >
          S'inscrire
        </button>

        <p>
          Vous avez déjà un compte ? <Link to="/connexion">Se connecter</Link>
        </p>
      </form>
    </main>
  );
}
