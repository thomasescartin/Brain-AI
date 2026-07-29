import { useEffect, useState } from "react";

import Button from "../components/Button.jsx";
import Modal from "../components/Modale.jsx";
import Input from "../components/Input.jsx";
import PostCard from "../components/PostCard.jsx";

import {
  getProjets,
  createProjet,
  updateProjet,
  deleteProjet,
} from "../service/projet.service.js";

import "../style/projetStyle.css";

export default function Projet() {
  const [projets, setProjets] = useState([]);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [modeEdition, setModeEdition] = useState(false);
  const [projetSelectionne, setProjetSelectionne] = useState(null);

  // Chargement initial
  useEffect(() => {
    chargerProjets();
  }, []);

  async function chargerProjets() {
    try {
      const data = await getProjets();
      setProjets(data);
    } catch (error) {
      console.error(error);
    }
  }

  function fermerModal() {
    setIsOpen(false);

    setModeEdition(false);

    setProjetSelectionne(null);

    setTitre("");
    setDescription("");
    setTechnologies("");
  }

  function ouvrirEdition(projet) {
    setProjetSelectionne(projet);

    setModeEdition(true);

    setTitre(projet.titre);
    setDescription(projet.description);
    setTechnologies(projet.technologies ?? "");

    setIsOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (modeEdition) {
        await updateProjet(projetSelectionne.id_projet, {
          titre,
          description,
          technologies,
        });
      } else {
        await createProjet({
          titre,
          description,
          technologies,
        });
      }

      await chargerProjets();

      fermerModal();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function supprimerProjet(id_projet) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer ce projet ?"
    );

    if (!confirmation) return;

    try {
      await deleteProjet(id_projet);

      await chargerProjets();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }

  return (
    <div className="projet-page">
      <div className="page-header">
        <h1>🚀 Projets</h1>

        <Button
          onClick={() => {
            fermerModal();
            setIsOpen(true);
          }}
        >
          Nouveau projet
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        title={modeEdition ? "Modifier le projet" : "Créer un projet"}
        onClose={fermerModal}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />

          <Input
            label="Technologies"
            placeholder="React, Node.js, MySQL..."
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
          />

          <div className="input-group">
            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <Button type="submit">
            {modeEdition ? "Enregistrer" : "Publier"}
          </Button>
        </form>
      </Modal>

      <div className="liste-projets">
        {projets.length === 0 ? (
          <p>Aucun projet disponible.</p>
        ) : (
          projets.map((projet) => (
            <PostCard
              key={projet.id_projet}
              auteur={`${projet.prenom} ${projet.nom}`}
              prenom={projet.prenom}
              nom={projet.nom}
              photo={projet.photo_utilisateur}
              date={new Date(projet.date_creation).toLocaleDateString("fr-FR")}
              titre={projet.titre}
              contenu={projet.description}
              onEdit={() => ouvrirEdition(projet)}
              onDelete={() => supprimerProjet(projet.id_projet)}
            >
              <div className="tech-list">
                {projet.technologies?.split(",").map((tech) => (
                  <span key={tech.trim()} className="badge">
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <div className="actions-projet">
                <Button onClick={() => ouvrirEdition(projet)}>Modifier</Button>
              </div>
            </PostCard>
          ))
        )}
      </div>
    </div>
  );
}
