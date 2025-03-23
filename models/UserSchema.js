const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  guid: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  balance: { type: String, required: true },
  picture: { type: String, required: true },
  age: { type: Number, required: true },
  eyeColor: { type: String, required: true },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  company: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  about: { type: String, required: true },
  registered: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  tags: [{ type: String }],
  range: [{ type: Number }],
  greeting: { type: String, required: true },
  favoriteFruit: { type: String, required: true }
})

const User = mongoose.model('User', userSchema);

module.exports = User;