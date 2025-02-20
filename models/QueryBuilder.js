const { QueryTypes } = require("sequelize");
const sequelize = require("../config/database");

function insertQueryGoogle(params, callback) {
  sequelize
    .query(
      "INSERT INTO users_google (name, access_token, refresh_token, scope, token_type, expiry_date) VALUES ($name, $access_token, $refresh_token, $scope, $token_type, $expiry_date)",
      {
        bind: params,
        type: QueryTypes.INSERT,
      }
    )
    .then((result) => {
      callback(null, result); // Sukses
    })
    .catch((error) => {
      callback(error, null); // Error
    });
}

async function SelectQueryGoogle(params) {
    return sequelize.query('SELECT * FROM users_google WHERE name = ?', { 
        replacements: [params],
        type: QueryTypes.SELECT,
        raw: true })
}

module.exports = { insertQueryGoogle, SelectQueryGoogle };
