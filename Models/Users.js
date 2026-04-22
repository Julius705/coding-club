const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  role: {type: String, required: true, enum: ['patron', 'chairperson', 'secretary','treasurer']},
  email: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true}
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);