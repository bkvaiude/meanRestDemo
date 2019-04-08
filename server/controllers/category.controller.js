const bcrypt = require('bcrypt');
const Joi = require('joi');
const Category = require('../models/category.model');
var mongoose = require('mongoose');

const categorySchema = Joi.object({
  name: Joi.string().required(),
  parent_category:Joi.string()
})


module.exports = {
  findByID,
  create,
  mostRecentRecords
}

async function create(category) {
  category = await Joi.validate(category, categorySchema, { abortEarly: false });
  return await new Category(category).save();
}

async function findByID(category) {
  var id = mongoose.Types.ObjectId(category);
  let categoryData = await Category.findById(id);
  return categoryData;
}

async function mostRecentRecords() {
  let categoryData = await Category.find({}).sort({'created_at': -1}).limit(20);
  return categoryData;
}
