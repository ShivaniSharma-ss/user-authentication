express = require("express");
dotenv = require("dotenv");
require("./connection");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerDocs");
const userApi = require('./routes');
dotenv.config();
const app = express();
app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", userApi);
port = process.env.PORT;


app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
