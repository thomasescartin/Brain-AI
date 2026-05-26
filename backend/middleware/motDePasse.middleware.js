import argon2 from "argon2";

export const motDePasseHacher = async (req, res, next) => {
  try {
    if (req.body.mot_de_passe) {
      req.body.mot_de_passe = await argon2.hash(req.body.mot_de_passe);
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: " Erreur du hash du mot de passe." });
  }
};
