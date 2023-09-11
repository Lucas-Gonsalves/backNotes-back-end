const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const NotesController = require("../controllers/NotesController");


const notesRoutes = Router();

const notesController = new NotesController();


notesRoutes.use(ensureAuthenticated);


notesRoutes.post("/", notesController.create);
notesRoutes.put("/", notesController.update);
notesRoutes.get("/", notesController.index);
notesRoutes.delete("/:note_id", notesController.delete);


module.exports = notesRoutes;