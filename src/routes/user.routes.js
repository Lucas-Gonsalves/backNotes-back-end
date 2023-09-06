const { Router } = require("express");
//import { UserController } = require("../controllers/UserController");


const userRoutes = Router();

/*
const userController = new UserController();

userRoutes.use("/", userController.create );
userRoutes.use("/", userController.update );
userRoutes.use("/", userController.index );
userRoutes.use("/", userController.delete );
*/


module.exports = userRoutes;