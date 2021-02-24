const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/userController");

const router = express.Router();

router.get("/", usersController.getUsers);
router.get("/:uid",usersController.getUserById)
router.post(
  "/signup",
  [
    check("username").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);
router.post("/login",[
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ], usersController.login);

module.exports = router;