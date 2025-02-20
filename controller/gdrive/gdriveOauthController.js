require("dotenv").config();
const { google } = require("googleapis");
const {
  insertQueryGoogle,
  SelectQueryGoogle,
} = require("../../models/QueryBuilder");

// Konfigurasi OAuth2
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:3002/oauth2callback"
);

const AuthGoggle = async (req, res) => {
  const scopes = ["https://www.googleapis.com/auth/drive"];
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  res.redirect(authUrl);
};

const oauth2callback = async (req, res) => {
  const code = req.query.code;

  // Dapatkan token dari kode otorisasi
  oauth2Client.getToken(code, (err, token) => {
    if (err) {
      console.error("Error retrieving access token", err);
      return res.send("Error getting access token");
    }

    oauth2Client.setCredentials(token);
    console.log("user123");
    console.log(token);

    token.name = "userAdmin";
    insertQueryGoogle(token, (error, result) => {
      if (error) {
        console.error("Insert failed:", error);
      } else {
        console.log("Insert succeeded:", result);
      }
    });

    res.send("Authentication successful!");
  });
};

const getDataDrive = async (req, res) => {
  const result = await SelectQueryGoogle("userAdmin");
  const { access_token, refresh_token } = result[0];

  oauth2Client.setCredentials({ access_token, refresh_token });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  // Gunakan folder ID dari env untuk mengambil file dari folder tersebut
  const folderId = process.env.FOLDER_ID;

  console.log(folderId);
  

  drive.files.list({
    q: `'${folderId}' in parents`,
    fields: 'files(id, name, thumbnailLink, webViewLink, webContentLink, createdTime, modifiedTime)',
  }, (err, driveRes) => {
    if (err) return res.status(500).send("Error accessing Google Drive");
    res.send(driveRes.data.files);
  });
};

module.exports = { AuthGoggle, oauth2callback, getDataDrive };
