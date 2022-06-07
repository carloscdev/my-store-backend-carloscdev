const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new Schema({
  title: {type: String, required: [true, 'Title is required'], unique: true, uniqueCaseInsensitive: true},
  slug: {type: String},
  description: {type: String, required: [true, 'Last name is required']},
  image: {type: String, required: [true, 'Image is required']},
  position: {type: Number, default: 1},
  is_active: {type: Boolean, default: true}
}, {
  timestamps: true,
  versionKey: false
});

categorySchema.pre("save", function(next) {
  this.slug = this.title.toLowerCase().split(" ").join("-");
  next()
});

categorySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.title) {
    const slug = update.title.toLowerCase().split(" ").join("-");
    this.getUpdate().slug = slug;
  }
  next();
});

categorySchema.plugin(uniqueValidator, {message: '{VALUE} has already been registered'});

const Category = model('Category', categorySchema);

module.exports = {Category};
