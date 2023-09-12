const { Router } = require("express");
const UserController = require("../controllers/UserController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const UserAvatarController = require("../controllers/UserAvatarController")

const uploadsConfig = require("../config/upload")
const multer = require("multer")


const userRoutes = Router();
const upload = multer(uploadsConfig.MULTER)

const userController = new UserController();
const userAvatarController = new UserAvatarController()

userRoutes.post("/", userController.create);

userRoutes.put("/", ensureAuthenticated, userController.update);
userRoutes.delete("/", ensureAuthenticated, userController.delete);
userRoutes.get("/", ensureAuthenticated, userController.index);

userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);


module.exports = userRoutes;