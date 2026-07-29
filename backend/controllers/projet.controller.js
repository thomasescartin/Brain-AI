export const creationProjet = async (req, res) => {
  try {
    const { titre, description, technologies, image_projet } = req.body;

    if (!titre || !description) {
      return res.status(400).json({
        message: "Le titre et la description sont obligatoires.",
      });
    }

    const projetExistant = await projet.trouverProjet(titre);

    if (projetExistant) {
      return res.status(409).json({
        message: "Projet déjà existant.",
      });
    }

    const idProjet = await projet.creerProjet(
      titre,
      description,
      technologies,
      image_projet,
      req.user.id
    );

    res.status(201).json({
      message: "Projet créé.",
      id_projet: idProjet,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};
