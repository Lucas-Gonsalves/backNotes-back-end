const { Router } = require("express");

const userRoutes = require("./user.routes");
const sessionRoutes = require("./session.routes");
const notesRoutes = require("./notes.routes");


const routes = Router();

routes.use("/users", userRoutes);
routes.use("/session", sessionRoutes);
routes.use("/notes", notesRoutes)


module.exports = routes;