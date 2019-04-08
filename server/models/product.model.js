const mongoose = require('mongoose');
const _ = require('lodash');
var Schema = mongoose.Schema;
const CategoryModel = require('../models/category.model');
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category_id: [{
        type: String,
        ref: 'Category'
    }],
    category_tags: [{
        type: String,
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});
ProductSchema.pre('save', async function(next) {
    var output = [];
    var output2 = [];
    // await _.forEach(this.category_id,  async function(value)  {  
    //     var parents = await findCategoryTags(value);
    //     output = _.concat(output, parents);
    // });
    for (var value=0; value < this.category_id.length; value++) {
        var xCat = this.category_id[value];
        console.log(value, "------start", xCat)
        var parents = await findCategoryTags(xCat);
        output = _.concat(output, parents);
        output2.push(xCat)
    }
    this.category_tags = _.uniq(output);
    this.category_id = _.uniq(output2);
    console.log("------end---------------",this.category_id)
    next();
});
async function findCategoryTags(category) {
    console.log(category,"------findCategoryTags")
    var id = mongoose.Types.ObjectId(category);
    let categoryData = await CategoryModel.findById(id);
    console.log(category,"------findCategoryTags",categoryData.name_of_parent_categories)
    return categoryData.name_of_parent_categories;
}
module.exports = mongoose.model('Product', ProductSchema);