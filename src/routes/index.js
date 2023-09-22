const { Router } = require("express");

const userRoutes = require("./user.routes");
const sessionRoutes = require("./session.routes");
const notesRoutes = require("./notes.routes");
const tagsRoutes = require("./tags.routes");
const linksRoutes = require("./links.routes");


const routes = Router();

routes.use("/users", userRoutes);
routes.use("/session", sessionRoutes);
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);
routes.use("/links", linksRoutes);


module.exports = routes;