const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/placesControllers");
const checkAuth = require("../middlewares/checkAuth");
const router = express.Router();

router.get("/:pid", placesControllers.getPlaceById);
router.get("/user/:uid", placesControllers.getPlacesByUserId);

// ---------Further routes are protected by Authentication------
router.use(checkAuth);
router.patch("/wishlist/:pid",placesControllers.changeWishlistValue)
router.delete("/:pid", placesControllers.deletePlace);
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);
router.patch(
  "/update/:pid",
  [check("title").not().isEmpty(), check("description").not().isEmpty()],
  placesControllers.updatePlace
);

module.exports = router;