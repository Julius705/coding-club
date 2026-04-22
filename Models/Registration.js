const mongoose = require("mongoose");
const clubMemberShema = new mongoose.Schema({
  name: {type : String, required : true},
  school: {type: String, required: true},
  admno: {type: Number, required: true},
  gender: {type: String, required: true},
  age: {type: Number, required: true}
},{ timestamps: true })
module.exports = mongoose.model("ClubMembers", clubMemberShema);