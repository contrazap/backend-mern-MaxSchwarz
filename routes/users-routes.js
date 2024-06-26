const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");
// const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", usersControllers.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("imageUrl").not().isEmpty(),
  ],
  usersControllers.signup
);

router.post("/login", usersControllers.login);

module.exports = router;
