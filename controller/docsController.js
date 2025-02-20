require("dotenv").config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definisikan opsi untuk Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API Documentation',
      version: '1.0.0',
      description: 'API Documentation for Express.js using Swagger',
    },
    servers: [
      {
        url: `${process.env.APP_HOST}:${process.env.APP_PORT}`, // Ganti dengan URL server kamu
        description: "Development"
      },
    ],
  },
  apis: ['./docs/*.js'], // Path ke file dokumentasi API
};

// Inisialisasi swagger-jsdoc
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpecs,
};