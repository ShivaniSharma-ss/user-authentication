const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = require("./swaggerOptions");

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
