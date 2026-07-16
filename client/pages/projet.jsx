import { useEffect, useState } from "react";

import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import Input from "../components/Input/Input";
import PostCard from "../components/PostCard/PostCard";

import { getProjets, createProjet } from "../services/projet.service";

import "../style/projetStyle.css";

export default function Projet() {
  const [projets, setProjets] = useState([]);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  // Chargement des projets
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

  // Création d'un projet
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const nouveauProjet = await createProjet({
        titre,
        description,
        technologies,
      });

      setProjets((prev) => [...prev, nouveauProjet]);

      setTitre("");
      setDescription("");
      setTechnologies("");

      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="projet-page">
      <div className="page-header">
        <h1>🚀 Projets</h1>

        <Button onClick={() => setIsOpen(true)}>Nouveau projet</Button>
      </div>

      <Modal
        isOpen={isOpen}
        title="Créer un projet"
        onClose={() => setIsOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
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

          <Button type="submit">Publier</Button>
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
            >
              <div className="tech-list">
                {projet.technologies?.split(",").map((tech) => (
                  <span key={tech.trim()} className="badge">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </PostCard>
          ))
        )}
      </div>
    </div>
  );
}
