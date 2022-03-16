const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

class Documentation {
  setServer(server) {
    const app = server;
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          version: "1.0.0",
          title: "Microservices of Users",
          description: "Microservices of users",
          license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT",
          },
        },
        servers: [
          {
            url: "http://localhost:5000/api",
          },
        ],
      },
      apis: ["src/app/**/infrastructure/*Route.*"], // files containing annotations as above
    };

    const openapiSpecification = swaggerJsdoc(options);

    app.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(openapiSpecification)
    );
  }
}

module.exports = Documentation;
