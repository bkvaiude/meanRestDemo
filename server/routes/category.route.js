const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const categoryCtl = require('../controllers/category.controller');
const config = require('../config/config');
const router = express.Router();
module.exports = router;
router.get('/', asyncHandler(getAll));
router.get('/:categoryid', asyncHandler(get));
router.post('/', asyncHandler(create));
// router.put('/:categoryid', asyncHandler(update));
async function getAll(req, res) {
    let category = await categoryCtl.mostRecentRecords();
    console.log(category)
    res.json(category);
}
async function get(req, res) {
    let category = await categoryCtl.findByID(req.params.categoryid);
    if (category == null) {
        category = {};
    } else category = category.toObject();
    res.json(category);
}
async function create(req, res) {
    console.log(req.body)
    let category = await categoryCtl.create(req.body);
    res.json(category);
}
// async function update(req, res) {
//   let category = await category.updateByID(req.params.categoryid);
//   category = category.toObject();
//   res.json(category);
// }