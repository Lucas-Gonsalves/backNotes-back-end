require("express-async-errors");
const express = require("express");
const routes = require("./routes");
const connectionDatabase = require("./database/sqlite");


const app = express();
app.use(express.json());

app.use(routes);
connectionDatabase()

const PORT = 3333;
app.listen(PORT, () => { console.log(`Server is runing on port: ${PORT}.`) } );