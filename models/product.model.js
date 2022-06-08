const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = new Schema({
  title: {type: String, required: [true, 'Title is required'], unique: true, uniqueCaseInsensitive: true},
  slug: String,
  description: {type: String, required: [true, 'Description is required']},
  image: {type: String, required: [true, 'Image is required']},
  purchase_price: {type: Number, required: [true, 'Purchase Price is required']},
  sale_price: {type: Number, required: [true, 'Sale Price is required']},
  has_stock: {type: Boolean, default: false},
  stock: {type: Number, default: 0},
  is_active: {type: Boolean, default: true},
  category: [{type: Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category is required']}],
  gallery: [String]
}, {
  timestamps: true,
  versionKey: false
});

productSchema.pre("save", function(next) {
  this.slug = this.title.toLowerCase().split(" ").join("-");
  next()
});

productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.title) {
    const slug = update.title.toLowerCase().split(" ").join("-");
    this.getUpdate().slug = slug;
  }
  next();
});

productSchema.plugin(uniqueValidator, {message: '{VALUE} has already been registered'});

const Product = model('Product', productSchema);

module.exports = {Product};
