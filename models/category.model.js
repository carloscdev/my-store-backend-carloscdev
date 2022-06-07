const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new Schema({
  title: {type: String, required: [true, 'First name is required'], unique: true, uniqueCaseInsensitive: true},
  slug: {type: String},
  description: {type: String, required: [true, 'Last name is required']},
  image: {
    secure_url: String,
    public_id: String
  },
  is_active: {type: Boolean, default: true}
}, {
  timestamps: true,
  versionKey: false
});

categorySchema.pre("save", function(next) {
  this.slug = this.title.toLowerCase().split(" ").join("-");
  next()
});

categorySchema.plugin(uniqueValidator, {message: '{VALUE} has already been registered'});

const Category = model('Category', categorySchema);

module.exports = {Category};
