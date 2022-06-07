const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const gallerySchema = new Schema({
  title: {type: String, required: [true, 'Title is required'], unique: true, uniqueCaseInsensitive: true},
  image: {
    secure_url: String,
    public_id: String
  },
  is_active: {type: Boolean, default: true}
}, {
  timestamps: true,
  versionKey: false
});


gallerySchema.plugin(uniqueValidator, {message: '{VALUE} has already been registered'});

const Gallery = model('Gallery', gallerySchema);

module.exports = {Gallery};
