const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middlewares/checkAuth");
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
router.use(checkAuth);
router.patch("/like/:userId",usersController.giveLike)
module.exports = router;