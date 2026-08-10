import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

const dossierUpload = "uploads/profiles";

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(dossierUpload)) {
  fs.mkdirSync(dossierUpload, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dossierUpload);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const nomFichier = `avatar-${
      req.user.id
    }-${crypto.randomUUID()}${extension}`;

    cb(null, nomFichier);
  },
});

const fileFilter = (req, file, cb) => {
  const typesAutorises = ["image/jpeg", "image/png", "image/webp"];

  if (!typesAutorises.includes(file.mimetype)) {
    return cb(
      new Error("Format d'image non autorisé. Utilisez JPG, PNG ou WebP.")
    );
  }

  cb(null, true);
};

export const uploadAvatar = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
