const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const MiddlewaresController = require("../controllers/MiddlewaresController");

router.get(
  "/getallusers",
  MiddlewaresController.verifyAdmin,
  UserController.getAllUsers
);

module.exports = router;
