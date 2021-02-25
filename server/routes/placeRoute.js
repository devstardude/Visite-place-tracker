const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/placesControllers");
const checkAuth = require("../middlewares/checkAuth");
const router = express.Router();

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.use(checkAuth);
router.delete("/:pid", placesControllers.deletePlace);
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 1 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlace
);

module.exports = router;