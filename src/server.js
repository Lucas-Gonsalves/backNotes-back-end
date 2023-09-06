require("express-async-errors");
const express = require("express");

const routes = require("./routes");
const connectionDatabase = require("./database/sqlite");
const AppError= require("./utils/AppError")


const app = express();
app.use(express.json());

app.use(routes);
connectionDatabase()

app.use((error, request, response, next) => {

  if(error instanceof AppError) {
    response
      .status(error.statusCode)
      .json({
        status: "Error.",
        message: error.message
      });
  };

  console.log(error);

  response
    .status(500)
    .json({
      status: "Error.",
      message: "Internal-Server-Error."
    });
});


const PORT = 3333;
app.listen(PORT, () => { console.log(`Server is runing on port: ${PORT}.`) } );