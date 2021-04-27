const express = require("express");
const authController = require('../controllers/auth');
const Router = express.Router();
Router.post("/register", authController.register)
Router.post("/login", authController.login)

module.exports = Router;