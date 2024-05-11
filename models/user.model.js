const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String, required: false },
  bio: { type: String, required: false },
  phone: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  isPublicProfile: { type: Boolean, required: true },
});

module.exports = mongoose.model("Users", userSchema);
