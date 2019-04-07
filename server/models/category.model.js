const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent_category: { type: Schema.Types.ObjectId, ref: 'Category' },
  parent_categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('Category', CategorySchema);
