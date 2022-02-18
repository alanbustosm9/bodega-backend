const { Router } = require("express");
const { check } = require("express-validator");
const validator = require("../middlewares/validator");
const validatorJWT = require("../middlewares/validatorJWT");
const {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/products");
const router = Router();

router.use(validatorJWT);

router.get("/", getProducts);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("quantity", "Debe ingresar una cantidad").not().isEmpty(),
    check("price", "Debe ingresar un precio").not().isEmpty(),
    check("description", "La descripcion es obligatoria").not().isEmpty(),
    validator,
  ],
  addProduct
);

router.put(
  "/:id",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("quantity", "Debe ingresar una cantidad").not().isEmpty(),
    check("price", "Debe ingresar un precio").not().isEmpty(),
    check("description", "La descripcion es obligatoria").not().isEmpty(),
    validator,
  ],
  editProduct
);

router.delete("/:id", deleteProduct);

module.exports = router;
