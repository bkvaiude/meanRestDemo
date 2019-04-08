const mongoose = require('mongoose');
const _ = require('lodash');
var Schema = mongoose.Schema;
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parent_category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    parent_categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    name_of_parent_categories: [{
        type: String,
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});
CategorySchema.pre('save', async function(next) {
    // console.log("------start",this.parent_category)
    if (!_.isEmpty(this.parent_category)) {
        var parents = await findMyParent(this.parent_category, [], []);
        this.parent_categories = parents.ids;
        this.name_of_parent_categories = parents.names;
        // console.log("------end",this.parent_category)
    }
    next();
});
async function findMyParent(category, parents, names) {
    var id = mongoose.Types.ObjectId(category);
    let categoryData = await CategoryModel.findById(id);
    // console.log("------parent of ", category,categoryData.parent_category)
    parents.push(category)
    names.push(categoryData.name)
    if (_.isEmpty(categoryData.parent_category)) {
        return {
            "ids": parents,
            "names": names
        };
    } else {
        return findMyParent(categoryData.parent_category, parents, names);
    }
}
var CategoryModel = mongoose.model('Category', CategorySchema);
module.exports = CategoryModel;