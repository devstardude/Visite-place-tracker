const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middlewares/checkAuth");
const usersController = require("../controllers/userController");

const router = express.Router();

router.get("/", usersController.getUsers);
router.get("/:uid", usersController.getUserById);
router.post(
  "/signup",
  [
    check("username").isLength({ min: 4,max:12 }),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6,max:15 }),
  ],
  usersController.signup
);
router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6,max:15 }),
  ],
  usersController.login
);

// ---------Further routes are protected by Authentication------
router.use(checkAuth);
router.patch("/like/:userId", usersController.giveLike);
router.patch("/messages/:userId", usersController.sendMessage);
router.get("/getmessages/:userId", usersController.getMessages);
router.patch("/update", usersController.updateUser);
module.exports = router;
