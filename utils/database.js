const mongoose = require('mongoose');

async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    await mongoose.connect(uri, options);
    console.log('Successful connection')
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectDB;
