const { response } = require("express");
const Product = require("../models/Product");

const getProducts = async (req, res = response) => {
  const products = await Product.find().populate("user", "name");

  res.json({
    ok: true,
    products,
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

const editProduct = async (req, res = response) => {
  const productId = req.params.id;
  const uid = req.uid;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: "Producto no encontrado",
      });
    }
    //  ESTA VALIDACION SIRVE PARA EDITAR SOLO SI ES EL MISMO USUARIO
    // if (product.user.toString() !== uid) {
    //     return res.status(401).json({
    //       ok: false,
    //       msg: "No tiene privilegio para editar este producto"
    //     })
    // }

    const newProduct = {
      ...req.body,
      user: uid,
    };

    const productEdited = await Product.findByIdAndUpdate(
      productId,
      newProduct
    );

    res.json({
      ok: true,
      product: productEdited,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const deleteProduct = async (req, res = response) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: "Producto no encontrado",
      });
    }

    await Product.findByIdAndDelete(productId);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
};
