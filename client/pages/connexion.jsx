import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../style/formulaire.css";

export default function Connection() {
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function validMDP(password) {
    if (/[<>`"'\\;]/.test(password)) return false;
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validMDP(mot_de_passe)) {
      setError("Mot de passe invalide");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/utilisateurs/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, mot_de_passe }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      localStorage.setItem("token", data.token);
      console.log("DATA LOGIN :", data);

      setSuccess("Connexion réussie");
      navigate("/profile");
      setError("");
      setEmail("");
      setMotDePasse("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="auth-form">
      <form className="formulaire" onSubmit={handleSubmit}>
        <h2>Connexion</h2>

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
          <label htmlFor="mot_de_passe">Mot de passe</label>

          <input
            id="mot_de_passe"
            type="password"
            value={mot_de_passe}
            onChange={(e) => setMotDePasse(e.target.value)}
            placeholder="Mot de passe"
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        {success && <p className="success">{success}</p>}

        <p>
          Pas encore de compte ? <Link to="/inscription">S'inscrire</Link>
        </p>

        <button
          type="submit"
          className="btn primary"
          disabled={!email || !validMDP(mot_de_passe)}
        >
          Se connecter
        </button>
      </form>
    </main>
  );
}
