// host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const validator = require("../middlewares/validator");

const { createUser, loginUser } = require("../controllers/auth");

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validator,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña debe ser mayor a 6").isLength({ min: 6 }),
    validator,
  ],
  loginUser
);

module.exports = router;
