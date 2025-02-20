const multer = require("multer");
const path = require("path");

// Konfigurasi multer untuk file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Multer setup to handle form-data (file upload)
const storageMemory = multer.memoryStorage();
const uploadMemory = multer({ storage: storageMemory });

module.exports = { upload, uploadMemory };
