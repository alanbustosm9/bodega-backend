const { response } = require("express");
const Product = require("../models/Product");

const getProducts = (req, res = response) => {
  res.json({
    ok: true,
    msg: "getProducts",
  });
};

const addProduct = async (req, res = response) => {
  const product = new Product(req.body);

  try {
    product.user = req.uid;

    const productSaved = await product.save();

    res.json({
      ok: true,
      product: productSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const editProduct = (req, res = response) => {
  res.json({
    ok: true,
    msg: "editProduct",
  });
};

const deleteProduct = (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteProduct",
  });
};

module.exports = {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
};
