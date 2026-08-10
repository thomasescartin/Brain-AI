import { useEffect, useState } from "react";

import Button from "../components/Button.jsx";
import Modal from "../components/Modale.jsx";
import Input from "../components/Input.jsx";
import PostCard from "../components/PostCard.jsx";

import {
  getEvenements,
  createEvenement,
  updateEvenement,
  deleteEvenement,
} from "../service/evenement.service.js";

import "../style/evenementStyle.css";

export default function Evenement() {
  const [evenements, setEvenements] = useState([]);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [lieu, setLieu] = useState("");
  const [dateEvenement, setDateEvenement] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [modeEdition, setModeEdition] = useState(false);
  const [evenementSelectionne, setEvenementSelectionne] = useState(null);

  useEffect(() => {
    chargerEvenements();
  }, []);

  async function chargerEvenements() {
    try {
      const data = await getEvenements();
      setEvenements(data);
    } catch (error) {
      console.error(error);
    }
  }

  function fermerModal() {
    setIsOpen(false);

    setModeEdition(false);

    setEvenementSelectionne(null);

    setTitre("");
    setDescription("");
    setLieu("");
    setDateEvenement("");
  }

  function ouvrirEdition(evenement) {
    setEvenementSelectionne(evenement);

    setModeEdition(true);

    setTitre(evenement.titre);
    setDescription(evenement.description);
    setLieu(evenement.lieu);
    setDateEvenement(evenement.date_evenement.substring(0, 16));

    setIsOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (modeEdition) {
        await updateEvenement(evenementSelectionne.id_evenement, {
          titre,
          description,
          lieu,
          date_evenement: dateEvenement,
        });
      } else {
        await createEvenement({
          titre,
          description,
          lieu,
          date_evenement: dateEvenement,
        });
      }

      await chargerEvenements();

      fermerModal();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }

  async function supprimerEvenement(id) {
    if (!window.confirm("Supprimer cet évènement ?")) {
      return;
    }

    await deleteEvenement(id);

    await chargerEvenements();
  }

  return (
    <div className="evenement-page">
      <div className="page-header">
        <h1>📅 Évènements</h1>

        <Button
          onClick={() => {
            fermerModal();
            setIsOpen(true);
          }}
        >
          Nouvel évènement
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        title={modeEdition ? "Modifier l'évènement" : "Créer un évènement"}
        onClose={fermerModal}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />

          <Input
            label="Lieu"
            value={lieu}
            onChange={(e) => setLieu(e.target.value)}
          />

          <Input
            type="datetime-local"
            label="Date"
            value={dateEvenement}
            onChange={(e) => setDateEvenement(e.target.value)}
          />

          <div className="input-group">
            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button type="submit">{modeEdition ? "Enregistrer" : "Créer"}</Button>
        </form>
      </Modal>

      <div className="liste-evenements">
        {evenements.length === 0 ? (
          <p>Aucun évènement disponible.</p>
        ) : (
          evenements.map((event) => (
            <PostCard
              key={event.id_evenement}
              auteur={`${event.prenom} ${event.nom}`}
              prenom={event.prenom}
              nom={event.nom}
              photo={event.photo_utilisateur}
              date={new Date(event.date_creation).toLocaleDateString("fr-FR")}
              titre={event.titre}
              contenu={event.description}
              onEdit={() => ouvrirEdition(event)}
              onDelete={() => supprimerEvenement(event.id_evenement)}
            >
              <div className="event-info">
                <p>📍 {event.lieu}</p>

                <p>
                  📅 {new Date(event.date_evenement).toLocaleString("fr-FR")}
                </p>
              </div>
            </PostCard>
          ))
        )}
      </div>
    </div>
  );
}
