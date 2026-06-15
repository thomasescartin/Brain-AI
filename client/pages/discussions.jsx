import { useEffect, useState } from "react";
import "../style/discussionStyle.css";

export default function Discussion() {
  const [discussions, setDiscussions] = useState([]);
  const [titre, setTitre] = useState("");
  const [contenue, setContenue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Charger les discussions
  useEffect(() => {
    fetch("http://localhost:5000/api/discussion")
      .then((res) => res.json())
      .then((data) => setDiscussions(data))
      .catch((err) => console.error(err));
  }, []);

  //  Ajouter une discussion
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("TOKEN :", token);

    try {
      const res = await fetch("http://localhost:5000/api/discussion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titre, contenue }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      //  ajout dynamique
      setDiscussions((prev) => [...prev, data]);

      // reset
      setTitre("");
      setContenue("");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Discussions</h1>

      {/* Bouton ouverture */}
      <button onClick={() => setIsOpen(true)}>+ Créer une discussion</button>

      {/* MODALE */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Nouvelle discussion</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Titre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
              />

              <textarea
                placeholder="Contenu"
                value={contenue}
                onChange={(e) => setContenue(e.target.value)}
                required
              />

              <div className="modal-actions">
                <button type="submit">Créer</button>
                <button type="button" onClick={() => setIsOpen(false)}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LISTE */}
      <div>
        {discussions.map((d) => (
          <div key={d.id_discussion} className="card">
            <small>Utilisateur #{d.id_utilisateur}</small>
            <h3>{d.titre}</h3>
            <p>{d.contenue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
