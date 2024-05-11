const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Operations",
      version: "1.0.0",
      description: "",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:8080/api",
      },
    ],
  },
  apis: ["./routes.js"],
};

module.exports = swaggerOptions;
