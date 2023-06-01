const Product = require("../models/Product");

//get all products
const product_all = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
};

//single product
const product_details = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

//add new product
const product_create = async (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
    details: req.body.details,
  });
  try {
    const saveProduct = await newProduct.save();
    res.send(saveProduct);
  } catch (err) {
    res.status(400).send(err);
  }
};

//update product
const product_update = async (req, res) => {
  try {
    const product = {
      title: req.body.title,
      price: req.body.price,
      image: req.body.image,
      details: req.body.details,
    };
    const updateProduct = await Product.findByIdAndUpdate(
      {
        _id: req.params.productId,
      },
      product
    );
    res.send(updateProduct);
  } catch (err) {
    res.status(400).send(err);
  }
};

//delete product
const product_delete = async (req, res) => {
  try {
    const deleteProduct = await Product.findById({ _id: req.params.productId });
    Product.deleteOne();
    res.json({ message: `${deleteProduct} has been deleted` });
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  product_all,
  product_details,
  product_create,
  product_update,
  product_delete,
};
