const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const stream = require('stream');


// Path ke file kredensial service account
const SERVICE_ACCOUNT_FILE = path.join(
  __dirname,
  "../../data/account-service.json"
);

// Inisialisasi autentikasi menggunakan Service Account
const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // Hanya akses baca
});

// Initialize authentication using the Service Account
const authUpload = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: ['https://www.googleapis.com/auth/drive.file'], // Scope to allow file upload
});

// Inisialisasi Google Drive API
const drive = google.drive({ version: "v3", auth });
// Inisialisasi Google Drive API
const driveUpload = google.drive({ version: "v3", authUpload });

const getDataGoogle = async (req, res) => {
  const { folderId } = req.params;

  try {
    const images = await listImagesInFolder(folderId);
    res.json(images); // Mengirimkan daftar gambar sebagai JSON
  } catch (error) {
    res.status(500).send("Error fetching images from folder");
  }
};

const getListFolderGoogle = async (req, res) => {
  try {
    const folders = await listFoldersInDrive();
    res.json(folders); // Return list of folders as JSON
  } catch (error) {
    res.status(500).send("Error fetching folders from Drive");
  }
};

const uploadToGoogle = async (req, res) => {
  const folderId = "16pKGs0YyE62n9bceEISV8TQhTndln_h_"
  const file = req.file;
  console.log(file);

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const uploadedFile = await uploadFileToDrive(file.buffer, file.originalname, file.mimetype, folderId);
    res.status(200).json({
      message: 'File uploaded successfully',
      fileId: uploadedFile.id,
      fileName: uploadedFile.name,
    });
  } catch (error) {
    res.status(500).send('Error uploading file to Google Drive');
  }  
}

/** ---------------------------------------------------------- */

// Function to create a readable stream from a buffer
function bufferToStream(buffer) {
  const readable = new stream.Readable();
  readable._read = () => {}; // No-op
  readable.push(buffer);
  readable.push(null); // End the stream
  return readable;
}

// Function to upload file to Google Drive using a stream
async function uploadFileToDrive(fileBuffer, fileName, mimeType, folderId) {
  try {
    const fileMetadata = {
      name: fileName,
      parents: [folderId], // Folder ID where the file will be uploaded
    };

    const media = {
      mimeType: mimeType,
      body: bufferToStream(fileBuffer), // Ensure the body is a buffer
    };

    const response = driveUpload.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, name',
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error.message);
    throw error;
  }
}

// Fungsi untuk mendapatkan daftar file gambar di dalam folder
async function listImagesInFolder(folderId) {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`, // Filter file gambar
      fields: "files(id, name, mimeType)", // Mendapatkan file ID, nama, dan tipe MIME
    });

    // Generate access URLs for each image
    const images = response.data.files.map((file) => ({
      id: file.id,
      name: file.name,
      viewUrl: `https://drive.google.com/uc?id=${file.id}`,
      thumbnailLink: `https://drive.google.com/thumbnail?id=${file.id}&sz=w600-h600`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${file.id}`,
    }));

    return images; // Mengembalikan daftar file gambar
  } catch (error) {
    console.error("Error fetching images from folder:", error.message);
    throw new Error("Error fetching images from folder");
  }
}

// Function to list folders in Google Drive (or inside a specific folder)
async function listFoldersInDrive(parentFolderId = null) {
  try {
    const query = parentFolderId
      ? `'${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
      : `mimeType = 'application/vnd.google-apps.folder' and trashed = false`;

    const response = await drive.files.list({
      q: query,
      fields: "files(id, name)", // Only return the folder id and name
    });

    return response.data.files; // Return list of folders
  } catch (error) {
    console.error("Error fetching folders from Drive:", error.message);
    throw new Error("Error fetching folders from Drive");
  }
}

module.exports = { getDataGoogle, getListFolderGoogle, uploadToGoogle };
