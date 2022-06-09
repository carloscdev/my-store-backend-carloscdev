const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const role = {
  values: ['USER', 'ADMIN'],
  message: '{VALUE} is not a valid'
};

const userSchema = new Schema({
  first_name: {type: String, required: [true, 'First name is required']},
  last_name: {type: String, required: [true, 'Last name is required']},
  code: {type: String, unique: true},
  document: {type: String, required: [true, 'Document is required'], unique: true},
  email: {type: String, required: [true, 'Email is required'], unique: true, uniqueCaseInsensitive: true},
  phone: {type: String, required: [true, 'Phone is required'], unique: true, uniqueCaseInsensitive: true},
  password: {type:String, required: [true, 'Password is required']},
  role: {type: String, default: 'USER', enum: role},
  is_active: {type: Boolean, default: false}
}, {
  timestamps: true,
  versionKey: false
})

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error)
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    if (update.password) {
      const password = await bcrypt.hash(update.password, saltRounds);
      this.getUpdate().password = password;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.code;
  return obj
};

userSchema.plugin(uniqueValidator, {message: '{VALUE} has already been registered'});

const countries = {
  values: ['PE', 'US'],
  message: '{VALUE} is not a valid'
};

const userAddressSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User Id is required']},
  name: {type: String, required: [true, 'Name is required']},
  address: {type: String, required: [true, 'Address is required']},
  reference: {type: String, required: [true, 'Reference is required']},
  lat: {type: String, required: [true, 'Lat is required']},
  lng: {type: String, require: [true, 'Lng is required']},
  country: {type: String, enum: countries, default: 'PE'},
}, {
  timestamps: true,
  versionKey: false
});


const User = mongoose.model('User', userSchema);
const UserAddress = mongoose.model('UserAddress', userAddressSchema)

module.exports = {User, UserAddress};
