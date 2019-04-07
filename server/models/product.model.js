const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category_id : [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('Product', ProductSchema);
