const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/all", placesControllers.getAllPlaces);

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.use(checkAuth);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlace
);

router.delete("/:pid", placesControllers.deletePlace);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
    check("imageUrl").not().isEmpty(),
  ],
  placesControllers.createPlace
);

module.exports = router;
