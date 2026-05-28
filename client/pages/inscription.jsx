import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "./Formulaires.css";

export default function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch(
        "http://sql7.freesqldatabase.com:3306/api/auth",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/dashboard"); // redirection vers le dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  function securiteMDP(password) {
    if (/[<>`"'\\;]/.test(password)) return false; // invalide si un caractère spéciale est dans le mot de passe
    return (
      password.length >= 8 && // le mot de passe doit être supèrieur ou égal à 8 caractères
      /[A-Z]/.test(password) && // test si il y a au moins une majuscule
      /[a-z]/.test(password) && // test si il y a ua moins une minuscules
      /\d/.test(password) // d = digit , permet de tester si il y a au moins un chiffre entre 0 et 9 inclus
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Inscription </h2>
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" name="" id="" placeholder="Email" required />
        </div>
        <div>
          <label htmlFor="">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
        </div>
        <div>
          <label htmlFor="">Validation mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
        </div>

        <p>
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>

        {error && <p>{error}</p>}

        <button disabled={!securiteMDP(password)}>S'inscrire</button>
      </form>
    </>
  );
}
