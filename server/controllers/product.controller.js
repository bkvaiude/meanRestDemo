const bcrypt = require('bcrypt');
const Joi = require('joi');
const Product = require('../models/product.model');
var mongoose = require('mongoose');

const productSchema = Joi.object({
  name: Joi.string().required()
})


module.exports = {
  findByID,
  create,
  mostRecentRecords
}

async function create(product) {
  product = await Joi.validate(product, productSchema, { abortEarly: false });
  return await new Product(product).save();
}

async function findByID(product) {
  var id = mongoose.Types.ObjectId(product);
  let productData = await Product.findById(id);
  return productData;
}

async function mostRecentRecords() {
  let productData = await Product.find({}).sort({'createdAt': -1}).limit(20);
  return productData;
}
