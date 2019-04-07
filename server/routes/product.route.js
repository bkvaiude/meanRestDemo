const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const productCtl = require('../controllers/product.controller');
const config = require('../config/config');
const router = express.Router();
module.exports = router;
router.get('/', asyncHandler(getAll));
router.get('/:productid', asyncHandler(get));
router.post('/', asyncHandler(create));
// router.put('/:productid', asyncHandler(update));
async function getAll(req, res) {
    let product = await productCtl.mostRecentRecords();
    console.log(product)
    res.json(product);
}
async function get(req, res) {
    let product = await productCtl.findByID(req.params.productid);
    if (product == null) {
        product = {};
    } else product = product.toObject();
    res.json(product);
}
async function create(req, res) {
    console.log(req.body)
    let product = await productCtl.create(req.body);
    res.json(product);
}
// async function update(req, res) {
//   let product = await product.updateByID(req.params.productid);
//   product = product.toObject();
//   res.json(product);
// }