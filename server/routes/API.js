const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passwordController = require("../controllers/passwordController");
const { requireAuth } = require("../middleware/requireAuth");
router.post("/create-user", userController.createUser);
router.post("/login-user", userController.loginUser);
router.post("/add-password", requireAuth, passwordController.addPassword);
router.post("/logout", userController.logout);
router.get("/all-ids", requireAuth, passwordController.getIds);
router.get("/get-password", requireAuth, passwordController.getPassword);
router.get("/status", requireAuth, userController.getStatus);

module.exports = router;
