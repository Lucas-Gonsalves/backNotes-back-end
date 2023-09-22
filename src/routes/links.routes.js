const { Router } = require("express");
const LinksController = require("../controllers/LinksController");


const linksRoutes = Router();

const linksController = new LinksController();

linksRoutes.get("/", linksController.index);


module.exports = linksRoutes