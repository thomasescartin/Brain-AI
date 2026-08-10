import { useEffect, useState } from "react";

import {
  getDiscussions,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
} from "../service/discussion.service.js";

import "../style/discussionStyle.css";

export default function Discussion() {
  const [discussions, setDiscussions] = useState([]);

  const [titre, setTitre] = useState("");
  const [contenue, setContenue] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [modeEdition, setModeEdition] = useState(false);
  const [discussionSelectionnee, setDiscussionSelectionnee] = useState(null);

  // =========================
  // CHARGEMENT
  // =========================

  useEffect(() => {
    chargerDiscussions();
  }, []);

  async function chargerDiscussions() {
    try {
      const data = await getDiscussions();

      setDiscussions(data);
    } catch (error) {
      console.error("Erreur chargement :", error);
    }
  }

  // =========================
  // FERMER / RESET MODALE
  // =========================

  function fermerModal() {
    setIsOpen(false);

    setModeEdition(false);
    setDiscussionSelectionnee(null);

    setTitre("");
    setContenue("");
  }

  // =========================
  // OUVRIR MODIFICATION
  // =========================

  function ouvrirEdition(discussion) {
    setDiscussionSelectionnee(discussion);

    setModeEdition(true);

    setTitre(discussion.titre);
    setContenue(discussion.contenue);

    setIsOpen(true);
  }

  // =========================
  // CREATION / MODIFICATION
  // =========================

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (modeEdition) {
        await updateDiscussion(discussionSelectionnee.id_discussion, {
          titre,
          contenue,
        });
      } else {
        await createDiscussion({
          titre,
          contenue,
        });
      }

      // Actualiser la liste
      await chargerDiscussions();

      // Fermer et réinitialiser
      fermerModal();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }

  // =========================
  // SUPPRESSION
  // =========================

  async function supprimerDiscussion(id_discussion) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette discussion ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      await deleteDiscussion(id_discussion);

      await chargerDiscussions();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }

  // =========================
  // AFFICHAGE
  // =========================

  return (
    <main className="discussion-page">
      {/* =========================
          EN-TÊTE
      ========================= */}

      <section className="discussion-header">
        <div>
          <h1>💬 Discussions</h1>

          <p>
            Échangez avec la communauté autour de l'intelligence artificielle.
          </p>
        </div>

        <button
          className="discussion-create-button"
          onClick={() => {
            fermerModal();
            setIsOpen(true);
          }}
        >
          + Créer une discussion
        </button>
      </section>

      {/* =========================
          MODALE
      ========================= */}

      {isOpen && (
        <div className="discussion-modal-overlay" onClick={fermerModal}>
          <div
            className="discussion-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="discussion-modal-header">
              <h2>
                {modeEdition ? "Modifier la discussion" : "Nouvelle discussion"}
              </h2>

              <button
                type="button"
                className="discussion-modal-close"
                onClick={fermerModal}
              >
                ×
              </button>
            </div>

            <form className="discussion-form" onSubmit={handleSubmit}>
              {/* TITRE */}

              <div className="discussion-input-group">
                <label htmlFor="titre">Titre</label>

                <input
                  id="titre"
                  type="text"
                  placeholder="Titre de la discussion"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  required
                />
              </div>

              {/* CONTENU */}

              <div className="discussion-input-group">
                <label htmlFor="contenue">Contenu</label>

                <textarea
                  id="contenue"
                  placeholder="Écrivez votre discussion..."
                  value={contenue}
                  onChange={(e) => setContenue(e.target.value)}
                  required
                />
              </div>

              {/* BOUTONS */}

              <div className="discussion-modal-actions">
                <button
                  type="button"
                  className="discussion-cancel-button"
                  onClick={fermerModal}
                >
                  Annuler
                </button>

                <button type="submit" className="discussion-submit-button">
                  {modeEdition ? "Enregistrer" : "Créer la discussion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          LISTE DES DISCUSSIONS
      ========================= */}

      <section className="discussion-list">
        {discussions.length === 0 ? (
          <div className="discussion-empty">
            <span>💬</span>

            <h2>Aucune discussion</h2>

            <p>Soyez le premier à lancer une discussion.</p>
          </div>
        ) : (
          discussions.map((discussion) => (
            <article key={discussion.id_discussion} className="discussion-card">
              {/* AUTEUR */}

              <div className="discussion-card-header">
                <div className="discussion-avatar">👤</div>

                <div>
                  <span className="discussion-author">
                    Utilisateur #{discussion.id_utilisateur}
                  </span>
                </div>
              </div>

              {/* CONTENU */}

              <div className="discussion-card-content">
                <h2>{discussion.titre}</h2>

                <p>{discussion.contenue}</p>
              </div>

              {/* ACTIONS */}

              <div className="discussion-card-footer">
                <span>💬 Discussion</span>

                <div className="discussion-card-actions">
                  <button
                    className="discussion-edit-button"
                    onClick={() => ouvrirEdition(discussion)}
                  >
                    Modifier
                  </button>

                  <button
                    className="discussion-delete-button"
                    onClick={() =>
                      supprimerDiscussion(discussion.id_discussion)
                    }
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
